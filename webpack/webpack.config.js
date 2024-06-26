/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const { DefinePlugin, ProvidePlugin } = require('webpack');

// 全局常量定义
const definePlugin = new DefinePlugin(config.globalConstants.production);

// 自动加载
const providePlugin = new ProvidePlugin(config.providePlugin);

// 关联 html
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html'),
});

// 拷贝 public 内除 index.html 的所以文件
const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [{
    from: path.resolve(__dirname, '../public'),
    globOptions: { ignore: ['**/index.html'] },
  }],
});

// monaco-editor 插件
const monacoWebpackPlugin = new MonacoWebpackPlugin({
  languages: ['javascript'],
});

// 将样式文件单独拆分为独立的文件
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'style/[name].[hash].css',
  chunkFilename: 'style/[id].[hash].css',
});

const cssRegex = /\.(css|scss)$/;
const cssModuleRegex = /\.module\.(css|scss)$/;

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.js'),

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].[hash].bundle.js',
  },

  optimization: {
    splitChunks: {
      maxSize: 30000,
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|mjs|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        sideEffects: true,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: cssModuleRegex,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        // 图片、字体
        test: [/\.(png|jpg|gif|svg)$/, /\.(ttf|woff|eot)$/],
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash].[ext]',
        },
      },
      {
        test: /\.(text|md)$/,
        use: 'raw-loader',
      },
    ],
  },

  plugins: [
    definePlugin,
    providePlugin,
    copyWebpackPlugin,
    htmlWebpackPlugin,
    // bundleAnalyzerPlugin,
    miniCssExtractPlugin,
    monacoWebpackPlugin,
  ],

  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
    alias: config.alias || {},
  },
};
