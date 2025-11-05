# Project Architecture

## Directory Structure

```
big-red-button/
├── __mocks__/              # Jest mock files
│   └── jest/
│       ├── fileMock.js     # Mock for file imports
│       └── styleMock.js    # Mock for style imports
├── config/                 # Configuration files
│   ├── testPort.js         # Port configuration for tests
│   └── webpack/            # Webpack configurations
│       ├── webpack.config.base.js
│       ├── webpack.config.build.js
│       └── webpack.config.development.js
├── docs/                   # Documentation (this folder)
├── dot/                    # Development server
│   └── server.js           # Express dev server
├── flow-typed/             # Flow type definitions
│   ├── global.js           # Global type definitions
│   ├── module.js           # Module type definitions
│   └── npm/                # Third-party library type definitions
├── src/                    # Source code
│   └── client/             # Client-side code
│       ├── app/            # Application code
│       │   ├── helpers/    # Utility functions
│       │   │   ├── ce-helpers/      # Custom Element helpers
│       │   │   └── dom-helpers/     # DOM manipulation helpers
│       │   └── wood/       # Custom components
│       │       └── wcmdl-button/    # Material Design Lite button component
│       ├── app.js          # Main application logic
│       ├── index.js        # Entry point
│       ├── libs.js         # Third-party libraries
│       └── sw.js           # Service worker (optional)
└── webpack.config.js       # Main Webpack config
```

## Architecture Layers

### 1. Build Layer (Webpack)

The build layer handles:
- **Module bundling** - Combining JavaScript modules into bundles
- **Code transformation** - Transpiling ES6+ and Flow types via Babel
- **Style processing** - SASS compilation and PostCSS transformations
- **Asset optimization** - Minification and optimization for production
- **Development server** - Hot Module Replacement for live updates

Configuration files:
- `webpack.config.js` - Main entry point
- `config/webpack/webpack.config.base.js` - Shared configuration
- `config/webpack/webpack.config.development.js` - Development settings
- `config/webpack/webpack.config.build.js` - Production build settings

### 2. Application Layer

The application layer consists of:

**Entry Point** (`src/client/index.js`)
- Initializes the application
- Sets up Hot Module Replacement
- Handles service worker registration (commented out)

**Application Logic** (`src/client/app.js`)
- Defines custom element (`<wcmdl-button>`)
- Creates button markup
- Sets up event listeners
- Handles button interaction logic

**Component Layer** (`src/client/app/wood/wcmdl-button/`)
- Custom Web Component implementation
- Material Design Lite integration
- HammerJS gesture handling

### 3. Component Architecture

Custom components follow Web Components v1 specification:

```
WcmdlButton (Custom Element)
  ├── Shadow DOM (encapsulated styles)
  ├── Properties (accent, colored, fab, etc.)
  ├── Event handling (wcmdl-button-clicked)
  └── Lifecycle callbacks (connectedCallback, disconnectCallback)
```

### 4. Helper Layer

**DOM Helpers** (`src/client/app/helpers/dom-helpers/`)
- DOM manipulation utilities
- Element selection and management
- Class list management

**Custom Element Helpers** (`src/client/app/helpers/ce-helpers/`)
- Style injection for Shadow DOM
- Component utility functions

## Data Flow

```
User Interaction
    ↓
HammerJS (tap event)
    ↓
WcmdlButton.dispatch()
    ↓
Custom Event (wcmdl-button-clicked)
    ↓
Event Listener (app.js)
    ↓
CSS Animation (flashy-thing class)
```

## Type System

The project uses **Flow** for static type checking:

- Type annotations in source files (`.js` files with `// @flow`)
- Type definitions in `flow-typed/` directory
- Global and module type declarations
- Third-party library type definitions

## Build Process

### Development Mode

1. Webpack reads entry point (`src/client/index.js`)
2. Babel transpiles ES6+ and Flow types
3. SASS/PostCSS processes styles
4. Webpack Dev Server serves bundled files
5. HMR updates modules without full page reload

### Production Mode

1. Webpack bundles and optimizes code
2. Minification and tree-shaking
3. Output to `build/` directory
4. Static files ready for deployment

## Key Design Patterns

1. **Custom Elements Pattern** - Extending HTMLElement for custom components
2. **Shadow DOM** - Style and DOM encapsulation
3. **Event-driven Architecture** - Custom events for component communication
4. **Module Pattern** - ES6 modules for code organization
5. **Factory Functions** - Helper functions for DOM creation

## External Dependencies

### Runtime Dependencies
- `@webcomponents/webcomponentsjs` - Polyfills for Custom Elements
- `hammerjs` - Touch gesture recognition
- `material-design-lite` - Material Design components
- `material-design-icons` - Icon font

### Build Dependencies
- Webpack ecosystem (loaders, plugins)
- Babel ecosystem (presets, plugins)
- Testing tools (Jest)
- Linting tools (ESLint, Flow)
