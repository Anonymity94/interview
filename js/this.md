# 查看 this 输出和原型链输出的系列问题

## this 绑定的几个规则总结

> 下面知识点主要摘抄于 《你不知道的 JavaScript++上卷》第二部分第 2 章 this 全面解析。

### 调用位置

在理解 this 的绑定过程之前，首先要理解调用位置:调用位置就是函数在代码中被调用的 位置(而不是声明的位置)

### 绑定规则

#### 默认绑定：独立函数调用

```js
// 非严格模式下，foo 被调用时，this 被默认绑定在 window 上
function foo() {
  console.log(this.a);
}
var a = 2;
foo(); // 2
```

#### 隐式绑定：由上下文对象调用

```js
// 当 foo() 被调用时，它的落脚点确实指向 obj 对象。
// 当函数引 用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。
// 因为调 用 foo() 时 this 被绑定到 obj，因此 this.a 和 obj.a 是一样的
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};

obj.foo(); // 2
```

```js
// 对象属性引用链中只有最顶层或者说最后一层会影响调用位置
function foo() {
  console.log(this.a);
}
var obj2 = {
  a: 42,
  foo: foo,
};
var obj1 = {
  a: 2,
  obj2: obj2,
};

obj1.obj2.foo(); // 42
```

#### 隐式丢失：函数引用

一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默
认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式。

```js
function foo() {
  console.log(this.a);
}
var obj = { a: 2, foo: foo };
var bar = obj.foo; // 函数别名!
var a = 'oops, global'; // a 是全局对象的属性

// 虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，
// 因此此时的 bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定
bar(); // "oops, global"
```

#### 隐式丢失：函数当做参数传递

当函数被当做参数进行传递时，也传入的函数也会隐式赋值。

```js
function foo() {
  console.log(this.a);
}
function doFoo(fn) {
  // fn 其实引用的是 foo fn(); // <-- 调用位置!
}
var obj = { a: 2, foo: foo };
var a = 'oops, global'; // a 是全局对象的属性
doFoo(obj.foo); // "oops, global"
```

```js
function foo() {
  console.log(this.a);
}
var obj = { a: 2, foo: foo };
var a = 'oops, global'; // a 是全局对象的属性
setTimeout(obj.foo, 100); // "oops, global"
```

#### 显式绑定：硬绑定

这个比较清晰，即使用 bind 、apply 或 call 进行绑定。

#### 显式绑定：API 调用的"上下文"

```js
function foo(el) {
  console.log(el, this.id);
}
var obj = {
  id: 'awesome',
};
// forEach 的第二个参数可以指定上下文
// 默认情况下参数为空，"undefined" 会传递给 "this" 值
// 这里传入 obj，把 this 绑定到 obj 上
[1, 2, 3].forEach(foo, obj);
// 1 awesome 2 awesome 3 awesome
```

#### new 绑定

回想下构造函数发生时的几个步骤：

- 创建一个新的对象
- 将构造函数中的 this 指向这个新对象
- 为这个对象添加属性、方法等
- 如果显式返回一个对象（复杂类型），那 this 就指向返回值中的对象；如果返回的不是一个对象（返回基本类型），那 this 就指向实例。

```js
function foo(a) {
  this.a = a;
}
var bar = new foo(2);
console.log(bar.a); // 2
```

#### 箭头函数

> [ECMAScript 6 入门](https://es6.ruanyifeng.com/)

（1）箭头函数没有自己的`this`对象（详见下文）。

（2）不可以当作构造函数，也就是说，不可以对箭头函数使用`new`命令，否则会抛出一个错误。

（3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

上面四点中，最重要的是第一点。对于普通函数来说，内部的`this`指向函数运行时所在的对象，但是这一点对箭头函数不成立。它没有自己的`this`对象，内部的`this`就是定义时上层作用域中的`this`。也就是说，箭头函数内部的`this`指向是固定的，相比之下，普通函数的`this`指向是可变的。

**箭头函数中 this,首先到它的父作用域找，如果父作用域还是箭头函数，那么接着向上找，直到找到我们要的 this 指向。**

```js
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0
```

### 优先级

1. 函数是否在 new 中调用(new 绑定)?如果是的话 this 绑定的是新创建的对象。

   ```js
   var bar = new foo();
   ```

2. 函数是否通过 call、apply(显式绑定)或者硬绑定调用?如果是的话，this 绑定的是 指定的对象。

   ```js
   var bar = foo.call(obj2);
   ```

3. 函数是否在某个上下文对象中调用(隐式绑定)?如果是的话，this 绑定的是那个上下文对象。

   ```js
   var bar = obj1.foo();
   ```

4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象。

   ```js
   var bar = foo();
   ```

### 绑定例外

#### 被忽略的 this

`bind(null)` 和 `call(null)`

#### 间接引用

间接引用最容易在赋值时发生:

```js
function foo() {
  console.log(this.a);
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2
```

赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是 foo() 而不是 p.foo() 或者 o.foo()。根据我们之前说过的，这里会应用默认绑定。

### 小结

1. 由 new 调用。绑定到新创建的对象。
2. 由 call 或者 apply (或者 bind )调用。绑定到指定的对象。
3. 由上下文对象调用。绑定到那个上下文对象。
   - 全局函数被调用
4. 默认: 在严格模式下绑定到 undefined，否则绑定到全局对象。

## 第一题

```js
var length = 10;
function fn() {
  return this.length + 1;
}
var obj = {
  length: 5,
  test1: function () {
    return fn();
  },
};
// 隐式绑定，此时 fn 作为 obj 对象的一个属性
obj.test2 = fn;

// 显示绑定: test1 上下文绑定 null，非严格默认指向 window
// 默认绑定：fn 是独立函数调用，this 指向 window
console.log(obj.test1.call());

// 默认绑定：fn 是独立函数调用，this 指向 window
console.log(obj.test1());

// call 修改了隐式绑定，此时是 显式绑定
// call 传入 null，非严格默认指向 window
console.log(obj.test2.call());

// 隐式绑定：此时 fn 作为 obj 对象的一个属性，被调用时 this 指向此对象
console.log(obj.test2());
```

## 第二题

匿名函数在创建后会立即调用执行，即使定义在对象中。另外由于对象中的 `{}` 无法形成独立的作用域，所以匿名函数和定义在对象中，和定义在全局中是等价的。

```js
window.number = 2;
var obj = {
  number: 3,
  db1: (function () {
    console.log(this); // 语句A
    this.number *= 4; // 语句B
    // 返回一个闭包函数
    return function () {
      console.log(this);
      this.number *= 5;
    };
  })(),
};
var db1 = obj.db1;

// 被定义后，匿名函数先执行一次，此时语句A和语句B自动执行
// 先输出语句A的结果：window
// 然后修改全局下的number：window.number = 2 * 4 = 8

// 调用返回的闭包函数，此时相当于全局下调用这个闭包函数，此时
// this 指向 window
// this.number = window.number = 8 * 5 = 40
db1();
// 闭包函数被当做 obj 的属性被调用
// 此时 this 指向 obj
// this.number = obj.number = 3 * 5 = 15
obj.db1();

// 15
console.log(obj.number);
// 40
console.log(window.number);
```

## 第三题 考 this 优先级

```js
function foo(something) {
  this.a = something;
}

var obj1 = {
  foo: foo,
};

var obj2 = {};

// 隐式绑定，foo 被调用时，this 指向 obj1
obj1.foo(2);
// 赋值完成后，此时 obj1.a = 2
console.log(obj1.a);

// 显式绑定，call 改变了上下文，将 foo 函数的上下文变成 obj2
obj1.foo.call(obj2, 3);
// 赋值完成后，此时 obj2.a = 3
console.log(obj2.a);

// 当 obj1.foo 作为构造函数通过 new 被调用时，返回的实例已经与 obj1 解绑了。
// 也就是说，new 绑定修改了隐式绑定
// 因此 obj1 内的 a 属性没有被修改，依旧保持 2
var bar = new obj1.foo(4);
console.log(obj1.a); // 2
console.log(bar.a); // 4
```

## 第四题

```js
var name = 'window';

var person = {
  name: 'person',
  sayName: function () {
    console.log(this.name);
  },
};

function sayName() {
  var sss = person.sayName;
  // person.sayName 被赋值给了变量 sss，符合【隐式丢失：函数引用】的场景
  // 导致 sayName 函数脱离了原有的 person 对象
  // sss 被当做一个独立函数调用，此时对应【默认绑定】
  sss();

  // 隐式绑定
  person.sayName();

  // 《JavaScript高级程序设计（第4版）》中包含相同的问题，具体也是只是说了一句：按照规范，object.getIdentity 和 (object.getIdentity)是相等的。
  // 此语句等价于 person.sayName()
  person.sayName();

  // 绑定例外，赋值表达式返回的是函数的引用，此时被调用是 sayName，而不是  person.sayName，此时会应用默认绑定。sayName 中的 this 指向 window。
  (b = person.sayName)();
}

sayName();
```

## 第五题

先看下阮一峰老师的[ECMAScript 6 入门](https://es6.ruanyifeng.com/)，再回来做题目，会非常顺畅。

```js
var name = 'window';

var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name);
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name);
    };
  },
  foo4: function () {
    return () => {
      console.log(this.name);
    };
  },
};

var person2 = { name: 'person2' };

// 隐式绑定，foo1 作为 person1 的对象，this 指向 person1
person1.foo1();
// 显式绑定，call 将上下文修改为 person2
person1.foo1.call(person2);

// JavaScript 引擎的处理方法是，先在全局空间生成这个箭头函数，然后赋值给 person1.foo2，这导致箭头函数内部的this指向全局对象
person1.foo2();
// 箭头函数没有自己的 this 对象，所以无法被修改，this 还是指向 window
person1.foo2.call(person2);

// 返回的个独立的函数，在全局下被调用，所以返回结果中的 this 指向 window
person1.foo3()();
// call 修改了 foo3 的 this 指向，但是返回的是个独立的函数，在全局下被调用，所以 返回结果中的 this 指向 window
person1.foo3.call(person2)();
// 显式绑定
person1.foo3().call(person2);
// 箭头函数，this 指向 foo4 内的 this，即 person1
person1.foo4()();
// call 修改了 foo4 内的 this 指向了 person2，箭头函数被调用时，也指向 foo4 内的 this，即 person2
person1.foo4.call(person2)();
// 箭头函数指向 foo4 内的 this，call无法改变箭头函数中的 this
person1.foo4().call(person2);
```

可以简单的总结下

- 当函数被当做对象属性的调用时，隐式绑定 this 指向这个对象
- 对象属性的函数返回一个闭包时，如果第二层返回的闭包是箭头函数定义的，那第二层内的函数指向这个对象；如果是普通函数定义，那 this 指向全局

## 第六题

```js
var name = 'window';

function Person(name) {
  this.name = name;
  this.foo1 = function () {
    console.log(this.name);
  };
  this.foo2 = () => console.log(this.name);
  this.foo3 = function () {
    return function () {
      console.log(this.name);
    };
  };
  this.foo4 = function () {
    return () => {
      console.log(this.name);
    };
  };
}

var person1 = new Person('person1');
var person2 = new Person('person2');

// 隐式绑定
person1.foo1(); // person1

// 显式绑定
person1.foo1.call(person2); // person2

// 箭头函数中的 this 指向上层环境中的 this，即实例 person1
person1.foo2(); // person1

// 箭头函数中的 this 指向上层环境中的 this，即实例 person1
person1.foo2.call(person2); // person1

// 默认绑定 获取闭包函数，然后在全局下调用
person1.foo3()();

// 改变了 foo3 内的this，但是返回的闭包依旧是在 window 下调用
person1.foo3.call(person2)();

// // 显式绑定 person2
person1.foo3().call(person2);

// 箭头函数中的 this 指向上层环境中的 this，即实例 person1
person1.foo4()(); // person1

// call 修改了 foo4 中的 this 指向 person2，foo4 中返回的箭头函数 this 同 foo4 中的 this，所以指向 person2
person1.foo4.call(person2)(); // person2

// 箭头函数中的 this 无法被改变，所以还是指向实例 person1
person1.foo4().call(person2); // person1
```

## 第七题

```js
var name = 'window';

function Person(name) {
  this.name = name;
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name);
      };
    },
    foo2: function () {
      return () => {
        console.log(this.name);
      };
    },
  };
}

var person1 = new Person('person1');
var person2 = new Person('person2');

// 默认绑定 获取闭包函数，然后在全局下调用
person1.obj.foo1()(); // window

// 显式绑定仅改变了 foo1 的 this，但是没有影响到返回的闭包函数，闭包函数依旧在全局环境下被调用
person1.obj.foo1.call(person2)(); // window

// 显式绑定仅改变了闭包函数的 this
person1.obj.foo1().call(person2); // person2

// foo2 返回的是箭头函数定义的函数，默认情况下返回的闭包函数this指向等同于foo2的this
person1.obj.foo2()(); // obj
// 显式修改了foo2的this，所以箭头函数内的this==foo2内的this==实例person2
person1.obj.foo2.call(person2)(); // person2
// 箭头函数内的this无法被改变，所以还是等于foo2的this指向，等于obj
person1.obj.foo2().call(person2); // obj
```

---

等待更新

## 第八题

> [函数的扩展-作用域](https://es6.ruanyifeng.com/#docs/function#%E4%BD%9C%E7%94%A8%E5%9F%9F)

```js
// 当函数的参数有默认值时, 会形成一个新的作用域, 这个作用域用于保存参数的值（所以不会修改全局的变量）
var x = 0;

function foo(
  x,
  y = function () {
    x = 3;
    console.log(x);
  }
) {
  console.log(x);
  var x = 2;
  console.log(x);
  y();
  console.log(x);
}

foo(1);
console.log(x);
```

## 第九题

Object() 由 Function() 创建。

```js
Function.prototype.a = function () {
  console.log('我是a');
};
Object.prototype.b = function () {
  console.log('我是b');
};

function A() {}
var c = new A();

A.a();
A.b();
c.a();
c.b();
Function.b();
Object.a();
```
