/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let list = s.split(' ');

  for (let i = 0; i < list.length; i++) {
    const w = list[i];
    list[i] = reverse(w);
  }

  return list.join(' ');
};

var reverse = function (word) {
  let arr = word.split('');
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let temp = arr[left];
    arr[left++] = arr[right];
    arr[right--] = temp;
  }
  return arr.join('');
};

const s = "Let's take LeetCode contest";
console.log(reverseWords(s));
