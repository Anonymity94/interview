/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  let ans = 0;
  for (let i = 0; i < intervals.length; i++) {
    if (i > 0 && intervals[i - 1][1] > intervals[i][0]) {
      ans++;
      // 以右边界小的为准
      intervals[i][1] = Math.min(intervals[i - 1][1], intervals[i][1]);
    }
  }
  return ans;
};
