/* global document */
// import './styles/index.css';
import componentHandler from 'material-design-lite/material';

const rootElement = document.body.appendChild(
  (() => document.createElement('div'))(),
);

const renderSomething = (elem, something) => {
  // eslint-disable-next-line no-param-reassign
  elem.innerHTML = something;
  setTimeout(() => {
    const delayedElem = document.createElement('button');
    delayedElem.innerHTML = 'delayed';
    delayedElem.classList.add(
      'mdl-button',
      'mdl-js-button',
      'mdl-button--raised',
      'mdl-js-ripple-effect',
      'mdl-button--accent',
    );
    elem.appendChild(delayedElem);
    componentHandler.upgradeElement(delayedElem);
  }, 3000);
};

const content = `
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
  () => renderSomething(rootElement, content),
);
