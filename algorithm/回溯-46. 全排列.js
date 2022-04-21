/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const result = [];
  // 记录回溯算法的递归路径
  const track = [];
  // track 中的所有元素都会被标记成true
  const usedList = [];

  /**
   * @param {number[]} nums
   * @return {number[][]}
   */
  var backtrack = function (nums) {
    console.log('track', track);
    console.log('usedList', usedList);
    // 达到叶子节点
    if (track.length === nums.length) {
      // 这里注意要拷贝一次
      result.push([...track]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 排除重复
      if (usedList[i]) {
        continue;
      }
      // 做选择
      usedList[i] = true;
      track.push(nums[i]);

      // 进入一下层
      backtrack(nums);

      // 取消选择
      usedList[i] = false;
      track.pop();
    }
  };

  backtrack(nums);

  return result;
};

console.log(permute([1, 2, 3]));

// https://programmercarl.com/0046.%E5%85%A8%E6%8E%92%E5%88%97.html