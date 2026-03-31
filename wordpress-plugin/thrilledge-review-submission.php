<?php
/**
 * Plugin Name: Thrill Edge Review Submission
 * Description: Handles public review submissions via REST API. Reviews are saved as pending testimonials requiring admin approval before appearing on the frontend.
 * Version: 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * 1. Ensure the 'testimonial' CPT supports 'pending' status via REST.
 *    Add this to your theme's functions.php or this plugin if the CPT
 *    is registered elsewhere.
 */
add_filter( 'rest_testimonial_query', function( $args, $request ) {
    // Only return 'publish' status for unauthenticated requests
    if ( ! current_user_can( 'edit_posts' ) ) {
        $args['post_status'] = 'publish';
    }
    return $args;
}, 10, 2 );


/**
 * 2. Allow unauthenticated REST creation of testimonials with 'pending' status.
 *    By default WP requires auth to create posts — we open a narrow exception
 *    for the testimonial CPT only, forcing status=pending.
 */
add_filter( 'rest_pre_insert_testimonial', function( $prepared_post, $request ) {
    // Force pending regardless of what was sent
    $prepared_post->post_status = 'pending';
    return $prepared_post;
}, 10, 2 );

add_filter( 'rest_testimonial_collection_params', function( $params ) {
    return $params;
} );

// Allow unauthenticated POST to testimonial endpoint
add_filter( 'rest_testimonial_permissions_check', '__return_true' );

// Override create permission for testimonial CPT
add_filter( 'rest_pre_dispatch', function( $result, $server, $request ) {
    if (
        $request->get_method() === 'POST' &&
        strpos( $request->get_route(), '/wp/v2/testimonial' ) !== false &&
        ! is_user_logged_in()
    ) {
        // Allow but force pending — handled in rest_pre_insert_testimonial above
        add_filter( 'user_has_cap', function( $caps, $cap, $args ) {
            if ( in_array( 'publish_posts', (array) $cap ) || in_array( 'edit_posts', (array) $cap ) ) {
                $caps['publish_posts'] = true;
                $caps['edit_posts']    = true;
            }
            return $caps;
        }, 10, 3 );
    }
    return $result;
}, 10, 3 );


/**
 * 3. Store extra reviewer meta (email, phone, website) on submission.
 */
add_action( 'rest_insert_testimonial', function( $post, $request, $creating ) {
    if ( ! $creating ) return;

    $meta_fields = [ 'reviewer_email', 'reviewer_phone', 'reviewer_website' ];
    $params      = $request->get_json_params();

    if ( isset( $params['meta'] ) ) {
        foreach ( $meta_fields as $field ) {
            if ( ! empty( $params['meta'][ $field ] ) ) {
                update_post_meta( $post->ID, $field, sanitize_text_field( $params['meta'][ $field ] ) );
            }
        }
    }
}, 10, 3 );


/**
 * 4. Email admin when a new review is submitted.
 */
add_action( 'rest_insert_testimonial', function( $post, $request, $creating ) {
    if ( ! $creating ) return;

    $admin_email = get_option( 'admin_email' );
    $title       = $post->post_title;
    $review_url  = admin_url( 'post.php?post=' . $post->ID . '&action=edit' );

    wp_mail(
        $admin_email,
        '[Thrill Edge] New review pending approval: ' . $title,
        "A new review has been submitted and is awaiting your approval.\n\nReview: {$title}\n\nApprove it here: {$review_url}",
        [ 'Content-Type: text/plain; charset=UTF-8' ]
    );
}, 10, 3 );


/**
 * 5. Register reviewer meta fields so they appear in REST responses for admins.
 */
add_action( 'init', function() {
    foreach ( [ 'reviewer_email', 'reviewer_phone', 'reviewer_website' ] as $key ) {
        register_post_meta( 'testimonial', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => 'string',
            'auth_callback' => function() { return current_user_can( 'edit_posts' ); },
        ] );
    }
} );
