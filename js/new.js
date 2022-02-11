// https://github.com/mqyqingfeng/Blog/issues/13

// Otaku 御宅族，简称宅
function Otaku(name, age) {
  this.name = name;
  this.age = age;

  this.habit = "Games";
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log("I am " + this.name);
};

// ===============

const objectFactory = function (Constructor, ...args) {
  const obj = Object.create(Function.prototype);
  obj.__proto__ = Constructor.prototype;
  const res = Constructor.call(obj, ...args);

  const isObject = res !== null && typeof res === "object";
  const isFunc = typeof res === "function";

  return isObject || isFunc ? res : obj;
};

// 原生 new
// =========
var person = new Otaku("Kevin", "18");
console.log(person); // Kevin
person.sayYourName(); // I am Kevin

// mock new
// =========
var person2 = objectFactory(Otaku, "Kevin", "18");
console.log(person2); // Kevin
person2.sayYourName(); // I am Kevin
