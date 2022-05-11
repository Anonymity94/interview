/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const map = {};
  for (let i = 0; i < magazine.length; i++) {
    const w = magazine[i];
    map[w] = (map[w] || 0) + 1;
  }

  for (let i = 0; i < ransomNote.length; i++) {
    const w = ransomNote[i];
    if (!map[w]) {
      return false;
    }
    map[w]--;
  }

  return true;
};
