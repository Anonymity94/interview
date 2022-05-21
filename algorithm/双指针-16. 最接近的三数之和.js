/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  let ans = Infinity;
  // 排序
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    // 排除重复的
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    // 找后2个数
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === target) {
        return target;
      }

      // 根据值来判断是否要更新结果
      if (Math.abs(sum - target) < Math.abs(ans - target)) {
        console.log(nums[i], nums[left], nums[right], sum);
        ans = sum;
      }

      if (sum < target) {
        let tempLeft = left + 1;
        // 排除重复的
        while (tempLeft < right && nums[left] === nums[tempLeft]) {
          tempLeft += 1;
        }
        left = tempLeft;
      } else {
        let tempRight = right - 1;
        // 排除重复的
        while (left < tempRight && nums[right] === nums[tempRight]) {
          tempRight -= 1;
        }
        right = tempRight;
      }
    }
  }

  return ans;
};


var length = 10;
function fn() {
  return this.length + 1;
}
var obj = {
  length: 5,
  test1: function() {
    return fn();
  }
};
obj.test2 = fn;

var testObj = {
  length: 20
}

console.log(obj.test1.call());
console.log(obj.test1());
console.log(obj.test1.call(testObj)); // 输出多少？
console.log(obj.test2.call());
console.log(obj.test2());