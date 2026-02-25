# Project Structure

## Directory Organization

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── components/        # Page-specific components
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # 404 page
├── components/            # Shared/reusable components
│   ├── buttons/          # Button variants
│   ├── links/            # Link components
│   ├── NextImage.tsx     # Optimized image wrapper
│   └── Skeleton.tsx      # Loading skeleton
├── lib/                   # Utility functions
│   ├── utils.ts          # cn() helper for class merging
│   ├── helper.ts         # General helpers
│   ├── logger.ts         # Logging utilities
│   ├── og.ts             # Open Graph utilities
│   └── env.ts            # Environment validation
├── constant/              # Constants and config
│   ├── config.ts         # App configuration
│   └── env.ts            # Environment variables
├── styles/                # Global styles
│   ├── globals.css       # Global CSS + Tailwind
│   └── colors.css        # Color definitions
├── __tests__/            # Test files
└── __mocks__/            # Test mocks

public/
├── favicon/              # Favicon assets
├── fonts/                # Font files
├── images/               # Static images
└── svg/                  # SVG files
```

## Component Organization

- Page-specific components go in `src/app/[route]/components/`
- Reusable components go in `src/components/` organized by type
- Components use named exports for better tree-shaking
- Each component type has its own subdirectory (buttons, links, etc.)

## Import Conventions

Use absolute imports with path aliases:

```typescript
import Button from '@/components/buttons/Button';
import Logo from '~/svg/Logo.svg';
```

Import order (enforced by ESLint):

1. External libraries
2. CSS files
3. Lib and hooks (`@/lib`, `@/hooks`)
4. Static data (`@/data`)
5. Components (`@/components`)
6. Store (`@/store`)
7. Other `@/` imports
8. Relative imports
9. Types (`@/types`)

## File Naming

- Components: PascalCase (e.g., `Button.tsx`, `ArrowLink.tsx`)
- Utilities: camelCase (e.g., `utils.ts`, `helper.ts`)
- Config files: kebab-case (e.g., `next.config.js`)
- Test files: `*.test.ts` or `*.test.tsx`
