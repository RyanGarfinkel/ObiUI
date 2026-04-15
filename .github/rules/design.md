# Rule: Design Guidelines

Before making any visual, layout, or motion decision, read the design guidelines:

**`src/patterns/design.md`**

That file is the canonical source — it is served via MCP and shown in Storybook. Do not duplicate its content here.

## Quick Reference

- Never use hardcoded colors or Tailwind palette values — see `.github/rules/tokens.md`
- Brand color is for primary actions only
- Default transition duration is `--duration-fast` (150ms) for components, `--duration-base` (200ms) for navigation
- Page transitions are handled globally — do not add per-page entry animations
- All motion must respect `prefers-reduced-motion`
- Every interactive element needs hover, focus, and focus-visible states — see `src/patterns/interactive-states.mdx`
