// @flow

export function clearRootElement(rootElement: HTMLElement) {
  return () => {
    if (!document.body) throw new Error('Unexpectedly missing a <body> tag');
    document.body.removeChild(rootElement);
  };
}

export function getRootElement() {
  if (!document.body) throw new Error('Unexpectedly missing a <body> tag');
  document.body.innerHTML = ''; //eslint-disable-line
  return document.body.appendChild(document.createElement('div'));
}

export function addClass(selector: string, cssClass: string) {
  const elements = [...document.querySelectorAll(selector)];
  elements.forEach((element) => {
    element.classList.add(cssClass);
  });
}

export function removeClass(selector: string, cssClass: string) {
  const elements = [...document.querySelectorAll(selector)];
  elements.forEach((element) => {
    element.classList.remove(cssClass);
  });
}
