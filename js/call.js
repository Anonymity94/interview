Function.prototype.call2 = function (context = window, ...args) {
  const fnKey = Symbol("fn");
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};

// Test
// ===========

var foo = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age,
  };
}

console.log(bar.call(foo, "kevin", 18));
console.log(bar.call2(foo, "kevin", 18));
