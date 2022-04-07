/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
  const list1 = version1.split('.');
  const list2 = version2.split('.');

  // 比较
  let index = 0;
  while (index < list1.length || index < list2.length) {
    // list1 当前的值
    let x = 0;
    // list2 当前的值
    let y = 0;

    if (index < list1.length) {
      x = parseInt(list1[index]);
    }
    if (index < list2.length) {
      y = parseInt(list2[index]);
    }

    // 比较值的大小
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }

    index++;
  }

  return 0;
};
