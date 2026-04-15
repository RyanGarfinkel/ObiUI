# Rule: Writing Commit Messages

Commits follow the [Conventional Commits](https://www.conventionalcommits.org) spec and are enforced by commitlint on every commit (husky) and on every PR (CI).

## Format

```
type: short description
```

The header must be 72 characters or fewer. The description must be lower-case.

## Allowed Types

| Type       | When to use                                               |
|------------|-----------------------------------------------------------|
| `feat`     | A new component, variant, token, pattern, or MCP resource |
| `fix`      | A bug fix or incorrect behavior                           |
| `docs`     | Changes to `.md`, `.mdx`, or `spec.md` files only        |
| `style`    | Visual/CSS changes with no behavior change                |
| `refactor` | Code restructure with no behavior or visual change        |
| `test`     | Adding or updating tests only                             |
| `chore`    | Config, tooling, dependencies, CI                         |

## Examples

```
feat: add Select component
fix: correct focus-visible ring color on outlined button
docs: update Button spec with outlined variant
style: increase outlined border to 2px
refactor: extract variant classes into separate map
test: add disabled state tests for Input
chore: add commitlint and husky
```

## Rules

- No scope required — keep it flat
- No capital letter at the start of the description
- No period at the end
- Use imperative mood: "add", not "added" or "adds"
- If a commit touches multiple concerns, split it into multiple commits
