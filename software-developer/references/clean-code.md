# Clean Code Principles

Follow these rules to ensure high-quality, maintainable implementation.

## 1. YAGNI (You Ain't Gonna Need It)
- Do not add features, logic, or "just-in-case" code that isn't explicitly requested.
- Avoid over-engineering; choose the simplest solution that fulfills the requirement.

## 2. DRY (Don't Repeat Yourself)
- Extract repetitive logic into small, focused utility functions.
- Use constants for shared values (colors, limits, strings).

## 3. Readability & Structure
- Use meaningful variable and function names.
- Keep components small and focused on a single responsibility.
- Use whitespace to group related logic and separate distinct sections.

## 4. Performance & Efficiency
- Use `useMemo` and `useCallback` where appropriate to prevent unnecessary re-renders.
- Minimize state updates and avoid redundant state variables.
