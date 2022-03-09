const fs = require('fs');
const loaderUtils = require('loader-utils');

module.exports = function (source) {
  console.log('path-replace-loader running...');
  if (this.cacheable) {
    this.cacheable();
  }
  const callback = this.async();
  const options = this.getOptions();

  console.log('resourcePath', this.resourcePath);
  console.log('options', options);
  console.log('path-replace-loader running finished');

  // 替换文件
  if (this.resourcePath.indexOf(options.path) > -1) {
    const newPath = this.resourcePath.replace(
      options.path,
      options.replacePath
    );

    fs.readFile(newPath, (err, data) => {
      if (err) {
        // 文件不存在时，使用原始文件
        if (err === 'ENOENT') {
          return callback(null, source);
        }
        return callback(err);
      }
      // 添加到新的构建依赖中
      this.addDependency(newPath);
      callback(null, data);
    });
  } else {
    callback(null, source);
  }
};
