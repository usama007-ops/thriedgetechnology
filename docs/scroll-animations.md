# Scroll Animations — Usage Guide

This project uses a lightweight, zero-dependency scroll animation system built on the native `IntersectionObserver` API. No Framer Motion, no GSAP — just a hook, a component, and some CSS classes.

---

## Files

| File | Purpose |
|---|---|
| `hooks/use-in-view.ts` | Raw hook — returns `{ ref, inView }` |
| `components/common/animate.tsx` | `<Animate>` wrapper component |
| `app/globals.css` | CSS classes for each animation variant |

---

## Quick Start

Wrap any element with `<Animate>` and it will fade up when scrolled into view.

```tsx
import { Animate } from '@/components/common/animate'

export function MySection() {
  return (
    <Animate>
      <h2>This fades up on scroll</h2>
    </Animate>
  )
}
```

> **Important:** `<Animate>` is a Client Component (`'use client'`). You can use it inside Server Components — Next.js handles the boundary automatically.

---

## `<Animate>` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `AnimVariant` | `'fade-up'` | Which animation to play |
| `delay` | `number` (ms) | `0` | Delay before animation starts — use for staggering |
| `duration` | `number` (ms) | CSS default | Override the transition duration |
| `threshold` | `number` (0–1) | `0.12` | How much of the element must be visible to trigger |
| `className` | `string` | — | Extra CSS classes on the wrapper element |
| `style` | `CSSProperties` | — | Extra inline styles |
| `as` | `string` | `'div'` | HTML tag to render (`'section'`, `'article'`, `'span'`, etc.) |

---

## Animation Variants

```
'fade-up'     — slides up from below + fades in          (default, most common)
'fade-in'     — pure opacity fade, no movement
'slide-left'  — enters from the left + fades in
'slide-right' — enters from the right + fades in
'scale-in'    — scales up from 93% + slight translateY + fades in
'blur-in'     — blurs out + slides up, then sharpens     (best for big headlines)
```

### Visual guide

```
fade-up      ↑ element rises into place
fade-in        element appears in place
slide-left   → element slides in from left
slide-right  ← element slides in from right
scale-in     ⊙ element grows into place
blur-in      ≋ element sharpens into place
```

---

## Staggering Children

Pass increasing `delay` values to create a cascade effect. Use multiples of 80–150ms.

```tsx
const ITEMS = ['Design', 'Build', 'Ship']

export function MyList() {
  return (
    <div>
      {ITEMS.map((item, i) => (
        <Animate key={item} variant="fade-up" delay={i * 120}>
          <p>{item}</p>
        </Animate>
      ))}
    </div>
  )
}
```

Result: first item animates at 0ms, second at 120ms, third at 240ms.

---

## Mixing Variants in a Section

A common pattern — heading slides in from the left, body fades up slightly after:

```tsx
export function ServicesSection() {
  return (
    <section>
      <Animate variant="slide-left">
        <h2>Our Services</h2>
      </Animate>

      <Animate variant="fade-up" delay={120}>
        <p>Comprehensive solutions for your business.</p>
      </Animate>

      <div className="grid grid-cols-3 gap-6 mt-12">
        {services.map((s, i) => (
          <Animate key={s.id} variant="scale-in" delay={i * 90}>
            <ServiceCard service={s} />
          </Animate>
        ))}
      </div>
    </section>
  )
}
```

---

## Rendering as a Different Tag

By default `<Animate>` renders a `<div>`. Use `as` to change it — useful when you need semantic HTML or when a `<div>` would break layout (e.g. inside a flex row).

```tsx
// Renders as <article>
<Animate as="article" variant="fade-up">
  <BlogCard post={post} />
</Animate>

// Renders as <li>
<ul>
  <Animate as="li" variant="slide-left" delay={100}>
    <span>List item</span>
  </Animate>
</ul>
```

---

## Using the Raw Hook

If you need more control — for example, animating with inline styles instead of CSS classes, or triggering something other than a visual animation — use `useInView` directly.

```tsx
'use client'

import { useInView } from '@/hooks/use-in-view'

export function MyComponent() {
  const { ref, inView } = useInView({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(40px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      Custom animation
    </div>
  )
}
```

### `useInView` Options

| Option | Type | Default | Description |
|---|---|---|---|
| `threshold` | `number` (0–1) | `0` | Fraction of element that must be visible |
| `rootMargin` | `string` | `'-12% 0px -8% 0px'` | CSS margin around the viewport — negative values mean the element must be further inside before triggering |
| `once` | `boolean` | `true` | If `true`, stops observing after first trigger (animation plays once) |

### `rootMargin` explained

```
'-12% 0px -8% 0px'
  │         │
  │         └── bottom: element must be 8% above the bottom edge
  └──────────── top: element must be 12% below the top edge
```

This prevents animations from firing while the user is still on the previous section. The element needs to be comfortably inside the viewport before it plays.

---

## Adding a New Variant

1. Add the CSS class to `app/globals.css`:

```css
.anim-my-variant {
  opacity: 0;
  transform: rotate(-5deg) translateY(30px);
  transition:
    opacity   0.9s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.anim-my-variant.in-view {
  opacity: 1;
  transform: rotate(0deg) translateY(0);
}
```

2. Add it to the `AnimVariant` type and `variantClass` map in `components/common/animate.tsx`:

```tsx
type AnimVariant = 'fade-up' | 'fade-in' | ... | 'my-variant'

const variantClass: Record<AnimVariant, string> = {
  ...
  'my-variant': 'anim-my-variant',
}
```

3. Use it:

```tsx
<Animate variant="my-variant">...</Animate>
```

---

## Performance Notes

- Uses native `IntersectionObserver` — no scroll event listeners, no layout thrashing
- Observer disconnects after first trigger (`once: true` by default) — no ongoing overhead
- CSS transitions run on the compositor thread (opacity + transform only) — no jank
- `<Animate>` adds one extra DOM element. If that's a problem, use the raw `useInView` hook on your existing element instead

---

## Easing Reference

All variants use `cubic-bezier(0.16, 1, 0.3, 1)` — a gentle ease-out that starts fast and decelerates smoothly. This is sometimes called an "expo out" curve and is common in high-end product sites.

```
Speed │▓▓▓▓▓░░░░░░░░░░░░
      │
      └──────────────── Time
         fast → slow
```

To make an animation feel snappier, lower the third value (e.g. `0.3` → `0.5`).  
To make it feel more floaty, raise the second value (e.g. `1` → `1.2` — yes, overshoot is valid).
