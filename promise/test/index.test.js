import { sum } from '..';

describe('test promise', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('instance function', done => {
    expect.assertions(2);
    const instance = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('success');
        done();
        // Async function not behaving as I expect with Jest
        // https://stackoverflow.com/questions/47275706/async-function-not-behaving-as-i-expect-with-jest
      });
    });

    // const mockFn = jest.fn();
    instance.then(
      res => {
        expect(res).toBe('success');
      },
      err => {}
    );

    const rejectInstance = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('fail');
        done();
        // Async function not behaving as I expect with Jest
        // https://stackoverflow.com/questions/47275706/async-function-not-behaving-as-i-expect-with-jest
      });
    });

    rejectInstance.then(
      () => {},
      err => {
        expect(err).toBe('fail');
      }
    );

    // instance.catch;
    // instance.finally;
  });

  test('catch with no reject function', done => {
    expect.assertions(1);
    const instance = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('fail');
        done();
      });
    });

    instance.catch(exp => {
      expect(exp).toBe('fail');
    });
  });

  test('catch with reject function', done => {
    expect.assertions(1);
    const instance = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('fail');
        done();
      });
    });

    instance
      .then(
        () => {},
        err => {
          expect(err).toBe('fail');
        }
      )
      .catch(exp => {
        expect(exp).toBe('fail'); // TODO:这样无法判断是走了reject函数还是走了catch函数
      });
  });

  test('static function', () => {
    expect.assertions(2);
    const resolveInstance = Promise.resolve('geek');
    resolveInstance.then(res => {
      expect(res).toBe('geek');
    });
    const rejectInstance = Promise.reject('error');
    rejectInstance.then(
      () => {},
      err => {
        expect(err).toBe('error');
      }
    );
    // Promise.reject
    // Promise.all
    // Promise.race
    // Promise.once
  });
});
