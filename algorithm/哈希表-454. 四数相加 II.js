function fourSumCount(nums1, nums2, nums3, nums4) {
  // {2数之和: 出现的次数}
  const obj = {};

  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      const n1 = nums1[i];
      const n2 = nums2[j];
      obj[n1 + n2] = (obj[n1 + n2] || 0) + 1;
    }
  }

  let count = 0;

  for (let i = 0; i < nums3.length; i++) {
    for (let j = 0; j < nums4.length; j++) {
      const n3 = nums3[i];
      const n4 = nums4[j];
      // 判断剩下的2个数的和是否出现在上述对象中
      let rest = 0 - (n3 + n4);
      // 从前2个数组的汇总对象中找次数
      if (obj.hasOwnProperty(rest)) {
        count += obj[rest];
      }
    }
  }

  return count;
}
