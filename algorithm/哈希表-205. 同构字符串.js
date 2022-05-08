/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  const sMap = new Map();
  const tMap = new Map();

  for (let i = 0, j = 0; i < s.length; i++, j++) {
    // s[i] > t[i]
    if (!sMap.has(s[i])) {
      sMap.set(s[i], t[j]);
    }

    // t[j] > s[j]
    if (!tMap.has(t[j])) {
      tMap.set(t[j], s[i]);
    }
    // 比较2个映射是否对齐
    if (sMap.get(s[i]) !== t[j] || tMap.get(t[j]) !== s[i]) {
      return false;
    }
  }

  return true;
};
