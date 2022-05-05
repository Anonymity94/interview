/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function (nums) {
  // 计算每个数字出现的次数、最左侧下标和最右侧下标
  const temp = {};
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    // 次数，最左侧下标，最右侧下标
    if (temp[item]) {
      temp[item][0] += 1;
      temp[item][2] = i;
    } else {
      temp[item] = [1, i, i];
    }
  }
  // 找到最大的度且最短连续 对应的数字
  const keys = Object.keys(temp);
  console.log(temp);
  let maxCountNumber = keys[0];
  let step = temp[maxCountNumber][2] - temp[maxCountNumber][1] + 1;
  for (let i = 1; i < keys.length; i++) {
    const [count, left, right] = temp[keys[i]];
    if (count > temp[maxCountNumber][0]) {
      maxCountNumber = keys[i];
      step = right - left + 1;
    } else if (count === temp[maxCountNumber][0] && right - left + 1 < step) {
      maxCountNumber = keys[i];
      step = right - left + 1;
    }
  }
  console.log(maxCountNumber);
  return temp[maxCountNumber][2] - temp[maxCountNumber][1] + 1;
};
