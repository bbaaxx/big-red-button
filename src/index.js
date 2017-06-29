/* global document */
// import './styles/index.css';
import componentHandler from 'material-design-lite/material';

// const rootElement = document.body.appendChild(
//   (() => document.createElement('div'))(),
// );

const rootElement = document.body.appendChild(
  document.createElement('div'),
);

const getMdlButton = (buttonText) => {
  const button = document.createElement('button');
  const classList = [
    'mdl-button',
    'mdl-js-button',
    'mdl-button--raised',
    'mdl-js-ripple-effect',
  ];
  button.innerText = buttonText || 'button';
  button.classList.add(...classList);
  return button;
};

const renderSomething = (elem, something) => {
  elem.innerHTML = something;   // eslint-disable-line no-param-reassign
  const button = getMdlButton('Yolo!');
  setTimeout(() => {
    elem.appendChild(button);
    componentHandler.upgradeElement(button);
  }, 1500);
};

const htmlContent = `
  <p>Public demo MDL Wp2Sk</p>
  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
    Button
  </button>
  <button class="mdl-button mdl-js-button mdl-button--accent">
    Button
  </button>
  <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
    <i class="material-icons">mood</i>
  </button>
`;

document.addEventListener(
  'DOMContentLoaded',
  () => renderSomething(rootElement, htmlContent),
);
