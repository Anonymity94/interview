/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  let result = 0;
  let left = 0;
  let right = height.length - 1;
  while (left < right) {
    const step = right - left;
    // 面积
    const area = Math.min(height[left], height[right]) * step;
    if (area > result) {
      result = area;
    }

    if (height[left] <= height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return result;
}
