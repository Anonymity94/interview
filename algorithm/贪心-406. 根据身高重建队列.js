/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  const result = [];
  // 排序
  people.sort((a, b) => {
    if (a[0] === b[0]) {
      // 身高相同，k 正序
      return a[1] - b[1];
    }
    return b[0] - a[0];
  });

  for (let i = 0; i < people.length; i++) {
    // 插入的位置
    const pos = people[i][1];
    // 按照顺序插入
    result.splice(pos, 0, people[i]);
  }

  return result;
};

// https://programmercarl.com/0406.%E6%A0%B9%E6%8D%AE%E8%BA%AB%E9%AB%98%E9%87%8D%E5%BB%BA%E9%98%9F%E5%88%97.html#%E6%80%9D%E8%B7%AF