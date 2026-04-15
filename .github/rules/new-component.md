# Rule: New Component

Apply this rule whenever creating a new UI component in `src/components/`.

## Required File Structure

Every component lives in its own folder under `src/components/`. The folder name is PascalCase and matches the component name exactly.

```
src/components/ComponentName/
├── ComponentName.tsx        # The component
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx   # Vitest unit tests
└── spec.md                  # Machine-readable spec for MCP
```

No exceptions. All four files are required.

## Interactive States

Every interactive element in the component must implement all three states. Reference: `src/patterns/interactive-states.mdx`.

| State         | Implementation                                                    |
|---------------|-------------------------------------------------------------------|
| hover         | Distinct background or border shift via `hover:` Tailwind prefix |
| focus         | `focus:outline-none` — suppresses browser default                 |
| focus-visible | `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-{color}` |

Rules:
- Hover, default, and focus-visible must each be visually distinct from one another
- Disabled elements must not show hover or focus-visible styles
- Ring color must match the component's semantic intent (primary → blue, destructive → red, neutral → zinc)

## ComponentName.tsx

- `'use client';` on line 1 if the component uses hooks or browser APIs
- Export the component as the default export
- Export the props interface as a named export
- Export any variant/size union types as named exports
- Extend the relevant native HTML element's attributes (`ButtonHTMLAttributes`, `InputHTMLAttributes`, etc.) so consumers can pass through native props
- Accept and spread a `className` prop to allow style extension

## ComponentName.stories.tsx

- Default export is the `Meta` config with `title: 'Components/{Category}/ComponentName'` and `tags: ['autodocs']`
- `{Category}` must be one of the Storybook folders below — pick the one that best fits the component:

  | Category      | Components it contains                                      |
  |---------------|-------------------------------------------------------------|
  | `Actions`     | Button and any other action-triggering components           |
  | `Inputs`      | Input, Textarea, Radio, Switch, ToggleGroup, CalendarInput  |
  | `Display`     | Card, Table, Skeleton, Typography                           |
  | `Navigation`  | Tabs, Breadcrumb                                            |
  | `Forms`       | Form and form-layout primitives                             |
  | `Disclosure`  | Accordion and other show/hide components                    |
- Include individual stories for each variant and size
- Include an `AllVariants` or equivalent story showing all variants together
- Include a `Disabled` story if the component supports a disabled state
- Story args use the component's exported prop types

## ComponentName.test.tsx

Use Vitest and `@testing-library/react`. Tests must cover:

1. **Renders** — component mounts without errors
2. **Variants** — each variant renders with the correct Tailwind classes
3. **Interactive states** — hover, focus-visible classes are present on the element
4. **Disabled** — disabled state removes pointer events and shows correct classes
5. **Accessibility** — any `aria-*` attributes set by the component are correct
6. **Forwarded props** — native HTML attributes (e.g. `onClick`, `type`) are passed through

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ComponentName from './ComponentName';

describe('ComponentName', () =>
{
	it('renders without errors', () =>
	{
		render(<ComponentName />);
		// assertions
	});
});
```

## spec.md

The spec is the source of truth for the MCP server. It must include:

- One-line description of what the component is
- Props table: name, type, default, description
- Variants table (if applicable)
- Interactive states section describing the visual behavior of each state
- Accessibility notes (aria attributes, keyboard behavior)
- "When to use" guidance
- Tokens used

---

# Rule: Updating a Component

Apply this rule whenever modifying an existing component in `src/components/`.

## Always Update spec.md

`spec.md` is the source of truth for the MCP server. Any change to a component's external behavior must be reflected there before the PR is complete.

Changes that require a spec update:
- Adding, removing, or renaming a prop
- Changing a prop's type, default value, or accepted values
- Adding or removing a variant or size
- Changing interactive state behavior (hover, focus-visible, active, disabled)
- Changing accessibility attributes or keyboard behavior
- Changing visual design in a way that affects the "When to use" guidance

Changes that do not require a spec update:
- Internal refactors with no external behavior change
- Performance improvements
- File reorganization

## Update Tests When Behavior Changes

Update `ComponentName.test.tsx` whenever:
- A prop is added, removed, or renamed — add/remove/update the corresponding test
- A class name changes — update assertions that check for that class
- A new variant or size is added — add a test case for it
- Accessibility attributes change — update `aria-*` assertions

Do not delete tests unless the behavior they cover no longer exists. Do not leave tests asserting against stale class names or removed props.
