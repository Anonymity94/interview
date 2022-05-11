/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  if (strs.length === 1) {
    return [strs];
  }
  const map = {};
  for (let i = 0; i < strs.length; i++) {
    const item = strs[i];
    // 统一排序
    const sort = item.split('').sort().join('');
    if (map.hasOwnProperty(sort)) {
      map[sort].push(item);
    } else {
      map[sort] = [item];
    }
  }

  return Object.values(map);
};
