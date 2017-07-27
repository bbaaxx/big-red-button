// there is no flow =( because it seem to break HMR for this use case
/* global document */
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { insertDelayedButton, renderApp, buttonsMarkup } from './app';

declare var customElements;

const rootElement = document.body.appendChild(
  document.createElement('div'),
);

const renderWrapper = (targetElement) => {
  targetElement.innerHTML = ''; //eslint-disable-line
  renderApp(targetElement, buttonsMarkup());
  insertDelayedButton(targetElement);
};

if (module.hot && module.hot.accept) {
  module.hot.accept();
  module.hot.dispose(() => {
    document.body.removeChild(rootElement);
  });
}

renderWrapper(rootElement);

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     const registration = runtime.register();
//     registration.then((dodo) => {
//       console.log('our serviceWorker has been installed', dodo);
//     });
//   });
// }
