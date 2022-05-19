/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  const arr = s.split('');
  let left = 0;
  let right = arr.length - 1;
  const target = ['a', 'e', 'i', 'o', 'u'];
  while (left < right) {
    const leftOK = target.includes(arr[left].toLocaleLowerCase());
    const rightOk = target.includes(arr[right].toLocaleLowerCase());
    if (leftOK && rightOk) {
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    } else if (!leftOK) {
      left++;
    } else {
      right--;
    }
  }

  return arr.join('');
};
