const trim = function (str) {
  // 先去掉开头的空格
  // \s 匹配任何空白字符，包括空格、制表符、换页符等等。
  // 等价于 [ \f\n\r\t\v]。注意 Unicode 正则表达式会匹配全角空格符。
  str = str.replace(/^\s+/, '');
  for (let i = str.length - 1; i >= 0; i--) {
    // \s 匹配任何非空白字符
    if (/\S/.test(str.charAt(i))) {
      // 提取2个指定下标之间的字符，
      // [) 左闭右开，不包含结束字符
      str = str.substring(0, i + 1);
      break;
    }
  }

  return str;
};

console.log(trim('   2323 43434   '));
