# Development Guide

## Prerequisites

### Required Software

1. **Operating System**: Linux or macOS (recommended)
   - Windows may work with WSL2

2. **Node.js**: Version specified in `.nvmrc`
   ```bash
   # Using nvm (Node Version Manager)
   nvm use
   ```

3. **Yarn**: Package manager
   ```bash
   npm install -g yarn
   ```

4. **Git**: Version control
   ```bash
   git --version
   ```

### Optional Tools

- **Docker**: For containerized development
- **Flow**: Type checker (installed locally)
- **ESLint**: Linter (installed locally)

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/bbaaxx/big-red-button.git
cd big-red-button
```

### 2. Install Dependencies

```bash
yarn install
```

This will install all dependencies listed in `package.json`.

### 3. Verify Installation

```bash
# Check Yarn version
yarn --version

# Check installed packages
yarn list --depth=0
```

## Development Workflow

### Starting Development Server

```bash
yarn start
```

This will:
1. Start Webpack Dev Server on `http://localhost:3000`
2. Enable Hot Module Replacement (HMR)
3. Open Webpack Dashboard in terminal
4. Watch for file changes

**Alternative with auto-open**:
```bash
yarn udev -- --open
```

### Development Server Features

- **Hot Module Replacement**: Changes reload without full page refresh
- **Live Reload**: Automatic browser refresh on changes
- **Error Overlay**: Compilation errors shown in browser
- **Dashboard**: Enhanced terminal output

### Making Changes

1. **Edit source files** in `src/` directory
2. **Save changes** - HMR will update automatically
3. **Check console** for errors or warnings
4. **Test in browser** at `http://localhost:3000`

## Building for Production

### Standard Build

```bash
yarn build
```

This will:
1. Clean the `build/` directory
2. Build client bundle
3. Build server bundle (if applicable)
4. Optimize and minify code
5. Generate source maps

**Output**: `build/client/` directory

### Build Variants

```bash
# Build and serve locally
yarn build:serve

# Build with profiling data
yarn build:profile

# Legacy unified build
yarn ubuild
```

### Serving Production Build

```bash
# After building
yarn build:serve

# Or manually
http-server build/client -p 3003 --cors -o
```

## Testing

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run with coverage
yarn test:cov
```

### Test Configuration

- **Config file**: `.jestconfig.json`
- **Test files**: `*.test.js` or `test.js` files
- **Mocks**: `__mocks__/jest/`

### Writing Tests

```javascript
// example.test.js
describe('Component', () => {
  it('should render correctly', () => {
    // Test implementation
  });
});
```

## Linting

### Running Linter

```bash
yarn lint
```

### ESLint Configuration

- **Config file**: `.eslintrc.json`
- **Rules**: Airbnb style guide + Prettier
- **Plugins**: Flow, Jest, Import

### Auto-fixing Issues

```bash
yarn lint --fix
```

### Prettier Integration

Prettier is integrated with ESLint:

- **Config file**: `.prettierrc`
- **Format on save**: Configure in your editor

## Type Checking with Flow

### Running Flow

```bash
# Type check all files
yarn flow

# Flow status
yarn flow status

# Flow coverage report
yarn flow coverage
```

### Flow Configuration

- **Config file**: `.flowconfig`
- **Type definitions**: `flow-typed/` directory
- **Annotations**: `// @flow` at top of files

### Adding Type Definitions

```bash
# Install flow-typed CLI
npm install -g flow-typed

# Download library definitions
flow-typed install
```

## Code Style

### Style Guide

This project follows:
- **Airbnb JavaScript Style Guide**
- **Prettier** for formatting
- **Flow** for type annotations

### Editor Setup

#### VS Code

Install extensions:
- ESLint
- Prettier
- Flow Language Support

Add to `settings.json`:
```json
{
  "editor.formatOnSave": true,
  "eslint.autoFixOnSave": true,
  "javascript.validate.enable": false
}
```

#### Atom

Install packages:
- `linter-eslint`
- `prettier-atom`
- `linter-flow`

#### Sublime Text

Install packages:
- `SublimeLinter`
- `SublimeLinter-eslint`
- `SublimeLinter-flow`

## Debugging

### Browser DevTools

1. Open browser DevTools (F12)
2. Source maps enabled - see original source
3. Set breakpoints in source files
4. Use debugger statement

### Webpack Dashboard

Development server runs with Webpack Dashboard showing:
- Build progress
- Module list
- Warnings and errors
- Asset sizes

### Flow Type Errors

Type errors show in:
- Terminal during build
- Editor (with Flow plugin)
- Flow CLI output

## Project Scripts Reference

### Development Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `webpack-dashboard -- node ./dot/server.js` | Start dev server with dashboard |
| `udev` | `webpack-dashboard -- webpack-dev-server` | Legacy dev server |

### Build Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `build` | `yarn build:client && yarn build:server` | Build client and server |
| `build:client` | `cross-env NODE_ENV=production webpack` | Build client bundle |
| `build:server` | `cross-env NODE_ENV=production webpack` | Build server bundle |
| `build:serve` | `http-server build/client -p 3003` | Serve production build |
| `build:profile` | `webpack --profile --json > profile.json` | Build with profiling |

### Test Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `test` | `cross-env BABEL_ENV=commonjs jest` | Run tests |
| `test:watch` | `yarn test -- --watch` | Run tests in watch mode |
| `test:cov` | `yarn test -- --coverage` | Run with coverage |

### Utility Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `lint` | `eslint config src/** --ext .js` | Lint JavaScript files |
| `clean:build` | `rimraf build` | Clean build directory |
| `tunnel` | `lt --port 3000` | Create localtunnel |

## File Watching

### Watched Directories

Development server watches:
- `src/` - Application source
- `config/` - Configuration files
- `dot/` - Development server files

### Ignored Files

`.gitignore` specifies ignored files:
- `node_modules/`
- `build/`
- `dist/`
- `.cache/`

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
yarn start -- --port 3001
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules yarn.lock
yarn install
```

### Webpack Build Errors

```bash
# Clear webpack cache
rm -rf .cache/

# Clean and rebuild
yarn clean:build
yarn build
```

### Flow Errors

```bash
# Restart Flow server
yarn flow stop
yarn flow start

# Clear Flow cache
rm -rf .flow-cache/
```

### HMR Not Working

1. Check browser console for errors
2. Verify `module.hot` is available
3. Restart dev server
4. Clear browser cache

## Performance Tips

### Faster Builds

1. **Use latest Node.js** version
2. **Enable caching** in loaders
3. **Limit source map** quality in development
4. **Exclude large files** from watching

### Faster Tests

1. **Run specific tests**: `yarn test -- path/to/test`
2. **Use watch mode** for active development
3. **Skip coverage** unless needed
4. **Parallelize tests** (Jest default)

## Git Workflow

### Branch Strategy

1. `main` - Production-ready code
2. Feature branches - `feature/your-feature`
3. Bug fixes - `fix/bug-description`

### Commit Guidelines

```bash
# Conventional commits format
git commit -m "feat: add new button variant"
git commit -m "fix: resolve HMR issue"
git commit -m "docs: update README"
```

### Before Committing

```bash
# Run checks
yarn lint
yarn test
yarn flow

# Fix issues
yarn lint --fix
```

## Docker Development

### Build Image

```bash
docker build -t big-red-button .
```

### Run Container

```bash
docker run -p 3000:3000 big-red-button
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src
```

## Continuous Integration

### Setting Up CI

Example GitHub Actions workflow:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: yarn install
      - run: yarn lint
      - run: yarn test
      - run: yarn build
```

## Resources

- [Webpack Documentation](https://webpack.js.org/)
- [Flow Documentation](https://flow.org/)
- [Jest Documentation](https://jestjs.io/)
- [Material Design Lite](https://getmdl.io/)
- [Custom Elements v1](https://developers.google.com/web/fundamentals/web-components/customelements)
