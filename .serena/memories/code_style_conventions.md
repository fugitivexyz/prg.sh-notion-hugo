# Code Style and Conventions

## TypeScript Configuration
- Target: ESNext
- Module: CommonJS
- Strict mode enabled
- ES module interop enabled
- Output directory: `./dist`

## Formatting
- Uses Prettier with default configuration (empty `.prettierrc` = defaults)
- Run `npm run format` to format all TypeScript files in src/

## Code Style Patterns

### Type Definitions
- Use Zod schemas for runtime type validation (see `src/config.ts`)
- Export both the schema and inferred TypeScript type
- Example pattern:
  ```typescript
  const MySchema = z.object({ ... })
  type MyType = z.infer<typeof MySchema>
  ```

### File Organization
- Core sync logic in `src/`
- Markdown conversion utilities in `src/markdown/`
- Cloudflare edge functions in `functions/`
- Hugo configuration in `config/`

### Naming Conventions
- Files: lowercase with hyphens (e.g., `notion-to-md.ts`)
- Functions: camelCase
- Types/Interfaces: PascalCase
- Constants: camelCase or UPPER_SNAKE_CASE

### Error Handling
- Use async/await with try/catch
- Log errors to console with descriptive messages

### Comments
- Minimal inline comments
- Code should be self-documenting
- Complex logic may have brief explanations
