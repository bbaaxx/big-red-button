
const rootElement = document.body.appendChild(
  (() => document.createElement('div'))()
);

const renderSomething = (elem, something) => {
  elem.innerHTML = something;
};

document.addEventListener(
  'DOMContentLoaded',
  () => renderSomething(rootElement, 'Yolo')
);
