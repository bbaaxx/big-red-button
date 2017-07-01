/* global document, window, HTMLElement */
import componentHandler from 'material-design-lite/material';

// Create a class for the element
export default class AmazingButton extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const button = document.createElement('button');
    button.alt = this.getAttribute('data-name');
    button.innerText = this.getAttribute('data-text');
    button.className = 'rrito mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect';
    button.id = 'yolocoyotl';

    shadow.appendChild(button);
    componentHandler.upgradeElement(this);
    // Add an event listener to the image.
    button.addEventListener('click', () => {
      window.location = this.getAttribute('data-url');
    });
  }
}
