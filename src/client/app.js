// @flow
/* global document */
import AmazingButton from './app/wood/wcmdl-button';

export const buttonsMarkup = `
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

export const setEventListener = (elem: HTMLElement) => {
  elem.addEventListener('amazing-button-clicked', (evt) => {
    const target = evt.target;
    if (target instanceof AmazingButton) {
      const { name } = target.dataset;

      // Do something with the button click
      console.log('amazing-button event catched', name);
    }
  });
};

export const renderApp = (elem: HTMLElement, something: any) => {
  elem.innerHTML = something;   // eslint-disable-line no-param-reassign
  const allTheButtons = document.querySelectorAll('amazing-button');
  Array.from(allTheButtons).forEach(button => setEventListener(button));
};

export const insertDelayedButton = (elem: HTMLElement) => {
  const delayedButton = document.createElement('amazing-button');
  delayedButton.innerText = 'Delayed Button';
  delayedButton.dataset.name = 'delayed-button';
  delayedButton.dataset.colored = 'true';
  delayedButton.dataset.ripple = 'false';
  setTimeout(() => {
    elem.appendChild(delayedButton);
    setEventListener(delayedButton);
  }, 1500);
};
