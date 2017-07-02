/* global HTMLElement */
import componentHandler from 'material-design-lite/material';

import injectStyles from '../../helpers/ce-helpers/injectStyles';
import mdlButtonBase from '../mdl-helpers/mdlButtonBase';
import styles from './styles.scss';

// Create a class for the element
export default class AmazingButton extends HTMLElement {

  // stores the button element inside the shadow DOM
  button;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    this.button = mdlButtonBase(
      { ...this.dataset },
      (e) => {
        console.log('i was clicked', e.target.name);
      },
    );

    shadow.appendChild(injectStyles(styles));
    shadow.appendChild(this.button);
    componentHandler.upgradeElement(this.button);
  }

  static get observedAttributes() { return ['data-text']; }

  attributeChangedCallback(attr, oldValue, newValue) { //eslint-disable-line
    console.log('locoman', attr, oldValue, newValue);
  }
  connectedCallback(attr, oldValue, newValue) { //eslint-disable-line
    console.log('conectoman', attr, oldValue, newValue);
  }
}
