# Design Guidelines

These principles apply to every component, pattern, and page in this design system. Read this before making any visual or layout decision.

---

## Philosophy

Design should be invisible. The user's goal is to complete a task — the interface should get out of the way. Every visual decision should either aid comprehension or communicate state. If it does neither, remove it.

- **Subtle over loud** — restraint is a feature. Hover states, transitions, and shadows should be noticeable without demanding attention.
- **Consistent over clever** — prefer the established pattern. Deviations require justification.
- **Functional over decorative** — color, motion, and emphasis exist to communicate, not to decorate.

---

## Motion

Animation should feel natural, not performative. The goal is to smooth transitions and orient the user — not to entertain them.

### Principles

- **Purposeful** — animate to show state change, hierarchy, or navigation direction. Never animate for its own sake.
- **Subtle** — short durations, gentle easing. If an animation draws attention to itself, it is too much.
- **Respectful** — always honor `prefers-reduced-motion`. All animations are wrapped in a reduced-motion check.

### Durations

| Token              | Value  | Use case                                      |
|--------------------|--------|-----------------------------------------------|
| `--duration-fast`  | 150ms  | Micro-interactions: hover, focus ring, toggle |
| `--duration-base`  | 200ms  | Page transitions, modals, dropdowns           |
| `--duration-slow`  | 300ms  | Complex entry animations, large surface moves |

Default to `--duration-fast` for component-level transitions. Use `--duration-base` for anything that involves layout change or navigation.

### Easing

| Token              | Curve                        | Use case                    |
|--------------------|------------------------------|-----------------------------|
| `--ease-standard`  | cubic-bezier(0.2, 0, 0, 1)   | General transitions         |
| `--ease-enter`     | cubic-bezier(0, 0, 0.2, 1)   | Elements entering the screen |
| `--ease-exit`      | cubic-bezier(0.4, 0, 1, 1)   | Elements leaving the screen  |

### Page Transitions

Pages fade out and fade in using the CSS View Transitions API (`@view-transition { navigation: auto }`). This is configured globally in `globals.css` — no per-page code needed.

The transition uses `--duration-base` (200ms) with `--ease-exit` on the outgoing page and `--ease-enter` on the incoming page.

Do not add page-level entry animations that duplicate or conflict with the view transition. The fade handles it.

### Component Transitions

Use `transition-all duration-[var(--duration-fast)]` as the default for interactive components. The `Button` and `Input` components already implement this pattern — follow it for new components.

---

## Color

Color is used to communicate, not to decorate.

- **Brand color** (`bg-brand`) is reserved for the single primary action on a screen. Do not use it for decorative elements or secondary actions.
- **Danger color** (`bg-danger`) is reserved for destructive or irreversible actions. Using it for anything else erodes its meaning.
- **Surface and text tokens** handle all neutral UI. Do not reach for Tailwind's built-in zinc/gray palette — use the surface and text tokens, which respond to dark mode automatically.
- **Never hardcode hex values or Tailwind palette classes** in components. Always use tokens. See `.github/rules/tokens.md`.

---

## Spacing

Spacing follows Tailwind's default 4px base unit. Prefer spacing values from the scale (1, 2, 3, 4, 6, 8, 10, 12, 16) over arbitrary values.

- Use consistent internal padding within a component family — all form elements should share the same horizontal padding.
- Increase spacing to create hierarchy, not font size alone.

---

## Typography

- Body text: `text-sm` (14px) for dense UI, `text-base` (16px) for reading contexts.
- Labels: `text-sm font-medium` — never bold for regular labels.
- Use `tracking-tight` on buttons and headings. Leave body text at default tracking.
- Do not use more than two font weights on a single surface.

---

## Accessibility

- Every interactive element must implement all three states: hover, focus, focus-visible. See `src/patterns/interactive-states.mdx`.
- Color is never the only means of communicating state — pair it with a label, icon, or border change.
- All motion respects `prefers-reduced-motion`.
- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text and UI components.
