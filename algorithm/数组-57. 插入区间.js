/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  let ans = [];

  let index = 0;
  // 收集不需要合并的项
  while (index < intervals.length && intervals[index][1] < newInterval[0]) {
    ans.push(intervals[index]);
    index++;
  }
  // 合并
  while (index < intervals.length && intervals[index][0] <= newInterval[1]) {
    newInterval[0] = Math.min(intervals[index][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[index][1], newInterval[1]);
    index++;
  }
  ans.push(newInterval);
  while (index < intervals.length) {
    ans.push(intervals[index]);
    index++;
  }

  return ans;
};
