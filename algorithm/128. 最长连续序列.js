/**
 * 利用哈希表的方法
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  // 设置 Set，去重的同时也方便查询
  const set = new Set();
  nums.forEach((num) => set.add(num));

  let res = 0;
  for (const num of set) {
    let cur = num;
    // 当不存在这个数字的上一位时
    // 开始遍历 num+1, num+2 ,累计个数
    if (!set.has(cur - 1)) {
      // 判断是否有 +1 数字，有的话再找 +2
      while (set.has(cur + 1)) {
        cur++;
      }
    }

    // 记录最长的连续个数
    res = Math.max(res, cur - num + 1);
  }

  return res;
};
