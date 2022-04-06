/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  const list = s.split('');
  const n = list.length - 1;
  // 每次步长为2k
  for (let i = 0; i <= n; i += 2 * k) {
    // 如果剩余字符少于 k 个，则将剩余字符全部反转
    const rest = n - i;
    if (rest < k) {
      reverse(list, i, n);
    } else {
      // 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样
      reverse(list, i, i + k - 1);
    }
  }

  return list.join('');
};

var reverse = function (arr, start, end) {
  let left = start;
  let right = end;
  while (left < right) {
    let temp = arr[left];
    arr[left++] = arr[right];
    arr[right--] = temp;
  }

  return arr;
};
