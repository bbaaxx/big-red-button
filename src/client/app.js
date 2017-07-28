// @flow
/* global document */
import NamingThingsIsHardButton from './app/wood/wcmdl-button';

if (!customElements.get('amazing-button')) {
  customElements.define('amazing-button', NamingThingsIsHardButton);
}

export const buttonsMarkup = () => `
  
`;

export const setEventListener = (elem: HTMLElement) => {
  elem.addEventListener('amazing-button-clicked', (evt) => {
    const target = evt.target;
    if (target instanceof NamingThingsIsHardButton) {
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
  const buttonWrapper = document.createElement('div');
  const delayedButton = document.createElement('amazing-button');
  buttonWrapper.classList.add('button-wrapper');
  delayedButton.innerText = 'BIG RED BUTTON';
  delayedButton.dataset.name = 'big-red-button';
  delayedButton.dataset.colored = 'true';
  delayedButton.dataset.ripple = 'false';
  delayedButton.dataset.fab = 'true';
  setEventListener(delayedButton);
  buttonWrapper.appendChild(delayedButton);

  setTimeout(() => {
    elem.appendChild(buttonWrapper);
  }, 1500);
};
