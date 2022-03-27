// 原理
// 分治的思想
// 先随机选出一个元素作为基准
// 比基准点小的放在左边
// 比基准点大的放在右边
// 时间复杂度：O(nlogn)

/**
 * 最简单的快速排序
 * @param {any[]} arr
 */
function quicksort(arr) {
  if (arr.length < 2) {
    return arr.slice();
  }

  // 随机找到基准点
  const pivot = arr[Math.floor(Math.random() * arr.length)];

  let left = [];
  let middle = [];
  let right = [];

  for (let index = 0; index < arr.length; index++) {
    const value = arr[index];

    if (value < pivot) {
      left.push(value);
    }

    if (value === pivot) {
      middle.push(value);
    }
    if (value > pivot) {
      right.push(value);
    }
  }

  // 递归进行
  return quicksort(left).concat(middle, quicksort(right));
}

let arr = [23, 4, 123, 54, 1, 43, 3];
console.log(quicksort(arr));
