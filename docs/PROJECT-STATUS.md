# Project Status

## Current State (2025-11-04)

This document describes the current status of the Big Red Button project, including dependency management and known issues.

## Documentation Added

Comprehensive documentation has been added to the `/docs` folder:

- **README.md** - Project overview and purpose
- **ARCHITECTURE.md** - Detailed architecture and directory structure
- **COMPONENTS.md** - Custom web component documentation
- **WEBPACK-CONFIG.md** - Webpack configuration guide
- **DEVELOPMENT.md** - Development workflow and setup guide
- **SCRIPTS.md** - Complete npm/yarn scripts reference

## Project Purpose

The **Big Red Button** is an educational Webpack 3 demonstration project that showcases:
- Modern JavaScript tooling (Webpack 3, Babel, Flow, Jest)
- Custom Web Components v1 with Shadow DOM
- Material Design Lite integration
- Complex build configurations
- Hot Module Replacement (HMR) for development

The project intentionally uses a complex stack to accomplish a simple task (rendering a clickable button), serving as a learning resource for modern JavaScript development patterns.

## Dependencies

### Runtime Dependencies
| Package | Version | Status | Notes |
|---------|---------|--------|-------|
| @webcomponents/webcomponentsjs | ^1.0.14 | Outdated | Polyfills for Custom Elements |
| hammerjs | ^2.0.8 | Stable | Touch gesture library |
| http-server | ^0.10.0 | Deprecated | Simple HTTP server |
| material-design-icons | ^3.0.1 | Stable | Material icons |
| material-design-lite | ^1.3.0 | No longer maintained | MDL components |
| nodemon | ^1.11.0 | Outdated | Dev server auto-restart |
| roboto-fontface | ^0.8.0 | Stable | Roboto font |
| serviceworker-webpack-plugin | ^0.2.3 | Outdated | Service worker support |

### Development Dependencies (Highlights)

**Build Tools:**
- webpack@^3.5.5 (Outdated - current is v5+)
- webpack-dev-server@^2.7.1 (Outdated)
- webpack-dashboard@^1.0.0-5 (Outdated)

**Babel Ecosystem:**
- babel-core@^6.26.0 (Outdated - current is @babel/core v7+)
- babel-loader@^7.1.2
- babel-preset-env@^1.6.0

**CSS Processing:**
- node-sass@^4.5.3 (Deprecated - use sass instead)
- postcss-loader@^2.0.5
- postcss-cssnext@^3.0.2 (Deprecated)
- sass-loader@^6.0.5

**Testing:**
- jest@^21.0.0 (Outdated - current is v29+)

**Type Checking:**
- flow-bin@^0.57.3 (Outdated)

**Linting:**
- eslint@^4.6.1 (Outdated - current is v8+)
- eslint-config-airbnb@^16.1.0
- prettier@^1.7.4

### Deprecated Warnings

When installing dependencies, you'll see warnings about:

1. **node-sass** - Use `sass` or `sass-embedded` instead
2. **postcss-cssnext** - Use `postcss-preset-env` instead
3. **babel-eslint** - Use `@babel/eslint-parser` instead
4. **http-server** > ecstatic - Package unmaintained
5. **Various glob/rimraf packages** - Outdated versions
6. **core-js@2.x.x** - Version no longer maintained

## Getting the Project Running

### Option 1: Install Current Dependencies (Recommended for Learning)

```bash
# Install dependencies as-is (for historical/learning purposes)
yarn install

# Start development server
yarn start

# Or use webpack-dev-server directly
yarn udev
```

**Note**: These old dependencies may have security vulnerabilities. Only use for learning purposes in a safe environment.

### Option 2: Update to Modern Stack (Recommended for Production)

To modernize this project, you would need to:

1. **Upgrade to Webpack 5**
   ```bash
   yarn add -D webpack@latest webpack-cli@latest webpack-dev-server@latest
   ```

2. **Upgrade to Babel 7**
   ```bash
   yarn add -D @babel/core@latest @babel/preset-env@latest babel-loader@latest
   ```

3. **Replace node-sass with sass**
   ```bash
   yarn remove node-sass
   yarn add -D sass sass-loader@latest
   ```

4. **Upgrade other tools**
   ```bash
   yarn add -D eslint@latest prettier@latest jest@latest
   ```

5. **Update configuration files** to match new versions

### Option 3: Use Docker

```bash
# Build Docker image
docker build -t big-red-button .

# Run container
docker run -p 3000:3000 big-red-button
```

## Known Issues

### Node Version Compatibility

This project was built for Node.js v8.x (as specified in `.nvmrc`). Modern Node.js versions (v18+) may have compatibility issues with:
- node-sass (native module compilation)
- Old webpack plugins
- Deprecated packages

**Solution**: Use nvm to switch to the specified Node version:
```bash
nvm use
```

### npm Registry Connection Issues

During dependency installation, you may encounter:
- 503 Service Unavailable errors
- Network timeouts
- Retry loops

**Solutions**:
1. Wait and retry (registry may be temporarily down)
2. Use a different registry:
   ```bash
   yarn config set registry https://registry.npmmirror.com
   ```
3. Use cached dependencies if available

### Build Errors

Common build errors and solutions:

**Error**: `Module build failed: ModuleBuildError: Module build failed: Error: Node Sass does not yet support your current environment`

**Solution**: Rebuild node-sass
```bash
yarn rebuild node-sass
```

**Error**: `Cannot find module 'webpack/bin/config-yargs'`

**Solution**: Downgrade webpack-cli or update webpack-dev-server configuration

### Type Checking Errors

Flow type checking may fail with:
- Missing type definitions
- Incompatible type syntax with newer JavaScript features

**Solution**: Update Flow or disable type checking temporarily:
```bash
# Disable Flow in webpack config
# Remove FlowBabelWebpackPlugin
```

## Modernization Roadmap

To bring this project to 2025 standards:

### Phase 1: Core Updates
- [ ] Upgrade to Webpack 5
- [ ] Migrate to Babel 7
- [ ] Replace node-sass with sass
- [ ] Update ESLint to v8+
- [ ] Update Jest to v29+

### Phase 2: Migration to Modern Tools
- [ ] Consider migrating to Vite or Turbopack
- [ ] Replace Flow with TypeScript
- [ ] Update to modern PostCSS plugins
- [ ] Implement ES modules instead of CommonJS

### Phase 3: Code Modernization
- [ ] Update Custom Elements implementation
- [ ] Remove deprecated MDL (consider Material Web Components)
- [ ] Implement modern CSS (CSS Grid, CSS Custom Properties)
- [ ] Add module federation for code splitting

### Phase 4: Developer Experience
- [ ] Add Vitest for faster testing
- [ ] Implement Storybook for component development
- [ ] Add end-to-end tests with Playwright
- [ ] Set up CI/CD pipeline

## Architectural Decisions

### Why These Specific Versions?

This project was created in 2017-2018 timeframe when:
- Webpack 3 was current
- Babel 6 was the standard
- Flow was a popular TypeScript alternative
- Material Design Lite was actively maintained

### Modern Alternatives

| Old Tool | Modern Alternative |
|----------|-------------------|
| Webpack 3 | Webpack 5, Vite, Turbopack |
| Babel 6 | Babel 7, esbuild, swc |
| Flow | TypeScript |
| node-sass | sass, Lightning CSS |
| Material Design Lite | Material Web Components, MUI |
| Jest 21 | Vitest, Jest 29 |
| ESLint 4 | ESLint 8, Biome |

## Performance Considerations

### Current Build Performance
- Cold build: ~30-60 seconds
- Rebuild with HMR: ~1-5 seconds
- Test run: ~10-20 seconds

### Optimization Opportunities
1. Enable persistent caching
2. Use thread-loader for parallel processing
3. Implement DllPlugin for vendor libraries
4. Split configuration for dev/prod

### Modern Tools Performance
Switching to modern tools could reduce build time by 10-20x:
- Vite: ~1-2 seconds cold start
- esbuild: ~100-500ms builds
- Turbopack: Sub-second rebuilds

## Security Considerations

### Known Vulnerabilities

Running `yarn audit` will show numerous vulnerabilities in dependencies.

**Important**: This is an educational project. For production use:
1. Update all dependencies to latest stable versions
2. Run security audits regularly
3. Use Dependabot or Renovate for automated updates
4. Consider replacing unmaintained packages

### Mitigation Strategies

1. **Don't deploy this in production** as-is
2. Use in isolated development environment only
3. Regularly check for security updates
4. Consider modernization roadmap above

## Testing the Application

### After Successful Installation

1. **Start Development Server**
   ```bash
   yarn start
   ```
   Opens on `http://localhost:3000`

2. **Expected Behavior**
   - See "DO NOT PRESS IT" heading
   - See a big red button
   - After 1.5s, see an orange button appear
   - Click buttons to trigger flash animation

3. **Run Tests**
   ```bash
   yarn test
   ```

4. **Run Linter**
   ```bash
   yarn lint
   ```

5. **Build for Production**
   ```bash
   yarn build
   yarn build:serve
   ```

## Contributing

If you want to contribute:

1. **For Historical Preservation**: Keep original dependencies
2. **For Modernization**: Create a separate branch for upgrades
3. **For Bug Fixes**: Fix without changing dependency versions

## Resources

- [Webpack 3 Documentation](https://webpack.js.org/configuration/)
- [Babel 6 Documentation](https://babeljs.io/docs/en/v6/)
- [Flow Documentation](https://flow.org/)
- [Custom Elements v1](https://developers.google.com/web/fundamentals/web-components/customelements)
- [Material Design Lite](https://getmdl.io/)

## Support

For issues specific to this project:
- Check existing issues on GitHub
- Review documentation in `/docs` folder
- Reference webpack/babel/flow documentation

For modern alternatives:
- Consider starting a new project with create-react-app, Vite, or Next.js
- Use this project as a reference for understanding legacy tooling
