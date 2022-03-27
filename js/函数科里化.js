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
