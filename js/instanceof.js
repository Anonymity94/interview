function instanceofMock(L, R) {
  // L 必须是实例对象
  // R 必须是构造函数
  if (L === null || typeof R !== 'function') {
    return false;
  }

  while (true) {
    // 已经遍历到最顶端
    if (L === null) {
      return false;
    }

    if (R.prototype === L.__proto__) {
      return true;
    }

    // 一直顺着 __proto__ 找
    L = L.__proto__;
  }
}

const a = instanceofMock('', String);
console.log(a); // true

function Person(name) {
  this.name = name;
}
const p = new Person('zhangsan');
const b = instanceofMock(p, Person);
console.log(b); // true

function Foo() {}
var c = new Foo();

function child() {}
function father() {}
child.prototype = new father();
var d = new child();

console.log(instanceofMock([], Array)); // true
console.log(instanceofMock({}, Object)); // true
console.log(instanceofMock({}, Array)); // false
console.log(instanceofMock([], Object)); // true
console.log(instanceofMock(c, Foo)); // true
console.log(instanceofMock(d, child)); // true
console.log(instanceofMock(d, father)); // true
