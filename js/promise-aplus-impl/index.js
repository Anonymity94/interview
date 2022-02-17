// https://github.com/Lucifier129/promise-aplus-impl/blob/master/src/naive.js
// https://github.com/yuanyuanbyte/Promise/blob/main/myPromiseFully.js

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

const isFunction = (obj) => typeof obj === "function";
const isObject = (obj) => obj !== null && typeof obj === "object";
const isThenable = (obj) => obj instanceof Object && "then" in obj;

function MyPromise(f) {
  // 初始状态
  this.state = PENDING;
  // 初始结果
  this.result = undefined;

  // 成功的回调
  this.onFulfilledCallbacks = [];
  // 失败的回调
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (this.state !== PENDING) {
      return;
    }

    setTimeout(() => {
      this.state = FULFILLED;
      this.result = value;
      this.onFulfilledCallbacks.forEach((cb) => cb(value));
    }, 0);
  };

  const reject = (reason) => {
    if (this.state !== PENDING) {
      return;
    }

    setTimeout(() => {
      this.state = REJECTED;
      this.result = reason;
      this.onRejectedCallbacks.forEach((cb) => cb(reason));
    }, 0);
  };

  // 捕获在excutor执行器中抛出的异常
  try {
    f(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = isFunction(onFulfilled) ? onFulfilled : (value) => value;
  onRejected = isFunction(onRejected)
    ? onRejected
    : (reason) => {
        throw reason;
      };

  const promise2 = new MyPromise((resolve, reject) => {
    if (this.state === PENDING) {
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            var x = onFulfilled(this.result);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            var x = onRejected(this.result);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }
    if (this.state === REJECTED) {
      setTimeout(() => {
        try {
          var x = onRejected(this.result);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0);
    }
    if (this.state === FULFILLED) {
      setTimeout(() => {
        try {
          var x = onFulfilled(this.result);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0);
    }
  });

  return promise2;
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};

/**
 * Promise.resolve()
 * @param {[type]} value 要解析为 Promise 对象的值
 */
MyPromise.resolve = function (value) {
  // 如果这个值是一个 promise ，那么将返回这个 promise
  if (value instanceof MyPromise) {
    return value;
  }
  // 如果这个值是thenable（即带有`"then" `方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；
  if (isThenable(value)) {
    return new MyPromise((resolve, reject) => {
      value.then(resolve, reject);
    });
  }
  // 否则返回的promise将以此值完成，即以此值执行`resolve()`方法 (状态为fulfilled)
  return new MyPromise((resolve, reject) => {
    resolve(value);
  });
};

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => reject(reason));
};

/**
 * Promise.prototype.finally()
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
 * @param {*} cb
 * @returns
 */
MyPromise.prototype.finally = function (cb) {
  return this.then(cb, cb);
};

/**
 * Promise.all()
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
 * @param {iterable} promiseList
 * @returns
 */
MyPromise.all = function (promiseList) {
  return new MyPromise((resolve, reject) => {
    if (!Array.isArray(promiseList)) {
      reject(new Error("参数不可 iterable"));
    }
    // 如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise
    if (promiseList.length === 0) {
      return resolve(promiseList);
    }

    let results = [];
    let count = 0; // 计数器
    promiseList.forEach((func, index) => {
      MyPromise.resolve(func)
        .then((r) => {
          count += 1;
          results[index] = r;
          if (count === promiseList.length) {
            resolve(results);
          }
        })
        .catch((e) => {
          /**
           * 如果传入的 promise 中有一个失败（rejected），
           * Promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成
           */
          reject(e);
        });
    });
  });
};

/**
 * Promise.allSettled()
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
 * @param {iterable} promiseList
 * @returns
 */
MyPromise.allSettled = function (promiseList) {
  return new MyPromise((resolve, reject) => {
    if (!Array.isArray(promiseList)) {
      reject(new Error("参数不可 iterable"));
    }
    // 如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise
    if (promiseList.length === 0) {
      return resolve(promiseList);
    }

    // {status,value,reason}[]
    let results = [];
    let count = 0; // 计数器
    promiseList.forEach((func, index) => {
      MyPromise.resolve(func)
        .then((r) => {
          results[index] = {
            status: FULFILLED,
            value: r,
          };
        })
        .catch((err) => {
          results[index] = {
            status: REJECTED,
            value: err,
          };
        })
        .finally(() => {
          count += 1;
          if (count === promiseList.length) {
            resolve(results);
          }
        });
    });
  });
};

/**
 * Promise.race()
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
 * @param {iterable} promiseList
 * @returns
 */
MyPromise.rach = function (promiseList) {
  return new MyPromise((resolve, reject) => {
    if (!Array.isArray(promiseList)) {
      reject(new Error("参数不可 iterable"));
    }

    if (promiseList.length > 0) {
      promiseList.forEach((p) => {
        MyPromise.resolve(p).then(resolve, reject);
      });
    }
  });
};

/**
 * Promise.all()
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
 * @param {iterable} promiseList
 * @returns
 */
MyPromise.any = function (promiseList) {
  return new MyPromise((resolve, reject) => {
    if (!Array.isArray(promiseList)) {
      reject(new Error("参数不可 iterable"));
    }
    if (promiseList.length === 0) {
      reject("空的可迭代对象");
    }
    if (!Array.some((el) => el instanceof MyPromise)) {
      resolve("不包含任何的 promise");
    }
    let errCount = 0;
    let errList = [];
    promiseList.forEach((item) => {
      MyPromise.resolve(item)
        .then((value) => resolve(value))
        .catch((err) => {
          errCount += 1;
          errList[index] = err;
          if (errCount === promiseList.length) {
            resolve(errList);
          }
        });
    });
  });
};

/**
 * 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
const resolvePromise = (promise2, x, resolve, reject) => {
  // 2.3.1规范 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  if (promise2 === x) {
    return reject(new TypeError("Can not fufill promise with itself"));
  }

  // 2.3.2规范 如果 x 为 Promise ，则使 promise2 接受 x 的状态
  if (x instanceof MyPromise) {
    if (x.state === PENDING) {
      /**
       * 2.3.2.1 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
       *         注意"直至 x 被执行或拒绝"这句话，
       *         这句话的意思是：x 被执行x，如果执行的时候拿到一个y，还要继续解析y
       */
      x.then((y) => {
        resolvePromise(promise2, y, resolve, reject);
      }, reject);
    }
    if (x.state === FULFILLED) {
      // 2.3.2.2 如果 x 处于执行态，用相同的值执行 promise
      resolve(x.result);
    }
    if (x.state === REJECTED) {
      // 2.3.2.3 如果 x 处于拒绝态，用相同的据因拒绝 promise
      reject(x.result);
    }
  } else if (isObject(x) || isFunction(x)) {
    // 2.3.3 如果 x 为对象或函数
    try {
      // 2.3.3.1 把 x.then 赋值给 then
      var then = x.then;
    } catch (error) {
      // 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
      return reject(error);
    }

    /**
     * 2.3.3.3
     * 如果 then 是函数，将 x 作为函数的作用域 this 调用之。
     * 传递两个回调函数作为参数，
     * 第一个参数叫做 `resolvePromise` ，第二个参数叫做 `rejectPromise`
     */
    if (isFunction(then)) {
      // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
      let called = false;
      try {
        then.call(
          x,
          // 2.3.3.3.1 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          // 2.3.3.3.2 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          (reason) => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } catch (error) {
        /**
         * 2.3.3.3.4 如果调用 then 方法抛出了异常 e
         * 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
         */
        if (called) return;
        called = true;
        // 2.3.3.3.4.2 否则以 e 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise
    return resolve(x);
  }
};

// =========================
MyPromise.deferred = function () {
  let result = {};
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};
module.exports = MyPromise;
