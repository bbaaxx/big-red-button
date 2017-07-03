import AmazingButton from './index';

describe('AmazingButton Component', () => {
  test('Is of type HTMLElement', () => {
    const amazingButton = new AmazingButton();
    expect(amazingButton).toBeInstanceOf(HTMLElement);
  });
});
