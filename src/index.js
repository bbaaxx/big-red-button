// @flow
/* global document */
import AmazingButton from './app/wood/amazing-button';

declare var customElements: (s: string, e: HTMLElement) => mixed;

const rootElement = document.body.appendChild(
  document.createElement('div'),
);

const setEventListener = (ele) => {
  ele.addEventListener('amazing-button-clicked', (e) => {
    // Do something with the button click
    console.log('amazing-button event catched', e.target);
  });
};

const renderSomething = (elem, something) => {
  elem.innerHTML = something;   // eslint-disable-line no-param-reassign
  const allTheButtons = document.querySelectorAll('amazing-button');
  Array.from(allTheButtons).forEach(button => setEventListener(button));
};

const insertDelayedButton = (elem) => {
  const delayedButton = document.createElement('amazing-button');
  delayedButton.innerText = 'Delayed Button';
  delayedButton.dataset.name = 'delayed-button';
  delayedButton.dataset.colored = 'true';
  delayedButton.dataset.ripple = 'true';
  setTimeout(() => {
    elem.appendChild(delayedButton);
    setEventListener(delayedButton);
  }, 1500);
};

const markup = `
  <h1>Webpack 2 super config</h1>
  <p>Public demo MDL Wp2Sk</p>
  <amazing-button
    data-name="an-amazing-button"
    data-url="#"
    >Amazing Button</amazing-button>
  <amazing-button
    data-name="another-amazing-button"
    data-raised="true"
    data-ripple="true"
    data-url="#"
    >Other Button</amazing-button>
  <amazing-button
    data-name="an-accented-amazing-button"
    data-url="#"
    data-raised="true"
    data-ripple="true"
    data-accent="true"
    >Accent Button</amazing-button>
  <amazing-button
    data-name="an-icon-amazing-button"
    data-url="#"
    data-colored="true"
    data-icon="mood"
    ></amazing-button>
`;

customElements.define('amazing-button', AmazingButton);

document.addEventListener(
  'DOMContentLoaded',
  () => {
    renderSomething(rootElement, markup);
    insertDelayedButton(rootElement);
  },
);
