// @flow
/* global document */
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import doTheHookyPooky from './debuggieman';
import { insertDelayedButton, renderApp, buttonsMarkup } from './app';
import { getRootElement, clearRootElement } from './app/redstone/helpers/dom';

// First and foremost... do the hooky pooky !
(async () => doTheHookyPooky())();

declare var customElements;

function renderWrapper(targetElement: HTMLElement) {
  renderApp(targetElement, buttonsMarkup());
  insertDelayedButton(targetElement);
}

const rootElement = getRootElement();

renderWrapper(rootElement);

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(clearRootElement(rootElement));
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     const registration = runtime.register();
//     registration.then((dodo) => {
//       console.log('our serviceWorker has been installed', dodo);
//     });
//   });
// }
