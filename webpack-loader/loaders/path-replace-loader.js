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

  // �滻�ļ�
  if (this.resourcePath.indexOf(options.path) > -1) {
    const newPath = this.resourcePath.replace(
      options.path,
      options.replacePath
    );

    fs.readFile(newPath, (err, data) => {
      if (err) {
        // �ļ�������ʱ��ʹ��ԭʼ�ļ�
        if (err === 'ENOENT') {
          return callback(null, source);
        }
        return callback(err);
      }
      // ��ӵ��µĹ���������
      this.addDependency(newPath);
      callback(null, data);
    });
  } else {
    callback(null, source);
  }
};
