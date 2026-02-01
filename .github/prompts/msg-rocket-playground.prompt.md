# Prompt: Generate msg-rocket-playground Demo Server Repository

## Goal
You are an expert Node.js developer. Your task is to generate a **demo repository** called **`msg-rocket-playground`** that provides realistic staged-diff scenarios for testing the **msg-rocket** CLI tool.

The repository should be small, self-contained, and include multiple meaningful changes (feature, fix, refactor, breaking change) so that `msg-rocket` can demonstrate its value.

---

## Requirements

### 1. Repository Purpose
The repo is **not** the main product. It is a **demo playground** for:
- staging changes
- running `msg-rocket commit`
- running `msg-rocket analyze`
- running `msg-rocket pr`

The repo must be a valid Node.js project with:
- multiple modules
- a minimal HTTP server
- a small test
- a clear README

---

## 2. Technology Constraints
- Node.js (ES Modules)
- No frameworks (no Express, no Fastify)
- Use only built-in Node APIs
- Keep code simple but realistic
- Provide scripts in `package.json`

---

## 3. Repository Structure
Generate the following structure:

```
msg-rocket-playground/
├─ src/
│  ├─ index.js
│  ├─ server.js
│  ├─ routes/
│  │  └─ users.js
│  ├─ services/
│  │  └─ userService.js
│  └─ utils/
│     └─ validation.js
├─ test/
│  └─ userService.test.js
├─ package.json
└─ README.md
```

---

## 4. Functional Requirements

### Server
- The server must listen on port **3000**
- Use built-in `http` module
- Support these endpoints:

#### `POST /users`
- Creates a user
- Validates payload using `validation.js`
- Returns `201` with created user JSON
- User object:
  - `id` (generated)
  - `name`
  - `email`

#### `GET /users/:id`
- Returns user by id
- For demo simplicity, store users **in memory**
- Returns `404` if not found

### Validation
`utils/validation.js` must include:
- `validateUserCreate(payload)`
- Throws descriptive errors for:
  - missing name
  - invalid email format
  - missing email

### Service
`services/userService.js` must include:
- `createUser(payload)`
- `getUserById(id)`
- Use in-memory storage (Map)

### Routes
`routes/users.js` must:
- parse JSON body
- route to service functions
- handle errors and return meaningful HTTP codes and messages

### Tests
`test/userService.test.js` must:
- run without test frameworks (plain Node)
- validate:
  - user creation
  - invalid email throws
  - user retrieval

### package.json
Include:
- `"type": "module"`
- `"start": "node src/index.js"`
- `"test": "node test/userService.test.js"`

---

## 5. Demo Scenarios (for Judges)
Create a `README.md` that instructs judges how to produce 4 scenarios:

### Scenario A — Feature (feat)
Add a new endpoint:
- `GET /users`
- returns all users

### Scenario B — Fix (fix)
Fix email validation to allow `+` characters (e.g. `john+test@example.com`)

### Scenario C — Refactor (refactor)
Refactor:
- Move user storage into a new module `src/store/userStore.js`
- Update service and routes accordingly

### Scenario D — Breaking Change (breaking)
Change user schema:
- Rename `email` to `contactEmail`
- Update validation and service
- Update endpoints accordingly

The README should include commands like:

```bash
git checkout -b scenario-feature
# make changes
git add .
msg-rocket commit
```

---

## 6. Output Expectations
The output must be a **complete repository**, including:

- full file contents for all files listed above
- a README that explains:
  - how to run the server
  - how to run tests
  - how to run msg-rocket commands
  - how to switch between scenarios
- no partial snippets

---

## 7. Extra Requirements
- Ensure code is clean, well formatted, and easily readable
- Avoid external dependencies
- Provide meaningful error messages
- Ensure all modules are properly exported/imported

---

## Deliverable
Output must be a **single markdown file** that contains the complete repo content and instructions.
