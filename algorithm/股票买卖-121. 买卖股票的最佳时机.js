/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  var minPrice = prices[0];
  var result = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      // 记录最小值
      minPrice = prices[i];
    } else {
      // 当前价格 - 最小值，计算盈利情况
      result = Math.max(result, prices[i] - minPrice);
    }
  }

  return result;
};
