# NPM/Yarn Scripts Reference

Complete reference for all available scripts in `package.json`.

## Development Scripts

### `yarn start`

**Command**: `webpack-dashboard -- node ./dot/server.js`

Starts the development server with Webpack Dashboard.

**What it does**:
- Runs Express server from `dot/server.js`
- Enables Hot Module Replacement (HMR)
- Shows Webpack Dashboard in terminal
- Watches for file changes in `config/`, `dot/`, and `src/`

**Usage**:
```bash
yarn start
```

**Environment**: Development

---

### `yarn udev`

**Command**: `webpack-dashboard -- webpack-dev-server --config ./config/webpack/webpack.config.development.js`

Legacy development server command.

**What it does**:
- Starts Webpack Dev Server
- Uses development configuration
- Enables HMR

**Usage**:
```bash
yarn udev

# With auto-open browser
yarn udev -- --open
```

**Environment**: Development

---

### `yarn udevop`

**Command**: `nodemon ./dot/server.js --watch config --watch dot`

Development server with nodemon for server-side changes.

**What it does**:
- Runs server with nodemon
- Auto-restarts on changes to `config/` or `dot/`

**Usage**:
```bash
yarn udevop
```

**Environment**: Development

---

## Build Scripts

### `yarn build`

**Command**: `yarn run build:client && yarn run build:server`

Full production build.

**What it does**:
1. Cleans build directory (`prebuild` hook)
2. Builds client bundle
3. Builds server bundle

**Usage**:
```bash
yarn build
```

**Output**: `build/client/` and `build/server/`

**Environment**: Production

---

### `yarn build:client`

**Command**: `cross-env NODE_ENV=production webpack --config ./webpack/webpack.config.production.js --progress`

Builds client-side bundle.

**What it does**:
- Bundles JavaScript
- Processes styles
- Optimizes assets
- Generates source maps
- Shows build progress

**Usage**:
```bash
yarn build:client
```

**Output**: `build/client/`

---

### `yarn build:server`

**Command**: `cross-env NODE_ENV=production webpack --config ./webpack/webpack.config.server.js --progress`

Builds server-side bundle (if applicable).

**Usage**:
```bash
yarn build:server
```

**Output**: `build/server/`

---

### `yarn build:serve`

**Command**: `http-server build/client -p 3003 --cors -o`

Serves production build locally.

**What it does**:
- Starts HTTP server on port 3003
- Enables CORS
- Opens browser automatically

**Usage**:
```bash
# Build first
yarn build

# Then serve
yarn build:serve
```

**Access**: `http://localhost:3003`

---

### `yarn build:profile`

**Command**: `cross-env NODE_ENV=production webpack --config ./webpack/webpack.config.production.js --profile --json > profile.json`

Builds with profiling data for analysis.

**What it does**:
- Builds for production
- Generates profiling data
- Outputs JSON to `profile.json`

**Usage**:
```bash
yarn build:profile

# Analyze with webpack-bundle-analyzer
npx webpack-bundle-analyzer profile.json
```

---

### `yarn ubuild`

**Command**: `rimraf ./dist && NODE_ENV=build webpack --config ./config/webpack/webpack.config.development.js`

Legacy unified build command.

**What it does**:
- Cleans `dist/` directory
- Builds to `dist/web/`

**Usage**:
```bash
yarn ubuild
```

**Output**: `dist/web/`

---

### `yarn ustart`

**Command**: `yarn run build && http-server ./dist/web`

Legacy build and serve command.

**Usage**:
```bash
yarn ustart
```

---

## Clean Scripts

### `yarn clean:build`

**Command**: `rimraf build`

Removes build directory.

**Usage**:
```bash
yarn clean:build
```

**Note**: Automatically runs before `yarn build` (prebuild hook)

---

## Test Scripts

### `yarn test`

**Command**: `cross-env BABEL_ENV=commonjs jest --no-cache --config ./.jestconfig.json`

Runs all tests.

**What it does**:
- Runs Jest test suite
- Uses `.jestconfig.json` configuration
- Disables caching for fresh run

**Usage**:
```bash
yarn test
```

**Environment**: Test

---

### `yarn test:watch`

**Command**: `yarn test -- --watch`

Runs tests in watch mode.

**What it does**:
- Watches for file changes
- Re-runs related tests automatically
- Interactive test runner

**Usage**:
```bash
yarn test:watch
```

**Interactive commands**:
- `p` - Filter by filename pattern
- `t` - Filter by test name pattern
- `q` - Quit watch mode
- `Enter` - Trigger test run

---

### `yarn test:cov`

**Command**: `yarn test -- --coverage`

Runs tests with coverage report.

**What it does**:
- Runs all tests
- Generates coverage report
- Shows coverage summary in terminal
- Creates detailed HTML report

**Usage**:
```bash
yarn test:cov
```

**Output**: `coverage/` directory

**View HTML report**:
```bash
open coverage/lcov-report/index.html
```

---

### `yarn utest`

**Command**: `NODE_ENV=test jest --config ./.jestconfig.json`

Legacy test command.

**Usage**:
```bash
yarn utest
```

---

## Linting Scripts

### `yarn lint`

**Command**: `eslint config src/** --ext .js`

Lints JavaScript files.

**What it does**:
- Checks code style
- Finds potential errors
- Enforces ESLint rules

**Usage**:
```bash
yarn lint

# Auto-fix issues
yarn lint --fix

# Lint specific files
yarn lint src/client/app.js
```

**Configuration**: `.eslintrc.json`

---

## Utility Scripts

### `yarn tunnel`

**Command**: `lt --port 3000`

Creates a localtunnel for sharing local development.

**What it does**:
- Exposes local server to internet
- Provides public URL
- Useful for testing on mobile devices

**Usage**:
```bash
# Start dev server first
yarn start

# In another terminal
yarn tunnel
```

**Output**: Public URL (e.g., `https://random-name.loca.lt`)

**Requirements**:
```bash
npm install -g localtunnel
```

---

## Pre/Post Hooks

### `prebuild`

**Command**: `yarn run clean:build`

Automatically runs before `yarn build`.

---

### `prestart`

**Command**: `yarn run clean:build`

Automatically runs before `yarn start`.

---

## Script Composition

### Chaining Scripts

```bash
# Build then serve
yarn build && yarn build:serve

# Clean, build, and serve
yarn clean:build && yarn build && yarn build:serve

# Lint, test, and build
yarn lint && yarn test && yarn build
```

### Running Multiple Scripts

```bash
# Install concurrently
yarn add -D concurrently

# Run multiple scripts (example)
concurrently "yarn start" "yarn tunnel"
```

---

## Environment Variables

Scripts use environment variables for configuration:

| Variable | Values | Purpose |
|----------|--------|---------|
| `NODE_ENV` | `development`, `production`, `test` | Build environment |
| `BABEL_ENV` | `commonjs` | Babel configuration |

### Setting Environment Variables

```bash
# Linux/Mac
NODE_ENV=production yarn build

# Windows (cmd)
set NODE_ENV=production && yarn build

# Windows (PowerShell)
$env:NODE_ENV="production"; yarn build

# Using cross-env (cross-platform)
cross-env NODE_ENV=production yarn build
```

---

## Custom Scripts

### Adding New Scripts

Edit `package.json`:

```json
{
  "scripts": {
    "custom:script": "echo 'My custom script'"
  }
}
```

Run with:
```bash
yarn custom:script
```

### Passing Arguments

```bash
# Pass arguments after --
yarn test -- --verbose
yarn lint -- --fix
yarn udev -- --open
```

---

## Troubleshooting Scripts

### Script Not Found

```bash
# List all available scripts
yarn run

# Check package.json for script name
```

### Permission Denied

```bash
# On Linux/Mac, may need to make scripts executable
chmod +x ./node_modules/.bin/*
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
yarn start -- --port 3001
```

### Out of Memory

```bash
# Increase Node.js memory limit
NODE_OPTIONS=--max-old-space-size=4096 yarn build
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Start development | `yarn start` |
| Build for production | `yarn build` |
| Run tests | `yarn test` |
| Lint code | `yarn lint` |
| Clean build | `yarn clean:build` |
| Serve production | `yarn build:serve` |
| Watch tests | `yarn test:watch` |
| Coverage report | `yarn test:cov` |
| Create tunnel | `yarn tunnel` |
| Build profile | `yarn build:profile` |
