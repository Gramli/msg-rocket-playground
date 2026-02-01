# :video_game: msg-rocket-playground

This repository serves as a **demo playground** for testing and demonstrating the capabilities of the **[msg-rocket](https://github.com/Gramli/msg-rocket)** CLI tool. 

It is a simple Node.js HTTP server (no frameworks) designed to simulate realistic development scenarios including features, bug fixes, refactoring, and breaking changes.

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)

### Clone
```bash
git clone https://github.com/Gramli/msg-rocket-playground.git
```

### Running the Server
Start the HTTP server on port 3000:
```bash
npm start
```

Endpoints:
- `POST /users`: Create a user `{"name": "John", "email": "john@example.com"}`
- `GET /users/:id`: Get a user by ID

### Manual Testing
You can use the included `api.http` file to test the endpoints directly in VS Code (requires the "REST Client" extension or similar).

### Running Tests
Execute the built-in test suite:
```bash
npm test
```

## Using msg-rocket

This repo is set up to test `msg-rocket` workflows.

1. **Commit Changes**: Use `msg-rocket commit` instead of `git commit` to generate AI-powered commit messages.
2. **Analyze Changes**: Use `msg-rocket analyze` to get a summary of your staged changes.

## Demo Scenarios

Follow these scenarios to test different types of changes.

### Scenario A — Feature (feat)
*Goal: Add a new endpoint to list all users.*

1. Create a branch:
   ```bash
   git checkout -b feature/list-users
   ```
2.  Modify `src/services/userService.js`: Add a `getAllUsers()` function that returns `Array.from(userStore.values())`.
3.  Modify `src/routes/users.js`: Add handling for `GET /users` to call `getAllUsers` and return the list.
4.  Stage changes:
    ```bash
    git add .
    ```
5.  Run msg-rocket:
    ```bash
    msg-rocket commit
    ```

### Scenario B — Fix (fix)
*Goal: Allow '+' characters in email addresses.*

1. Create a branch:
   ```bash
   git checkout -b fix/email-validation
   ```
2. Modify `src/utils/validation.js`: Update the regex to allow `+` in the email local part.
   - Old: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
   - Suggestion: `/^[\w\-\.\+]+@([\w-]+\.)+[\w-]{2,4}$/` or similar.
3. Stage changes:
   ```bash
   git add .
   ```
4. Run msg-rocket:
    ```bash
    msg-rocket commit
    ```

### Scenario C — Refactor (refactor)
*Goal: Move user storage to a dedicated store module.*

1. Create a branch:
   ```bash
   git checkout -b refactor/store-module
   ```
2. Create `src/store/userStore.js` and move the `userStore` Map logic there.
3. Update `src/services/userService.js` to import from `src/store/userStore.js`.
4. Stage and commit with msg-rocket.

### Scenario D — Breaking Change (breaking)
*Goal: Rename `email` field to `contactEmail`.*

1. Create a branch:
   ```bash
   git checkout -b breaking/rename-email
   ```
2. Modify `src/utils/validation.js` to check for `contactEmail`.
3. Modify `src/services/userService.js` to store `contactEmail`.
4. Run tests (`npm test`) - **They should fail**.
5. Update tests `test/userService.test.js` to use `contactEmail`.
6. Stage and commit with msg-rocket.

---

*Generated for msg-rocket CLI testing.*
