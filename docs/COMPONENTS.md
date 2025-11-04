# Component Documentation

## WcmdlButton Component

The `<wcmdl-button>` is a custom web component that wraps Material Design Lite buttons with additional functionality.

**Location**: `src/client/app/wood/wcmdl-button/wcmdl-button.js`

### Features

- **Custom Element v1 API** - Extends `HTMLElement`
- **Shadow DOM** - Encapsulated styles and markup
- **Material Design Lite** - MDL button styling
- **Touch Gestures** - HammerJS integration for tap events
- **Reactive Attributes** - Dynamic property-attribute synchronization

### Usage

```html
<!-- Basic button -->
<wcmdl-button name="my-button">Click Me</wcmdl-button>

<!-- Big Red Button (from the app) -->
<wcmdl-button name="BRB" class="big-red-button" colored raised accent fab>
  BIG RED BUTTON
</wcmdl-button>

<!-- Orange button with ripple effect -->
<wcmdl-button name="orange-btn" primary raised ripple>
  Orange Button
</wcmdl-button>
```

### Attributes

#### Boolean Attributes

| Attribute | Description | MDL Class |
|-----------|-------------|-----------|
| `accent` | Applies accent color | `mdl-button--accent` |
| `colored` | Applies colored style | `mdl-button--colored` |
| `fab` | Floating Action Button style | `mdl-button--icon` |
| `mini` | Mini FAB style | `mdl-button--icon` |
| `primary` | Applies primary color | `mdl-button--primary` |
| `raised` | Raised button style | `mdl-button--raised` |
| `ripple` | Material ripple effect | `mdl-js-ripple-effect` |

#### String Attributes

| Attribute | Description | Type |
|-----------|-------------|------|
| `name` | Button identifier | `string` |
| `icon` | Material icon name | `string` |

### Properties

All attributes are exposed as JavaScript properties:

```javascript
const button = document.querySelector('wcmdl-button');

// Boolean properties
button.raised = true;
button.accent = true;

// String properties
button.name = 'my-button';
button.icon = 'favorite';
```

### Events

#### wcmdl-button-clicked

Dispatched when the button is tapped/clicked.

```javascript
button.addEventListener('wcmdl-button-clicked', (event) => {
  console.log('Button clicked:', event.target.name);
});
```

**Event Details**:
- **Type**: Custom Event
- **Bubbles**: Yes (composed: true)
- **Target**: The `<wcmdl-button>` element

### Lifecycle Callbacks

#### connectedCallback()

Called when the element is inserted into the DOM.

- Calls `updateButton()` to render the component
- Sets up Shadow DOM
- Injects styles
- Upgrades MDL component

#### disconnectCallback()

Called when the element is removed from the DOM.

- Removes HammerJS event listeners
- Cleans up resources

### Methods

#### updateButton()

Regenerates the button element with current attributes.

```javascript
button.updateButton();
```

#### generateButtonElement()

Creates the internal `<button>` element with:
- MDL classes based on attributes
- HammerJS tap listener
- Material icon (if specified)
- Slot for content

### Internal Structure

```html
<!-- Shadow DOM structure -->
<style>
  /* Component styles from styles.scss */
</style>
<button class="wcmdl-button mdl-button mdl-js-button ...">
  <slot>button</slot>
</button>
```

### Styling

Styles are defined in `src/client/app/wood/wcmdl-button/styles.scss` and injected into the Shadow DOM.

**Custom CSS Variables** (if any):
- Component styles are encapsulated
- Host element can be styled from outside
- Slotted content inherits parent styles

### Example Implementations

#### Basic Button

```javascript
const button = document.createElement('wcmdl-button');
button.name = 'example';
button.textContent = 'Click Me';
button.setAttribute('primary', '');
button.setAttribute('raised', '');
document.body.appendChild(button);
```

#### Icon Button

```javascript
const iconButton = document.createElement('wcmdl-button');
iconButton.name = 'favorite-btn';
iconButton.icon = 'favorite';
iconButton.setAttribute('fab', '');
iconButton.setAttribute('colored', '');
document.body.appendChild(iconButton);
```

#### Listening to Events

```javascript
document.addEventListener('wcmdl-button-clicked', (event) => {
  const button = event.target;
  console.log(`Button "${button.name}" was clicked!`);

  // Add your custom logic here
  // For example, trigger animations, API calls, etc.
});
```

### Testing

Tests are located in `src/client/app/wood/wcmdl-button/test.js`.

**Test Coverage**:
- Component registration
- Attribute handling
- Event dispatching
- Lifecycle callbacks
- Shadow DOM rendering

### Browser Support

Requires:
- **Custom Elements v1** support
- **Shadow DOM v1** support
- **Polyfills**: `@webcomponents/webcomponentsjs` for older browsers

### Dependencies

- **HammerJS**: Touch gesture recognition
- **Material Design Lite**: Styling and component upgrade
- **Custom Element Helpers**: Style injection utilities

## Component Helper Functions

### injectStyles (ce-helpers/injectStyles.js)

Injects CSS into Shadow DOM.

```javascript
import injectStyles from './helpers/ce-helpers/injectStyles';
import styles from './styles.scss';

// In component
this.shadowRoot.appendChild(injectStyles(styles));
```

### DOM Helpers (dom-helpers/index.js)

Utility functions for DOM manipulation:

- `getRootElement()` - Gets or creates root element
- `clearRootElement(elem)` - Clears element content
- `addClass(selector, className)` - Adds class to elements
- `removeClass(selector, className)` - Removes class from elements

## Future Component Ideas

Based on this architecture, you could create:

- `<wcmdl-input>` - Material Design Lite input fields
- `<wcmdl-card>` - Material Design cards
- `<wcmdl-dialog>` - Modal dialogs
- `<wcmdl-menu>` - Dropdown menus
- `<wcmdl-progress>` - Progress indicators
