/* global document, HTMLElement, Event */
import Hammer from 'hammerjs';
import componentHandler from 'material-design-lite/material';

import injectStyles from '../../helpers/ce-helpers/injectStyles';
import styles from './styles.scss';

export default class AmazingButton extends HTMLElement {

  buttonElement;
  buttonConfig;
  hammerManager;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.buttonConfig = { ...this.dataset };
  }

  connectedCallback() {
    this.updateButton();
  }

  disconnectCallback() {
    this.hammerManager.off('tap');
  }

  dispatch(evt) {
    evt.preventDefault();
    this.buttonElement.dispatchEvent(
      new Event('amazing-button-clicked', { composed: true, data: 'crazyman' }),
    );
  }

  updateButton() {
    this.buttonConfig = { ...this.dataset };
    this.generateButtonElement();

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(injectStyles(styles));
    this.shadowRoot.appendChild(this.buttonElement);
    componentHandler.upgradeElement(this.buttonElement);
  }

  generateButtonElement() {
    const {
      name, raised, ripple, accent, colored, primary, icon, fab,
    } = this.buttonConfig;

    const button = document.createElement('button');
    const classList = [
      'mdl-button',
      'mdl-js-button',
    ];
    button.name = name;
    button.innerHTML = '<slot>button</slot>';

    if (raised) {
      classList.push('mdl-button--raised');
    }
    if (ripple) {
      classList.push('mdl-js-ripple-effect');
    }
    if (accent) {
      classList.push('mdl-button--accent');
    }
    if (colored) {
      classList.push('mdl-button--colored');
    }
    if (primary) {
      classList.push('mdl-button--primary');
    }
    if (icon) {
      classList.push('mdl-button--icon');
      button.innerHTML = `<i class="material-icons">${icon}</i>`;
    }
    if (fab) {
      classList.push('mdl-button--fab');
      if (fab === 'mini') {
        classList.push('mdl-button--mini-fab');
      }
    }

    button.classList.add(...classList);
    this.hammerManager = new Hammer(button);
    this.hammerManager.on('tap', this.dispatch.bind(this));
    this.buttonElement = button;
  }
}
