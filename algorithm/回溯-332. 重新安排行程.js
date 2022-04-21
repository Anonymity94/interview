/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
  const result = ['JFK'];

  // 汇总出发地和目的地
  const map = {};
  tickets.forEach(([from, to]) => {
    if (!map[from]) {
      map[from] = [];
    }
    map[from].push(to);
  });

  // 根据字典进行排序
  for (const city in map) {
    map[city].sort();
  }

  const backtrack = function () {
    console.log(map);
    // 已经收集了所有的机场
    // 路径比节点数少1
    // a -> b -> c -> d
    if (result.length === tickets.length + 1) {
      return true;
    }
    // 当前到达城市可到达的机场列表
    const curCity = result.at(-1);
    const toCityList = map[curCity] || [];
    // 如果到达的城市没有航班目的地，停止
    if (toCityList.length === 0) {
      return false;
    }

    // 从当前到达的城市前往的目的地进行选择下一个
    for (let i = 0; i < toCityList.length; i++) {
      const nextCity = toCityList[i];
      // 开始回溯
      // 删除走过的路线
      toCityList.splice(i, 1);
      result.push(nextCity);

      // 已经收集完成，跳出
      if (backtrack()) {
        return true;
      }
      // 撤销
      toCityList.splice(i, 0, nextCity);
      result.pop();
    }
  };

  backtrack();

  return result;
};
