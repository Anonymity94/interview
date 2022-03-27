// 原理
// 通过构建有序序列，对于排序的数据，在已知排序序列中从后往前扫描
// 找到相应的位置插入
// 时间复杂度 O(n^2)

function insertSort(arr) {
  let n = arr.length;
  let preIndex, current;

  // 从第一个开始
  for (let i = 1; i < n; i++) {
    // 前一个元素的位置
    preIndex = i - 1;
    // 当前元素
    current = arr[i];

    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }

    arr[preIndex + 1] = current;
  }

  return arr;
}
