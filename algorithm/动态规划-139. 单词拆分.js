/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  // 由于 dp[0] 是初始化状态，所以 dp 数组长度为 1 + s.length
  const dp = new Array(s.length + 1).fill(false);
  // dp[i] 的含义为：包含下标为i及之前的字符串均可以通过字典拼接出来
  dp[0] = true;

  // 遍历外层
  for (let i = 0; i <= s.length; i++) {
    // 遍历字典
    for (let j = 0; j < wordDict.length; j++) {
      // 当前对比的字典单词
      const dict = wordDict[j];
      // 如果截取的字符 >= 字典单词的长度再进行比对
      if (i >= dict.length) {
        // 下标为i开始，往前推每个字典单词的长度，截取单词
        const work = s.slice(i - dict.length, i);
        // 如果截取的单词匹配成功 && 之前的单词也匹配成功
        if (work === dict && dp[i - dict.length] === true) {
          dp[i] = true;
        }
      }
    }
  }

  console.log(dp);

  // 最后一个单词的满足状态为 dp[s.length]
  return dp[s.length];
};
