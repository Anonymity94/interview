const path = require('path');
const { FileListPlugin } = require('./plugins/file-list-plugin');

const config = {
  entry: './src/index.js',
  // 手动配置 loader 路径
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders'), 'node_modules'],
  },
  devtool: 'eval-cheap-module-source-map',
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
  plugins: [
    new FileListPlugin({
      outputFile: 'my-assets.md',
    }),
  ],
  output: {
    filename: '[name]-[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};

module.exports = (env, argv) => {
  return config;
};
