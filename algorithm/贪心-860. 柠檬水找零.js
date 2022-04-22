/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  let five = 0;
  let ten = 0;
  let twenty = 0;
  for (let i = 0; i < bills.length; i++) {
    const item = bills[i];
    // 碰到5
    if (item === 5) {
      five++;
    }
    if (item === 10) {
      if (five <= 0) {
        return false;
      }
      ten++;
      five--;
    }
    if (item === 20) {
      // 先消耗10
      if (ten > 0 && five > 0) {
        twenty++;
        five--;
        ten--;
      } else if (five >= 3) {
        // 再消耗3个5块的
        twenty++;
        five -= 3;
      } else {
        return false;
      }
    }
  }

  return true;
};
