const loaderUtils = require('loader-utils');

module.exports = function (source) {
  console.log('replace-loader running...');
  // 获取 config 中的配置项
  const options = this.getOptions();
  console.log(options);
  console.log('source', source);
  console.log('this.data', this.data);

  const result = source.replace(/world/, '世界');
  console.log('replace-loader running finished');
  return result;
};

/**
 *
 * @param {*} remainingRequest 剩下的 loader
 * @param {*} precedingRequest 之前的 loader
 * @param {*} data 共享数据
 * @returns
 */
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  console.log('replace-loader is working');
  data.value = 'test';
};
