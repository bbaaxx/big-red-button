/* global document */
const rootElement = document.body.appendChild(
  (() => document.createElement('div'))(),
);

const renderSomething = (elem, something) => {
  // eslint-disable-next-line no-param-reassign
  elem.innerHTML = something;
};

document.addEventListener(
  'DOMContentLoaded',
  () => renderSomething(rootElement, 'Yolotli'),
);
