// https://github.com/mqyqingfeng/Blog/issues/12
Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable'
    );
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

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

var fn = bar.bind2(foo, 'kevin');
console.log(fn(18));

var obj = new fn('18');
console.log(obj);

Function.prototype.bind3 = function (context) {
  const me = this;
  const args = Array.prototype.slice.call(arguments, 1);
  const F = function () {};
  F.prototype = this.prototype;
  const bound = function () {
    const innerArgs = Array.prototype.slice.call(arguments);
    const finnalArgs = args.concat(innerArgs);
    return me.apply(this instanceof F ? this : context, finnalArgs);
  };

  bound.prototype = new F();
  return bound;
};

var foo = {
  value: 1,
};

function test(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age,
  };
}

var fn = test.bind3(foo, 'kevin');
console.log(fn(18));
