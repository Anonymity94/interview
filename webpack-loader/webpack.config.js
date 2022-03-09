const path = require('path');

const config = {
  entry: './src/index.js',
  // 手动配置 loader 路径
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'replace-loader',
            options: {
              name: 'ssss',
            },
          },
          {
            loader: 'path-replace-loader',
            options: {
              path: 'origin.js',
              replacePath: 'origin-replace.js',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name]-[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};

module.exports = (env, argv) => {
  return config;
};
