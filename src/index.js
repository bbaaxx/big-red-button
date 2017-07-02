/* global document, customElements */
import componentHandler from 'material-design-lite/material';
import AmazingButton from './app/wood/amazing-button';

const rootElement = document.body.appendChild(
  document.createElement('div'),
);

const renderSomething = (elem, something) => {
  elem.innerHTML = something;   // eslint-disable-line no-param-reassign
  // const button = getMdlButton('Yolo!');
  const button = document.createElement('amazing-button');
  button.dataset.text = 'hello dolly';

  setTimeout(() => {
    elem.appendChild(button);
    componentHandler.upgradeElement(button);
  }, 1500);
};
const htmlContent = `
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
  () => renderSomething(rootElement, htmlContent),
);
