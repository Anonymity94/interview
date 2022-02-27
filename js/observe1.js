// 监听对象
function observe(data) {
  if (!data || typeof data != 'object') {
    return;
  }

  Object.keys(data).forEach((key) => {
    let value = data[key];
    observe(value);

    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get() {
        console.log(`get ${key}, value is ${value}`);
        return value;
      },
      set(newValue) {
        console.log(
          `set ${key}, old value is ${value}, new value is ${newValue}`
        );
        value = newValue;
      },
    });
  });
}

// 监听数组
// 重写数组原型
const extendArray = Object.create(Array.prototype);
const arrMethods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
];
arrMethods.forEach((method) => {
  const oldMethod = Array.prototype[method];
  const newMethod = function (...args) {
    oldMethod.apply(this, args);
    console.log(`${method} run`);
  };
  extendArray[method] = newMethod;
});

Array.prototype = Object.assign(Array.prototype, extendArray);

let obj = {
  name: 'zhangsan',
  age: 18,
  girlfriends: ['xiaoli', 'xiaohong'],
};
observe(obj);

obj.age = 20;
console.log(obj.name);

obj.girlfriends.push('hahaha');
