import { sum } from '..';

describe('test promise', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('instance function', () => {
    const instance = new Promise((resolve, reject) => {
      resolve('success');
    });
    const mockFn = jest.fn();
    instance.then(mockFn);

    expect(mockFn).toBeCalled();
    // instance.catch;
    // instance.finally;
  });

  test('static function', () => {});
});
