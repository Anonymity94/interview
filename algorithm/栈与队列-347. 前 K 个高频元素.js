/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const countMap = new Map();
  // 记录每个数字出现的次数
  nums.forEach((el) => {
    countMap.set(el, (countMap.get(el) || 0) + 1);
  });
  // 根据次数排序
  return (
    [...countMap.entries()]
      // 根据次数倒序排序
      .sort((a, b) => b[1] - a[1])
      // 截取前N个
      .slice(0, k)
      // 输出元素
      .map((el) => el[0])
  );
};
