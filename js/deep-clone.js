// https://juejin.cn/post/6844903929705136141#heading-10
// https://juejin.cn/post/7078289953699921956
function isArray(target) {
  return Array.isArray(target);
}

function isObject(target) {
  return target !== null && typeof target === 'object';
}

/**
 * 浅拷贝
 * @param {Object} origin 源对象
 * @param {Object} target 目标对象
 */
function clone(origin, target) {
  var target = target || {};
  for (let k in origin) {
    if (origin.hasOwnProperty(key)) {
      target[k] = origin[k];
    }
  }

  return target;
}
// 基础数据类型
// ============
console.log(Object.prototype.toString.call(null));
// [object Null]
console.log(Object.prototype.toString.call(undefined));
// [object Undefined]
console.log(Object.prototype.toString.call(true));
// [object Boolean]
console.log(Object.prototype.toString.call(123));
// [object Number]
console.log(Object.prototype.toString.call('String'));
// [object String]
console.log(Object.prototype.toString.call(Symbol()));
// [object Symbol]

// 需要遍历的引用类型
// ============
console.log(Object.prototype.toString.call({}));
// [object Object]
console.log(Object.prototype.toString.call([]));
// [object Array]
console.log(Object.prototype.toString.call(new Set()));
// [object Set]
console.log(Object.prototype.toString.call(new Map()));
// [object Map]

// 不需要遍历的引用类型
// =============
console.log(Object.prototype.toString.call(new Error()));
// [object Error]
console.log(Object.prototype.toString.call(new RegExp()));
// [object RegExp]
console.log(Object.prototype.toString.call(new String()));
// [object String]
console.log(Object.prototype.toString.call(new Number()));
// [object Number]
console.log(Object.prototype.toString.call(new Boolean()));
// [object Boolean]
console.log(Object.prototype.toString.call(new Date()));
// [object Date]
// console.log(Object.prototype.toString.call(window));
// [Object global]
console.log(Object.prototype.toString.call(JSON));
// [object JSON]
console.log(Object.prototype.toString.call(Math));
// [object Math]
console.log(Object.prototype.toString.call(Symbol()));
// [object Symbol]
console.log(Object.prototype.toString.call(function () {}));
// [object Function]

/**
 * 判断是否是对象
 * @param {*} target
 * @returns
 */
function isObject(target) {
  return (
    target !== null &&
    (typeof target === 'object' || typeof target === 'function')
  );
}

/**
 * 通过 toString 方法获取类型
 * @param {*} target
 * @returns
 */
function getType(target) {
  return Object.prototype.toString.call(target);
}

/**
 * 可遍历的对象，获取初始值
 * @param {*} target
 * @returns
 */
function getInitialValue(target) {
  const Constructor = target.constructor;
  return new Constructor();
}

/**
 * 拷贝除基础类型、可遍历对象外的其他类型
 * @param {*} target
 * @param {*} type
 */
function cloneOtherType(target, type) {
  const Constructor = target.constructor;
  switch (type) {
    case '[object Number]': // new Number()
    case '[object String]': // new String()
    case '[object Boolean]': // new Boolean()
    case '[object Error]': // new Error()
    case '[object Date]': // new Date()
    case '[object Regex]': // new Regex()
      return new Constructor(target);

    // Symbol
    case '[object Symbol]': // new Symbol()
      // 拷贝 Symbol 的包装对象的时候，首先要获取到 Symbol 本身的值，然后再用 Object() 包裹后返回
      return Object(Symbol.prototype.valueOf.apply(target));
    // 函数
    case '[object Function]':
      // 因为函数本身在哪里定义并不重要，重要的是函数在哪里调用，所以函数类型可以直接返回函数本身
      // return eval(target.toString());
      return new Function('return ' + target.toString())();
    default:
      return null;
  }
}

/**
 * 深度拷贝
 * @param {*} target 拷贝对象
 * @param {*} map 记录循环引用对象
 * @returns
 */
function cloneDeep(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  const type = getType(target);
  let cloneTarget;
  // 需要遍历的引用对象的初始值
  if (
    [
      '[object Object]',
      '[object Array]',
      '[object Map]',
      '[object Set]',
    ].includes(type)
  ) {
    cloneTarget = getInitialValue(target);
  } else {
    // 不可遍历的其他对象
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target, target);
  }
  map.set(target, cloneTarget);

  // 拷贝对象
  if (type === '[object Object]') {
    const keys = Object.keys(target);
    keys.forEach((key) => {
      cloneTarget[key] = cloneDeep(target[key], map);
    });
  }
  // 拷贝数组
  else if (type === '[object Array]') {
    target.forEach((key) => {
      cloneTarget[key] = cloneDeep(target[key], map);
    });
  }
  // 拷贝 set
  else if (type === '[object Map]') {
    // target.forEach((value, key) => {
    //   cloneTarget.set(key, cloneDeep(value, map));
    // });
    for (let [key, value] of target) {
      cloneTarget.set(key, cloneDeep(value, map));
    }
  }
  // 拷贝 map
  else if (type === '[object Set]') {
    for (let item of target) {
      cloneTarget.add(cloneDeep(item, map));
    }
  }

  return cloneTarget;
}

// test
const map = new Map();
map.set('key', 'value');
map.set('Hello', 'Word');

const set = new Set();
set.add('Set1111');
set.add('Set2222');

const obj = {
  // 基础数据类型
  // ==========
  number: 1,
  string: 'string',
  boolean: true,
  undefined: undefined,
  null: null,
  bigint: BigInt(1n),
  // Object
  // ==============
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  error: new Error(),
  reg: /\d+/,
  func1: () => {
    console.log('code秘密花园');
  },
  func2: function (a, b) {
    return a + b;
  },
};

const result = cloneDeep(obj);

console.log(target);
console.log(result);
