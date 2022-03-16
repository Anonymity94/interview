// 两个函数的组合
var compose = function (...funcs) {
  if (funcs.length === 0) {
    throw TypeError('传入函数');
  }
  if (funcs.some((f) => typeof f !== 'function')) {
    throw TypeError('传入函数');
  }

  return (...args) => {
    let point = funcs.length - 1;
    let result;
    while (point--) {
      result = funcs[point].apply(this, args);
    }

    return result;
  };
};
var compose = (f, g) => (x) => f(g(x));
var add1 = (x) => x + 1;
var mul5 = (x) => x * 5;
console.log(compose(mul5, add1)(2)); // =>15

var compose2 = function (...funcs) {
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
};
console.log(compose2(mul5, add1)(2)); // =>15
