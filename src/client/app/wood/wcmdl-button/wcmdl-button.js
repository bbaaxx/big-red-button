// @flow
/* global document */
import Hammer from 'hammerjs';
import componentHandler from 'material-design-lite/material';

import injectStyles from '../../helpers/ce-helpers/injectStyles';
import styles from './styles.scss';

const BOOLEAN_PROPS = ['accent', 'colored', 'fab', 'mini', 'primary', 'raised', 'ripple'];
const STRING_PROPS = ['name', 'icon'];
const MDL_CLASSES = {
  accent: 'mdl-button--accent',
  colored: 'mdl-button--colored',
  fab: 'mdl-button--icon',
  mini: 'mdl-button--icon',
  primary: 'mdl-button--primary',
  raised: 'mdl-button--raised',
  ripple: 'mdl-js-ripple-effect',
  icon: 'mdl-button--icon',
  base: [
    'wcmdl-button',
    'mdl-button',
    'mdl-js-button',
  ],
};

export default class CompMdlButton extends HTMLElement {
  name: string;
  icon: string;
  accent: boolean;
  colored: boolean;
  fab: boolean;
  mini: boolean;
  primary: boolean;
  raised: boolean;
  ripple: boolean;

  buttonElement: HTMLElement;
  hammerManager: () => mixed;
  attachShadow: ({ mode: ShadowRootMode }) => ShadowRoot;
  shadowRoot: ShadowRoot | any;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    BOOLEAN_PROPS
      .forEach(item => Object.defineProperty(
        this,
        item,
        {
          get: () => this.hasAttribute(item),
          set: val => (val && this.setAttribute(item, '')) || this.removeAttribute(item),
        },
      ), this);

    STRING_PROPS
      .forEach(item => Object.defineProperty(
        this,
        item,
        {
          get: () => this.hasAttribute(item) && this.getAttribute(item),
          set: val => (val && this.setAttribute(item, val)) || this.removeAttribute(item),
        },
      ), this);
  }

  connectedCallback() {
    this.updateButton();
  }

  disconnectCallback() {
    this.hammerManager.off('tap');
  }

  dispatch(evt: Event) {
    evt.preventDefault();
    this.buttonElement
      .dispatchEvent(new Event('wcmdl-button-clicked', { composed: true }));
  }

  updateButton() {
    this.generateButtonElement();
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(injectStyles(styles));
    this.shadowRoot.appendChild(this.buttonElement);
    componentHandler.upgradeElement(this.buttonElement);
  }

  generateButtonElement() {
    const button = document.createElement('button');
    const classList = [...MDL_CLASSES.base];
    button.innerHTML = '<slot>button</slot>';
    BOOLEAN_PROPS.forEach((prop) => {
      if (this.hasAttribute(prop)) {
        classList.push(MDL_CLASSES[prop]);
      }
    });
    if (!this.name) {
      button.name = 'default-wcmdl-button';
    }
    if (this.icon) {
      button.innerHTML = `<i class="material-icons">${this.icon}</i>`;
    }

    button.classList.add(...classList);
    this.hammerManager = new Hammer(button);
    this.hammerManager.on('tap', this.dispatch.bind(this));
    this.buttonElement = button;
  }
}
