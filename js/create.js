/**
 *
 * @param {object} proto 原型对象
 * @param {undefined | object} propertiesObject 对象
 */
const create = (proto, propertiesObject) => {
  if (typeof proto !== 'object' && typeof proto !== null) {
    throw 'TypeError';
  }
  function F() {}
  F.prototype = proto;
  const o = new F();

  if (propertiesObject !== undefined) {
    Object.defineProperties(o, propertiesObject);
  }
  if (proto === null) {
    o.__proto__ = null;
  }
  return o;
};

// test
const person = {
  showName() {
    console.log(this.name);
  },
};
const me21 = create(person);
const me22 = Object.create(person);

me21.name = '张三';
me21.showName();

me22.name = '张三';
me22.showName();

const emptyObj21 = create(null);
const emptyObj22 = Object.create(null);
console.log(emptyObj21);
console.log(emptyObj22);

const props = {
  // foo会成为所创建对象的数据属性
  foo: {
    writable: true,
    configurable: true,
    value: 'hello',
  },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function () {
      return 10;
    },
    set: function (value) {
      console.log('Setting `o.bar` to', value);
    },
  },
};
let o21 = create(Object.prototype, props);
let o22 = Object.create(Object.prototype, props);

o21.bar = '张三';
o22.bar = '张三';

console.log(o21.foo); // hello
console.log(o22.foo); // hello
console.log(o21.bar); // 10
console.log(o22.bar); // 10
