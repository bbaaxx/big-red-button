# Webpack Configuration Guide

## Overview

The project uses Webpack 3 with a modular configuration structure split across multiple files for different environments.

## Configuration Files

### 1. webpack.config.js (Root)

Main entry point that delegates to environment-specific configs.

**Location**: `/webpack.config.js`

### 2. webpack.config.base.js

Shared configuration used by all environments.

**Location**: `/config/webpack/webpack.config.base.js`

**Includes**:
- Entry points
- Output configuration
- Common loaders
- Plugin setup
- Resolve configuration

### 3. webpack.config.development.js

Development-specific configuration with HMR support.

**Location**: `/config/webpack/webpack.config.development.js`

**Features**:
- Webpack Dev Server setup
- Hot Module Replacement (HMR)
- Source maps for debugging
- Development-optimized builds

### 4. webpack.config.build.js

Production build configuration.

**Location**: `/config/webpack/webpack.config.build.js`

**Features**:
- Code minification
- Tree shaking
- Production optimizations
- Asset optimization

## Loaders Configuration

### JavaScript/Flow Loader

```javascript
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: ['babel-loader', 'eslint-loader']
}
```

**Purpose**:
- Transpile ES6+ to ES5
- Remove Flow type annotations
- Lint code during build

**Related Config**:
- `.babelrc` - Babel configuration
- `.eslintrc.json` - ESLint rules

### Style Loaders

#### SASS Loader

```javascript
{
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    'postcss-loader',
    'resolve-url-loader',
    'sass-loader'
  ]
}
```

**Purpose**: Process SASS files with PostCSS transformations

#### PostCSS Configuration

**File**: `.postcssrc.json`

```json
{
  "plugins": {
    "postcss-import": {},
    "postcss-cssnext": {},
    "lost": {},
    "cssnano": {}
  }
}
```

**Features**:
- `postcss-import` - Import CSS files
- `postcss-cssnext` - Future CSS syntax
- `lost` - Grid system
- `cssnano` - CSS minification

### Asset Loaders

#### File Loader

```javascript
{
  test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
  use: ['file-loader']
}
```

**Purpose**: Handle image and font files

#### URL Loader

```javascript
{
  test: /\.(png|jpg|gif)$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 8192 // Inline files < 8kb
    }
  }]
}
```

**Purpose**: Inline small assets as data URLs

## Plugins

### HtmlWebpackPlugin

Generates HTML file with injected script tags.

```javascript
new HtmlWebpackPlugin({
  template: 'src/client/index.html',
  inject: 'body'
})
```

### ExtractTextWebpackPlugin

Extracts CSS into separate files (production only).

```javascript
new ExtractTextPlugin({
  filename: '[name].[contenthash].css'
})
```

### ServiceWorkerWebpackPlugin

Generates service worker for PWA support (optional).

```javascript
new ServiceWorkerWebpackPlugin({
  entry: path.join(__dirname, 'src/client/sw.js')
})
```

### FlowBabelWebpackPlugin

Runs Flow type checking during build.

```javascript
new FlowBabelWebpackPlugin()
```

### WebpackDashboard

Enhanced development console output.

```javascript
new DashboardPlugin()
```

## Dev Server Configuration

```javascript
devServer: {
  contentBase: './dist',
  hot: true,
  port: 3000,
  historyApiFallback: true,
  stats: 'minimal'
}
```

**Features**:
- Hot Module Replacement
- History API fallback for SPAs
- Customizable port (default: 3000)
- Minimal console output

## Entry Points

### Main Entry

```javascript
entry: {
  app: './src/client/index.js',
  libs: './src/client/libs.js'
}
```

**Purpose**:
- `app` - Application code
- `libs` - Third-party libraries (separate bundle)

## Output Configuration

### Development

```javascript
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].bundle.js',
  publicPath: '/'
}
```

### Production

```javascript
output: {
  path: path.resolve(__dirname, 'build/client'),
  filename: '[name].[chunkhash].js',
  publicPath: '/',
  chunkFilename: '[name].[chunkhash].chunk.js'
}
```

**Features**:
- Content-based hashing for cache busting
- Separate chunk files for code splitting

## Resolve Configuration

```javascript
resolve: {
  extensions: ['.js', '.json'],
  modules: [
    path.resolve(__dirname, 'src'),
    'node_modules'
  ]
}
```

**Purpose**:
- Import files without extensions
- Resolve modules from `src/` directory

## Environment Variables

Set via scripts in `package.json`:

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack",
    "start": "webpack-dev-server"
  }
}
```

**Variables**:
- `NODE_ENV=production` - Production build
- `NODE_ENV=development` - Development build
- `NODE_ENV=test` - Test environment

## Performance Optimization

### Code Splitting

Webpack automatically splits vendor code from application code.

### Tree Shaking

Enabled in production mode to remove unused exports.

### Minification

JavaScript and CSS minification in production builds.

### Source Maps

```javascript
// Development
devtool: 'cheap-module-eval-source-map'

// Production
devtool: 'source-map'
```

## Common Issues & Solutions

### Issue: Module not found

**Solution**: Check `resolve.modules` configuration and file extensions.

### Issue: Styles not applying in Shadow DOM

**Solution**: Ensure styles are injected using `injectStyles()` helper.

### Issue: HMR not working

**Solution**:
1. Check `module.hot` is enabled
2. Verify `webpack-dev-server` is running
3. Ensure `hot: true` in dev server config

### Issue: Build takes too long

**Solution**:
1. Use `DllPlugin` for vendor bundles
2. Enable caching in loaders
3. Parallelize builds with `thread-loader`

## Extending the Configuration

### Adding a New Loader

1. Install loader: `yarn add -D my-loader`
2. Add rule to `webpack.config.base.js`:

```javascript
{
  test: /\.myext$/,
  use: ['my-loader']
}
```

### Adding a New Plugin

1. Install plugin: `yarn add -D my-plugin`
2. Import and add to plugins array:

```javascript
const MyPlugin = require('my-plugin');

plugins: [
  new MyPlugin(options)
]
```

### Environment-Specific Configuration

Use `webpack-merge` to combine configs:

```javascript
const merge = require('webpack-merge');
const base = require('./webpack.config.base');

module.exports = merge(base, {
  // Environment-specific config
});
```

## Webpack 3 vs Modern Webpack

This project uses Webpack 3. Modern Webpack (v5+) has:
- Better performance
- Persistent caching
- Module federation
- Improved tree shaking
- Better defaults

**Migration Path**: See official Webpack migration guide for upgrading to v5.
