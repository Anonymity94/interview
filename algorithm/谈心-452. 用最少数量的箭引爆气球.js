/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  points.sort((a, b) => a[0] - b[0]);
  console.log(points);
  // 至少要射出1根箭
  let count = 1;
  for (let i = 1; i < points.length; i++) {
    // 2个气球不重叠
    if (points[i][0] > points[i - 1][1]) {
      count++;
    } else {
      // 2个气球重叠，以小的右边界为准
      points[i][1] = Math.min(points[i - 1][1], points[i][1]);
    }
  }

  return count;
};
