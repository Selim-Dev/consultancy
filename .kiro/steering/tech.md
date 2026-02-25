# Tech Stack

## Core Framework

- Next.js 15 (App Router)
- React 19
- TypeScript 5

## Styling

- Tailwind CSS 4
- PostCSS
- CSS Variables for theming
- `clsx` + `tailwind-merge` for conditional classes (use `cn()` utility)

## Key Libraries

- `lucide-react` and `react-icons` for icons
- `zod` for schema validation
- `@svgr/webpack` for SVG-as-component imports

## Development Tools

- ESLint with TypeScript support
- Prettier with Tailwind plugin
- Husky for git hooks
- lint-staged for pre-commit checks
- Commitlint for conventional commits
- Jest + React Testing Library for testing

## Common Commands

```bash
# Development
pnpm dev                 # Start dev server

# Building
pnpm build              # Production build
pnpm start              # Start production server

# Code Quality
pnpm lint               # Run ESLint
pnpm lint:fix           # Fix ESLint issues and format
pnpm lint:strict        # Strict linting (no warnings)
pnpm typecheck          # TypeScript type checking
pnpm format             # Format with Prettier
pnpm format:check       # Check formatting

# Testing
pnpm test               # Run tests once
pnpm test:watch         # Run tests in watch mode
```

## Path Aliases

- `@/*` maps to `src/*`
- `~/*` maps to `public/*`
