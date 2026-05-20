# Spelling & Copy Audit

Issues found across the codebase, organised by file with the required fix.

---

## `app/services/page.tsx`

| Line | Issue | Fix |
|------|-------|-----|
| 30 | `<span>` reads "Portfolio" but this is the Services page | Change `Portfolio` → `Services` |

## `app/services/[slug]/service-client.tsx`

| Line | Issue | Fix |
|------|-------|-----|
| 59 | `md:px-2.5full` — value concatenated incorrectly | Change to `md:px-2.5` |
| 366 | Double space before closing quote | `"mt-12 md:mt-5  "` → `"mt-12 md:mt-5"` |

## `app/page.tsx`

| Line | Issue | Fix |
|------|-------|-----|
| 83 | Double space before self-close | `<ServicesSection show={4} />` |

## `components/layout/mega-menu.tsx`

| Line | Issue | Fix |
|------|-------|-----|
| 14 | Missing space between imports | `Truck,ShoppingCart,` → `Truck, ShoppingCart,` |
| 46, 49 | Missing apostrophe | `the worlds biggest` → `the world's biggest` |
| 46, 49 | Description is a generic placeholder: *"A global team of organic media planners behind some of the worlds biggest category leaders"* — does not describe a software agency | Replace with actual copy about Thrill Edge Technologies |
| 99 | Lowercase brand name | `alt: 'google'` → `alt: 'Google'` |
| 167 | Missing space in comment | `panelpositioned` → `panel positioned` |

## `components/sections/hero-section.tsx`

| Line | Issue | Fix |
|------|-------|-----|
| 209 | Missing space after period | `revenue</span>.We deliver` → `revenue</span>. We deliver` |

## `components/sections/work-section.tsx`

| Line | Issue | Fix |
|------|-------|-----|
| 25 | Odd capitalisation on "Period" | `We deliver Period` → `We deliver. Period.` |

## `components/layout/footer.tsx`

| Line | Issue | Fix |
|------|-------|-----|
| 30 | Space in image filename | Rename file to `thrill-edge-logo.png` and update `src` |

## `components/layout/header.tsx` / `mega-menu.tsx`

| File | Line | Issue | Fix |
|------|------|-------|-----|
| header.tsx | 46 | Uses `ShoppingBag` for Shopify | Use same icon (`ShoppingCart` or `ShoppingBag`) in both files |
| mega-menu.tsx | 14 | Uses `ShoppingCart` for Shopify | Use same icon in both files |

## `app/sitemap.ts`

| Line | Issue | Fix |
|------|-------|-----|
| 7 | Slug `ai-and-ml-solutions` does not match routing | Change to `ai-ml-solutions` to match nav links |
| 32 | `/technologies/devops` has no nav link or page | Either add the page/route or remove from sitemap |

## `app/globals.css`

| Line | Issue | Fix |
|------|-------|-----|
| 294-296 | Fragile CSS selector using escaped Tailwind utilities (`hover\:shadow-lg`, etc.) | Replace with a stable class or `!important` on a dedicated selector |

## `lib/store.ts`

| Line | Issue | Fix |
|------|-------|-----|
| 39 | `isDarkMode: true` is default, but `.dark` CSS variables are identical to `:root` (no visible theme change) | Either remove dark mode or define distinct dark colours |

## `app/layout.tsx`

| Line | Issue | Fix |
|------|-------|-----|
| 79 | `data-scroll-behavior="smooth"` is not a standard HTML attribute | Remove the attribute (CSS `scroll-behavior: smooth` is already set in `globals.css:145`) |
