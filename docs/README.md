# Big Red Button - Documentation

## Overview

The **Big Red Button** is a Webpack 3 demonstration project that showcases modern web development practices by building a deliberately over-engineered application with one primary purpose: displaying a clickable big red button.

This project serves as an educational example of how to wire together a complex, modern JavaScript toolchain to accomplish a simple task - embodying the spirit of Rube Goldberg machines in the JavaScript ecosystem.

## Purpose

The primary purpose of this project is to demonstrate:

1. **Custom Web Components v1** - Native browser support for custom elements
2. **Webpack 3 Configuration** - Complex build tooling and module bundling
3. **Hot Module Replacement (HMR)** - Live reloading during development
4. **Modern JavaScript** - ES6/ES2017+ features via Babel
5. **Type Safety** - Flow static type checking
6. **Testing** - Jest test framework setup
7. **Styling Options** - Multiple CSS preprocessors (SASS, SugarSS, PostCSS)
8. **Material Design** - Integration with Material Design Lite

## What Does It Do?

The application renders:
- A big red button using a custom web component (`<wcmdl-button>`)
- An orange button that appears after a delay
- Touch-friendly interaction using HammerJS
- Visual flash effects when buttons are clicked
- Material Design styling

## Key Technologies

- **Webpack 3**: Module bundler and build tool
- **Babel**: JavaScript transpiler for ES6+ features
- **Flow**: Static type checker for JavaScript
- **Jest**: Testing framework
- **Material Design Lite**: UI component library
- **HammerJS**: Touch gesture library
- **Custom Elements v1**: Web Components standard
- **SASS/PostCSS**: CSS preprocessing and post-processing

## Documentation Structure

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Project structure and architecture
- [COMPONENTS.md](./COMPONENTS.md) - Custom component documentation
- [WEBPACK-CONFIG.md](./WEBPACK-CONFIG.md) - Webpack configuration explained
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development workflow and guidelines
- [SCRIPTS.md](./SCRIPTS.md) - Available npm/yarn scripts

## Quick Start

See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed setup and development instructions.

```bash
# Install dependencies
yarn install

# Start development server
yarn start

# Run tests
yarn test

# Build for production
yarn build
```

## Project Philosophy

This project intentionally uses a complex stack for a simple task to serve as:
- A learning resource for Webpack configuration
- An example of modern JavaScript tooling
- A template for larger projects
- A humorous take on JavaScript ecosystem complexity
