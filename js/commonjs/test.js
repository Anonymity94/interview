const cjs = require('./cjs');
require('./cjs');
require('./cjs');
require('./cjs');
require('./cjs');

console.log(cjs.a);
console.log(cjs.b);

// exports 是 module.exports 的引用
// 初始状态下 var exports = module.exports = {};
// 加载某个模块时，其实是用的模块的 module.exports 属性

// 文件即模块，文件中的代码都运行在独立作用域中，不会污染全局空间
// 模块可以被多次记载、引用。第一次加载后，会被缓存，之后都会从缓存中读取结果
// module.exports 输出的是值的拷贝，一旦这个值被输出，模块内再发生变化也不会影响值的输出
// 模块加载按照顺序进行加载
