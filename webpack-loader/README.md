> https://webpack.js.org/api/loaders/

## loader 执行顺序

> https://webpack.docschina.org/api/loaders/#pitching-loader

分为 2 个阶段: pitch 和 normal

pitch 执行顺序为: 从左往右
normal 执行顺序为: 从右往左

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        //...
        use: ['a-loader', 'b-loader', 'c-loader'],
      },
    ],
  },
};
```

```
|- a-loader `pitch`
  |- b-loader `pitch`
    |- c-loader `pitch`
      |- requested module is picked up as a dependency
    |- c-loader normal execution
  |- b-loader normal execution
|- a-loader normal execution
```

如果 loader 在 pitch 中存在返回值，则该过程会转过来并跳过剩余的加载器

```js
module.exports = function (content) {
  return someSyncOperation(content);
};

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  if (someCondition()) {
    return (
      'module.exports = require(' +
      JSON.stringify('-!' + remainingRequest) +
      ');'
    );
  }
};
```

```
|- a-loader `pitch`
  |- b-loader `pitch` returns a module
|- a-loader normal execution
```

## 为什么从右往左执行

> https://www.jianshu.com/p/eb268cb0f913

实际上是因为 webpack 采用了 compose。

```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
```

## 参考文件

- https://zhuanlan.zhihu.com/p/104205895
