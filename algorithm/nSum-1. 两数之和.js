// https://leetcode-cn.com/problems/two-sum/
// 哈希表
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    let cur = nums[i];
    const rest = target - cur;
    if (map.hasOwnProperty(rest)) {
      return [i, map[rest]];
    }

    map[cur] = i;
  }
};
