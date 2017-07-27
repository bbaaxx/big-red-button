// there is no flow =( because it seem to break HMR for this use case
/* global document */
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import AmazingButton from './app/wood/wcmdl-button';
import { insertDelayedButton, renderApp, buttonsMarkup } from './app';

declare var customElements;

const rootElement = document.body.appendChild(
  document.createElement('div'),
);

let renderWrapper = () => { //eslint-disable-line
  rootElement.innerHTML = '';
  renderApp(rootElement, buttonsMarkup);
  insertDelayedButton(rootElement);
};

customElements.define('amazing-button', AmazingButton);

if (module.hot && module.hot.accept) {
  module.hot.accept('./app', (thisWeirdParam) => {
    console.log(thisWeirdParam);
    renderWrapper();
  });
}

document.addEventListener(
  'DOMContentLoaded',
  renderWrapper,
);


// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     const registration = runtime.register();
//     registration.then((dodo) => {
//       console.log('our serviceWorker has been installed', dodo);
//     });
//   });
// }
