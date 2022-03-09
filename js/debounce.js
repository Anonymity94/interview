// https://zhuanlan.zhihu.com/p/86426949
// https://github.com/mqyqingfeng/Blog/issues/22

/**
 * 防抖
 * @param {Function} func Function
 * @param {Number} wait 等待的毫秒数
 * @param {Boolean} immediate 是否立即执行一次
 * @returns
 */
const debounce = function (func, wait, immediate) {
  let timeoutId = null;
  let result = undefined;

  const debounced = function (...args) {
    const context = this;
    clearTimeout(timeoutId);

    if (immediate) {
      // 是否执行过
      let callNow = !timeoutId;
      if (callNow) {
        result = func.apply(context, args);
      }

      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, wait);
    } else {
      timeoutId = setTimeout(() => {
        result = func.apply(context, args);
      }, wait);
    }

    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  return debounced;
};

const foo = (name) => {
  console.log(name);
};

const debounceFunc = debounce(foo, 1000, true);

debounceFunc(12);
debounceFunc(12);
debounceFunc(12);
debounceFunc(12);
