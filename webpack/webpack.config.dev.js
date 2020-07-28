const path = require('path');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { DefinePlugin, ProvidePlugin } = require('webpack');

// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
/* ================== 插件 ================= */

// 全局常量定义
const definePlugin = new DefinePlugin(config.globalConsts.development);

// 自动加载
const providePlugin = new ProvidePlugin(config.providePlugin);

// 关联 html
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html'),
});

// 直接拷贝文件进行打包
const copyWebpackPlugin = new CopyWebpackPlugin(
  [{ from: path.resolve(__dirname, '../public') }]
);

// 将样式文件单独拆分为独立的文件
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'style/[name].[hash].css',
  chunkFilename: 'style/[id].[hash].css',
});

// 打包监测
// const bundleAnalyzerPlugin = new WebpackBundleAnalyzer
// .BundleAnalyzerPlugin();

const cssRegex = /\.(css|scss)$/;
const cssModuleRegex = /\.module\.(css|scss)$/;

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map', // 移除控制台的部分警告
  entry: path.resolve(__dirname, '../src/index.js'),

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].[hash].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        sideEffects: true,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: true },
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
            options: { hmr: true },
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
        test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/[hash].[ext]',
          },
        }],
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
  ],

  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
    alias: config.alias || {},
  },

  devServer: {
    // 该选项配置  output.publicPath: '/' 解决: BrowserRouter 路由刷新时找不到页面 BUG
    historyApiFallback: true,
  },
};
