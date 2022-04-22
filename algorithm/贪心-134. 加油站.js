/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  const gasSum = gas.reduce((sum, cur) => (sum += cur), 0);
  const costSum = cost.reduce((sum, cur) => (sum += cur), 0);
  // 如果总油量 < 总消耗量，无解
  if (gasSum < costSum) {
    return -1;
  }

  // 出发站点
  let start = 0;
  // 实际剩余油量
  let restSum = 0;
  for (let i = 0; i < gas.length; i++) {
    const rest = gas[i] - cost[i];
    restSum += rest;
    // 说明无法到达下一个加油站，路上就没油了
    if (restSum < 0) {
      start = i + 1;
      restSum = 0;
    }
  }

  return start;
};
