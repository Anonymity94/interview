// 原理
// 从左往右，相邻元素进行比较，如果前一个元素大小后一个元素，则交换
// 这样全部遍历完成，最大的数会在最右边冒泡出来
// 时间复杂度： 最好时间复杂度 O(n)，平均时间复杂度 O(n^2)
// 空间复杂度 O(1)

/**
 * 冒泡排序
 * @param {*} arr
 */
function bobbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (arr[i] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}
