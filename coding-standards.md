# JavaScript Coding Standards

## Naming
- Use clear, descriptive names for variables, functions, and classes.
- Use camelCase for variables/functions, PascalCase for classes.

## Code Style
- Keep code DRY (Don’t Repeat Yourself). Extract repeated logic into functions.
- Use 'use strict' at the top of files.
- Use constants for values that don’t change.
- Prefer `const` and `let` over `var`.
- Use consistent formatting (indentation, spacing). Use Prettier or similar tools.

## Structure
- Organize code into small, reusable modules.
- Separate concerns: keep business logic, data, and UI in different files.

## Error Handling
- Always handle errors in async code with try/catch.
- Validate inputs and handle edge cases.

## Best Practices
- Avoid global variables.
- Use comments to explain complex logic or intent.
- Use async/await for async code, always with error handling.
- Use object destructuring for cleaner code.