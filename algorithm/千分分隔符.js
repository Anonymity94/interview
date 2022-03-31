function numFormat(num) {
  return num.toString().replace(/\d+/, function (n) {
    // 提取整数部分
    console.log('n', n);
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1, $2, $3) {
      console.log('$1', $1);
      console.log('$2', $2);
      console.log('$2', $3);
      return $1 + ',';
    });
  });
}

var a = 1234567894532;
var b = 673439.4542;
console.log(numFormat(a)); // "1,234,567,894,532"
console.log(numFormat(b)); // "673,439.4542"
