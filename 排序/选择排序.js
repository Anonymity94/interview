var selectionSort = function (nums) {
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    // 最小值的下标
    let min = i;

    // 找到 i 之后的最小值
    for (let j = i + 1; j < n; j++) {
      if (nums[j] < nums[min]) {
        min = j;
      }
    }

    // 交换位置
    if (i !== min) {
      const temp = nums[i];
      nums[i] = nums[min];
      nums[min] = temp;
    }
  }

  return nums;
};
