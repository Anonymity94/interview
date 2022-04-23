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
obj.test2 = fn;

console.log(obj.test1.call());
console.log(obj.test1());
console.log(obj.test2.call());
console.log(obj.test2());

//
// 全排列
// 回溯、剪枝

// [[a,b],[m,n],[0,1]]

// [am0,am1,an0,an1,]
