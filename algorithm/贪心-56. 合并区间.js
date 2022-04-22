/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // 先排序
  intervals.sort((a, b) => {
    return a[0] - b[0];
  });

  let result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [min, max] = intervals[i];
    let findRange = false;
    for (let j = 0; j < result.length; j++) {
      if (min >= result[j][0] && min <= result[j][1]) {
        findRange = true;
        // 合并
        result[j][1] = Math.max(result[j][1], max);
        break;
      }
    }

    if (!findRange) {
      result.push(intervals[i]);
    }
  }

  return result;
};
