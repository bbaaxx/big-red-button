/* global document */

const getMdlButton = (config, clickHandler) => {
  const { raised, ripple, accent, colored, name, icon } = config;
  const button = document.createElement('button');
  const classList = [
    'mdl-button',
    'mdl-js-button',
  ];
  button.innerHTML = '<slot>button</slot>';

  if (raised) {
    classList.push('mdl-button--raised');
  }
  if (ripple) {
    classList.push('mdl-js-ripple-effect');
  }
  if (accent) {
    classList.push('mdl-button--accent');
  }
  if (colored) {
    classList.push('mdl-button--colored');
  }
  if (icon) {
    classList.push('mdl-button--icon');
    button.innerHTML = `<i class="material-icons">${icon}</i>`;
  }

  button.name = name;
  button.classList.add(...classList);
  button.onclick = clickHandler;

  return button;
};

export default getMdlButton;
