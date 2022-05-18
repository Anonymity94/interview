function curry(fn, args) {
  var length = fn.length;
  // 获取函数所需参数的数量
  args = args || [];
  return function () {
    // 拼接参数
    var _args = args.slice(0);
    // 收集所有的参数
    for (let index = 0; index < arguments.length; index++) {
      _args.push(arguments[index]);
    }

    if (_args.length < length) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  };
}

var fn = curry(function (a, b, c) {
  console.log([a, b, c]);
});

fn('a', 'b', 'c'); // ["a", "b", "c"]
fn('a', 'b')('c'); // ["a", "b", "c"]
fn('a')('b')('c'); // ["a", "b", "c"]
fn('a')('b', 'c'); // ["a", "b", "c"]

const curry2 = (fn) => {
  return (tempFn = (...args) => {
    // 参数数量达到函数指定长度，就执行函数
    if (args.length === fn.length) {
      return fn(...args);
    } else {
      // 否则继续收集参数
      return (...args2) => tempFn(...args, ...args2);
    }
  });
};

var fn = curry2(function (a, b, c) {
  console.log([a, b, c]);
});

fn('a', 'b', 'c'); // ["a", "b", "c"]
fn('a', 'b')('c'); // ["a", "b", "c"]
fn('a')('b')('c'); // ["a", "b", "c"]
fn('a')('b', 'c'); // ["a", "b", "c"]

const sum = (...args1) => {
  let fullArgs = [...args1];
  const fn = (...args2) => {
    // 收集参数
    fullArgs = [...fullArgs, ...args2];
    // 返回自身保持链式调用
    return fn;
  };

  // 重写valueOf，累加已收集的参数
  fn.valueOf = () => {
    return fullArgs.reduce((total, cur) => (total += cur), 0);
  };

  return fn;
};

console.log(sum(1, 2, 3).valueOf()); // 6
console.log(sum(2, 3)(2).valueOf()); // 7
console.log(sum(1)(2)(3)(4).valueOf()); // 10
console.log(sum(2)(4, 1)(2).valueOf()); // 9
