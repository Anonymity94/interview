/**
 * Object.assign()
 * @param {object} target 目标对象
 * @param  {...object} sources 源对象
 */
const assign = (target, ...sources) => {
  if (target === null) {
    throw new TypeError('无法将 null 转换为对象');
  }
  // 基本类型包装成对象
  const newObj = Object(target);

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    // 过滤掉 null 和 undefined
    if (source) {
      // Object.assign 方法只会拷贝源对象 可枚举的 和 自身的 属性到目标对象
      // 首先获取所有可枚举的属性，包括原型链上的
      for (let key in source) {
        // 然后，检查是否在目标对象的自身的属性
        // 由于目标对象可能是由 Object.create(null) 构建
        // 所以这里不可以直接使用 source.hasOwnProperty(key)
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          // 覆盖目标对象中的属性
          newObj[key] = source[key];
        }
      }
    }
  }
  return newObj;
};

// 下面的测试用例来自于 MDN
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

// ===================
console.log('测试：合并具有相同属性的对象');
const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };

const obj1 = assign({}, o1, o2, o3);
console.log(obj1); // { a: 1, b: 2, c: 3 }

// ===================
console.log('测试：深拷贝问题');
function test() {
  'use strict';

  let obj1 = { a: 0, b: { c: 0 } };
  let obj2 = assign({}, obj1);
  console.log(JSON.stringify(obj2)); // { "a": 0, "b": { "c": 0}}

  obj1.a = 1;
  console.log(JSON.stringify(obj1)); // { "a": 1, "b": { "c": 0}}
  console.log(JSON.stringify(obj2)); // { "a": 0, "b": { "c": 0}}

  obj2.a = 2;
  console.log(JSON.stringify(obj1)); // { "a": 1, "b": { "c": 0}}
  console.log(JSON.stringify(obj2)); // { "a": 2, "b": { "c": 0}}

  obj2.b.c = 3;
  console.log(JSON.stringify(obj1)); // { "a": 1, "b": { "c": 3}}
  console.log(JSON.stringify(obj2)); // { "a": 2, "b": { "c": 3}}

  // Deep Clone
  obj1 = { a: 0, b: { c: 0 } };
  let obj3 = JSON.parse(JSON.stringify(obj1));
  obj1.a = 4;
  obj1.b.c = 4;
  console.log(JSON.stringify(obj3)); // { "a": 0, "b": { "c": 0}}
}

test();

// ===================
console.log('测试：原型链上的属性和不可枚举属性不能被复制');
const obj2 = Object.create(
  { foo: 1 },
  {
    // foo is on obj's prototype chain.
    bar: {
      value: 2, // bar is a non-enumerable property.
    },
    baz: {
      value: 3,
      enumerable: true, // baz is an own enumerable property.
    },
  }
);

const copy = assign({}, obj2);
console.log(copy); // { baz: 3 }

// ===================
console.log('测试：基本类型会被包装为对象');
const v1 = 'abc';
const v2 = true;
const v3 = 10;
const v4 = Symbol('foo');

const obj3 = assign({}, v1, null, v2, undefined, v3, v4);
// Primitives will be wrapped, null and undefined will be ignored.
// Note, only string wrappers can have own enumerable properties.
console.log(obj3); // { "0": "a", "1": "b", "2": "c" }
