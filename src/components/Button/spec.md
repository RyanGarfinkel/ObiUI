# Button

A clickable control that triggers an action.

## Variants

| Variant      | Use case                                                        |
|--------------|-----------------------------------------------------------------|
| primary      | The main call to action on a page or section                    |
| secondary    | Supporting actions alongside a primary                          |
| outlined     | Medium-emphasis; same weight as secondary but more visible      |
| ghost        | Low-emphasis actions, often in dense UIs                        |
| link         | Inline or contextual actions that should read as text           |
| destructive  | Irreversible or dangerous actions                               |

## Sizes

| Size | Height | Use case              |
|------|--------|-----------------------|
| sm   | 32px   | Compact / inline use  |
| md   | 36px   | Default               |
| lg   | 44px   | Prominent / hero use  |

## Props

| Prop      | Type                                                           | Default   |
|-----------|----------------------------------------------------------------|-----------|
| variant   | primary \| secondary \| outlined \| ghost \| link \| destructive | primary   |
| size      | sm \| md \| lg                                    | md        |
| disabled  | boolean                                           | false     |
| className | string                                            | —         |

Extends all native `<button>` HTML attributes.

## Interactive States

- **hover**: background and border shift one step (e.g. blue-600 → blue-700; zinc-200 border → zinc-300)
- **active**: background darkens further; element scales down slightly (`scale-[0.98]`) to convey press
- **focus**: outline suppressed (`focus:outline-none`)
- **focus-visible**: 2px ring with 2px offset in the variant's ring color — keyboard navigation only
- **disabled**: 40% opacity, pointer events disabled — no hover, active, or focus states

## Visual Design

- `rounded-md` — subtle rounding, not pill
- `shadow-sm` on primary, secondary, destructive — lifts the element off the surface
- `tracking-tight` — tighter letter spacing for label legibility
- `transition-all duration-150` — smooth color and scale transitions
- ghost variant has no background or border by default; hover adds `bg-zinc-100`
- secondary variant has a `border-zinc-200` border at rest

## Tokens Used

- Colors: `colors.primary`, `colors.secondary`, `colors.ghost`, `colors.destructive`

## When to Use

- Use `primary` once per view — it anchors the main action
- Use `secondary` for secondary confirmations or alternative paths
- Use `ghost` when the button needs to recede visually (toolbars, table rows)
- Use `destructive` only when the action deletes or cannot be undone — pair with a confirmation step for critical actions
