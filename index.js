/* global document */
const rootElement = document.body.appendChild(
  (() => document.createElement('div'))(),
);

const renderSomething = (elem, something) => {
  elem.innerHTML = something; // eslint-disable-line no-param-reassign
};

document.addEventListener(
  'DOMContentLoaded',
  () => renderSomething(rootElement, 'Yolotl'),
);
