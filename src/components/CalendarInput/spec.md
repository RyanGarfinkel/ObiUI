# CalendarInput

A date picker composed of a text input trigger that opens an inline calendar popover for selecting a date. Renders entirely within normal document flow using absolute positioning — no portal.

---

## Props

| Prop          | Type                          | Default           | Description                                                    |
|---------------|-------------------------------|-------------------|----------------------------------------------------------------|
| `value`       | `Date \| null`                | `undefined`       | The currently selected date.                                   |
| `onChange`    | `(date: Date \| null) => void`| `undefined`       | Callback fired when the user selects a day.                    |
| `placeholder` | `string`                      | `"Select a date"` | Text shown in the trigger when no date is selected.            |
| `label`       | `string`                      | `undefined`       | Visible label rendered above the input.                        |
| `error`       | `string`                      | `undefined`       | Error message rendered below the input; triggers error styles. |
| `hint`        | `string`                      | `undefined`       | Helper text rendered below the input when there is no error.   |
| `disabled`    | `boolean`                     | `false`           | Disables the trigger and prevents the calendar from opening.   |
| `minDate`     | `Date`                        | `undefined`       | Earliest selectable date. Days before this are disabled.       |
| `maxDate`     | `Date`                        | `undefined`       | Latest selectable date. Days after this are disabled.          |
| `id`          | `string`                      | auto-generated    | HTML id for the trigger button. Linked to the label.           |
| `className`   | `string`                      | `""`              | Additional classes merged onto the trigger button.             |

---

## Date Display Format

Selected dates are displayed as `MMM D, YYYY` — e.g. `Apr 13, 2026`.

---

## Interactive States

### Trigger button

| State         | Visual                                                                 |
|---------------|------------------------------------------------------------------------|
| Default       | `border-input-border` background `bg-surface`                          |
| Hover         | `border-input-border-hover` — border darkens slightly                  |
| Focus-visible | `outline-input-ring` — 3px outline at offset 0, no extra ring          |
| Error         | `border-input-error` with `outline-input-error-ring` on focus          |
| Disabled      | `bg-input-disabled-bg`, `text-input-disabled-text`, `cursor-not-allowed`, no hover/focus effects |

### Day buttons (inside popover)

| State         | Visual                                                              |
|---------------|---------------------------------------------------------------------|
| Default       | Transparent background, `text-text`                                 |
| Hover         | `bg-surface-hover` with `rounded-md`                                |
| Focus-visible | `ring-2 ring-offset-2 ring-brand-ring`                              |
| Selected      | `bg-brand text-brand-fg rounded-md`                                 |
| Today         | `ring-1 ring-brand` (only when not selected)                        |
| Outside month | `text-text-muted` — filler days from adjacent months                |
| Disabled      | `opacity-40 pointer-events-none` — outside `minDate`/`maxDate` range |

### Navigation buttons (prev/next month)

| State         | Visual                                                 |
|---------------|--------------------------------------------------------|
| Default       | `text-text-muted`                                      |
| Hover         | `bg-surface-hover text-text`                           |
| Focus-visible | `ring-2 ring-offset-2 ring-brand-ring`                 |
| Active        | `bg-surface-active`                                    |

---

## Calendar Navigation

- The popover displays one month at a time.
- The header shows "Month YYYY" (e.g. "April 2026") flanked by previous/next chevron buttons.
- Clicking previous or next month updates the displayed month without changing the selected value.
- The grid is always 6 rows × 7 columns (42 cells) — filler days from adjacent months fill empty cells.
- The displayed month initializes to the selected value's month, or the current month when no value is set.
- When a value is set externally, the displayed month syncs to that date's month.

---

## Close Behavior

The calendar popover closes on:
- Selecting a day
- Pressing `Escape`
- Clicking outside the component (`mousedown` on `document`)

---

## Accessibility

### ARIA attributes

| Element                | Attribute                           | Value / Behavior                                          |
|------------------------|-------------------------------------|-----------------------------------------------------------|
| Trigger button         | `aria-haspopup`                     | `"dialog"`                                                |
| Trigger button         | `aria-expanded`                     | `true` when open, `false` when closed                     |
| Trigger button         | `aria-controls`                     | ID of the popover `div` when open                         |
| Trigger button         | `aria-invalid`                      | `true` when `error` prop is set                           |
| Trigger button         | `aria-describedby`                  | Points to error element ID or hint element ID             |
| Popover `div`          | `role`                              | `"dialog"`                                                |
| Popover `div`          | `aria-label`                        | `"Date picker"`                                           |
| Prev/next nav buttons  | `aria-label`                        | `"Previous month"` / `"Next month"`                       |
| Day buttons            | `aria-label`                        | Full date string, e.g. `"Monday, April 13, 2026"`         |
| Day buttons            | `aria-pressed`                      | `true` when the day matches the selected value            |

### Keyboard behavior

| Key      | Behavior                                  |
|----------|-------------------------------------------|
| `Enter` / `Space` | Activates the focused button (standard browser behavior) |
| `Escape` | Closes the calendar popover               |
| `Tab`    | Moves focus sequentially through all interactive elements in the popover |

---

## When to Use

- When a user needs to select a specific calendar date (appointment, booking, deadline).
- Prefer this over a plain `<input type="date">` for design consistency and cross-browser control.
- Use `minDate` and `maxDate` to constrain valid selections to a meaningful range.
- Do not use for selecting a time — this component handles dates only.
- For relative date selection ("in 3 days", "next week") prefer a different pattern.

---

## Tokens Used

| Token                        | Applied to                                        |
|------------------------------|---------------------------------------------------|
| `bg-surface`                 | Trigger background, popover background            |
| `bg-surface-hover`           | Hover state for day buttons and nav buttons       |
| `bg-surface-active`          | Active state for nav buttons                      |
| `border-surface-border`      | Popover border                                    |
| `border-input-border`        | Trigger default border                            |
| `border-input-border-hover`  | Trigger hover border                              |
| `border-input-error`         | Trigger error border                              |
| `bg-input-disabled-bg`       | Trigger disabled background                       |
| `text-input-disabled-text`   | Trigger disabled text                             |
| `text-input-error`           | Error message text                                |
| `outline-input-ring`         | Trigger focus-visible outline (normal)            |
| `outline-input-error-ring`   | Trigger focus-visible outline (error)             |
| `bg-brand`                   | Selected day background                           |
| `text-brand-fg`              | Selected day text                                 |
| `ring-brand`                 | Today indicator ring, day focus-visible ring      |
| `ring-brand-ring`            | Focus-visible ring on day and nav buttons         |
| `text-text`                  | Primary text (trigger, day numbers, month label)  |
| `text-text-muted`            | Hint text, outside-month day numbers, nav icons   |
| `text-text-subtle`           | Placeholder text                                  |
