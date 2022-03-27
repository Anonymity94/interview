function add(a, b, c) {
  return a + b + c;
}

// 执行 add 函数，一次传入两个参数即可
add(1, 2, 3); // 6

// 假设有一个 partial 函数可以做到局部应用
var addOne = partial(add, 1);

console.log(addOne(2, 3));

function partial(fn, ...args) {
  // 获取函数所需参数的数量
  args = args || [];
  return function () {
    // 拼接参数
    var _args = args.slice(0);
    // 收集所有的参数
    for (let index = 0; index < arguments.length; index++) {
      _args.push(arguments[index]);
    }

    return fn.apply(this, _args);
  };
}
