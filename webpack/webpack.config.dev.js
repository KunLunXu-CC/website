const path = require('path');
const config = require('./config');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
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

// 拷贝 public 内除 index.html 的所以文件
const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [{
    from: path.resolve(__dirname, '../public'),
    globOptions: { ignore: ['**/index.html'] },
  }],
});

// 将样式文件单独拆分为独立的文件
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'style/[name].[hash].css',
  chunkFilename: 'style/[id].[hash].css',
});

// monaco-editor 插件
const monacoWebpackPlugin = new MonacoWebpackPlugin({
  languages: ['javascript'],
});

// Eslint
const eslintPlugin = new ESLintPlugin();

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
    eslintPlugin,
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

  devServer: {
    // webpack-dev-server 相关配置
    static: {
      directory: path.join(__dirname, '../build'),
    },
    compress: true,
    port: 9000,

    hot: true,

    // 该选项配置  output.publicPath: '/' 解决: BrowserRouter 路由刷新时找不到页面 BUG
    historyApiFallback: true,
  },
};
