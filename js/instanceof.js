function instanceofMock(L, R) {
  if (typeof L !== "object") {
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
    L = L.__proto__;
  }
}

const a = instanceofMock("", String);
console.log(a);

function Person(name) {
  this.name = name;
}
const p = new Person("zhangsan");
const b = instanceofMock(p, Person);
console.log(b);
