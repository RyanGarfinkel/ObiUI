# Input

A single-line text input with optional label, hint, and error messaging.

## Props

| Prop        | Type    | Default | Description                                       |
|-------------|---------|---------|---------------------------------------------------|
| label       | string  | —       | Visible label, also used to derive the input `id` |
| placeholder | string  | —       | Placeholder text                                  |
| hint        | string  | —       | Helper text shown below the input                 |
| error       | string  | —       | Error message; switches input to error state      |
| disabled    | boolean | false   | Disables the input                                |

Extends all native `<input>` HTML attributes. Accepts a `ref`.

## Interactive States

- **hover**: border shifts from zinc-300 → zinc-400
- **focus**: outline suppressed (`focus:outline-none`)
- **focus-visible**: 2px ring with 2px offset — blue-600 default, red-500 in error state
- **disabled**: bg-zinc-50, text/border muted, cursor not-allowed — no hover or focus states

## Error State

Set the `error` prop to a non-empty string to enter the error state:
- Border becomes red-500
- Focus-visible ring becomes red-500
- Error message is rendered below the input
- `aria-invalid="true"` and `aria-describedby` are set automatically

## Accessibility

- `label` and `id` are linked via `htmlFor` / `id`
- Error and hint messages are associated via `aria-describedby`
- Error state sets `aria-invalid="true"`

## Tokens Used

- Colors: `colors.input`
