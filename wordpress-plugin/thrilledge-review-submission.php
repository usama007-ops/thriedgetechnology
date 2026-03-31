<?php


// Thrill Edge Review Submission
if ( ! defined( 'ABSPATH' ) ) exit;


add_filter( 'wp_mail_from',      fn() => 'info@thrilledge.com' );
add_filter( 'wp_mail_from_name', fn() => 'Thrill Edge' );

add_filter( 'rest_testimonial_query', function( $args, $request ) {
    if ( ! current_user_can( 'edit_posts' ) ) {
        $args['post_status'] = 'publish';
    }
    return $args;
}, 10, 2 );



add_filter( 'rest_pre_insert_testimonial', function( $prepared_post, $request ) {
    $prepared_post->post_status = 'pending';
    return $prepared_post;
}, 10, 2 );

add_filter( 'rest_testimonial_collection_params', function( $params ) {
    return $params;
} );

add_filter( 'rest_testimonial_permissions_check', '__return_true' );

add_filter( 'rest_pre_dispatch', function( $result, $server, $request ) {
    if (
        $request->get_method() === 'POST' &&
        strpos( $request->get_route(), '/wp/v2/testimonial' ) !== false &&
        ! is_user_logged_in()
    ) {
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

add_action( 'rest_insert_testimonial', function( $post, $request, $creating ) {
    if ( ! $creating ) return;

    $admin_email = 'info@thrilledge.com';
    $title       = $post->post_title;
    $review_url  = admin_url( 'post.php?post=' . $post->ID . '&action=edit' );

    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        'From: Thrill Edge <info@thrilledge.com>',
        'Reply-To: info@thrilledge.com',
    ];

    wp_mail(
        $admin_email,
        '[Thrill Edge] New review pending approval: ' . $title,
        "A new review has been submitted and is awaiting your approval.\n\nReview: {$title}\n\nApprove it here: {$review_url}",
        $headers
    );
}, 10, 3 );



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
