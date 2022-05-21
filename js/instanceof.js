function instanceofMock(L, R) {
  // L 必须是实例对象
  // R 必须是构造函数
  if (typeof L !== 'object' || L === null || typeof R !== 'function') {
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
console.log(a);

function Person(name) {
  this.name = name;
}
const p = new Person('zhangsan');
const b = instanceofMock(p, Person);
console.log(b);
