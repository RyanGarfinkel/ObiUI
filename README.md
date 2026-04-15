# Obi UI

A design system built on Next.js, Tailwind v4, and Storybook. Token-driven, dark-mode ready, and fully accessible.

## Getting Started

```bash
npm install
npm run dev        # Next.js dev server
npm run storybook  # Storybook component explorer
```

## Commands

| Command                 | Description                        |
|-------------------------|------------------------------------|
| `npm run dev`           | Start the Next.js dev server       |
| `npm run storybook`     | Start Storybook on port 6006       |
| `npm run build`         | Build the Next.js app              |
| `npm run build-storybook` | Build a static Storybook         |
| `npm run test`          | Run Vitest unit tests              |
| `npm run test:watch`    | Run tests in watch mode            |
| `npm run lint`          | Run ESLint                         |

## Structure

```
src/
  components/   # UI components — each in its own folder with TSX, stories, tests, and spec.md
  tokens/       # Design token definitions (TypeScript mirror of globals.css)
  patterns/     # Design guidelines and pattern documentation
mcp/            # MCP server for AI-assisted component lookup
.github/rules/  # Rules for AI agents working in this repo
```

## Contributing

Before adding or modifying a component, read the rules in `.github/rules/`:

- `design.md` — visual and motion decisions
- `tokens.md` — how to use design tokens
- `new-component.md` — required file structure for every component
- `commits.md` — commit message format
