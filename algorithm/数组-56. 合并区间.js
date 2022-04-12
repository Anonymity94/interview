/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // 先排序
  intervals.sort((a, b) => a[0] - b[0]);

  var res = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    let findRange = false;
    const item = intervals[i];
    for (let j = 0; j < res.length; j++) {
      const target = res[j];

      // 判断是否有范围重叠
      if (item[0] > target[1]) {
        continue;
      }

      // 更新左、右侧的值
      res[j][0] = Math.min(item[0], target[0]);
      res[j][1] = Math.max(item[1], target[1]);
      findRange = true;
      break;
    }

    // 如果比较完都没有发现区间，就push进去
    if (!findRange) {
      res.push(intervals[i]);
    }
  }

  return res;
};
