// 原理
// 从左往右，相邻元素进行比较，如果前一个元素大小后一个元素，则交换
// 这样全部遍历完成，最大的数会在最右边冒泡出来
// 时间复杂度： 最好时间复杂度 O(n)，平均时间复杂度 O(n^2)
// 空间复杂度 O(1)
// 在相邻元素相等时，它们并不会交换位置，所以，冒泡排序是稳定排序。
// 冒泡排序思路简单，代码也简单，特别适合小数据的排序。但是，由于算法复杂度较高，在数据量大的时候不适合使用。
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
