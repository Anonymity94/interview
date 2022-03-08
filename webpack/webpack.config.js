const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              modules: true,
            },
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: './dist',
    hot: true,
  },
  output: {
    filename: '[name]-[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 构建加速，默认为 true
        // https://webpack.js.org/plugins/terser-webpack-plugin/#parallel
        parallel: true,
        // 不生成 License 文件
        // https://webpack.js.org/plugins/terser-webpack-plugin/#extractcomments
        extractComments: false,
      }),
    ],
  },
};

module.exports = (env, argv) => {
  // https://webpack.docschina.org/configuration/mode/#mode-production
  if (argv.mode === 'production') {
    config.output.publicPath = '/public';
  }
  return config;
};
