console.log(module.exports);
console.log(exports);
console.log('----');

exports.a = 1;

console.log(module.exports);
console.log(exports);
console.log('----');

module.exports = {
  b: 2,
};

console.log(module.exports);
console.log(exports);

console.log('模块被加载了');
