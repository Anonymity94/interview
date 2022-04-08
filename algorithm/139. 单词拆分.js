// 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。

// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/word-break
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

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
