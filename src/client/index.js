// @flow
/* global document */
import AmazingButton from './app/wood/amazing-button';
import { insertDelayedButton, renderSomething, buttonsMarkup } from './demoStuff';

declare var customElements: (s: string, e: HTMLElement) => mixed;
customElements.define('amazing-button', AmazingButton);

const rootElement = document.body.appendChild(
  document.createElement('div'),
);

document.addEventListener(
  'DOMContentLoaded',
  () => {
    renderSomething(rootElement, buttonsMarkup);
    insertDelayedButton(rootElement);
  },
);
