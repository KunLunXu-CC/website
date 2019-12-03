const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const DefinePlugin = webpack.DefinePlugin;
const ProvidePlugin = webpack.ProvidePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
/* ================== 插件 ================= */

// 全局常量定义
const definePlugin = new DefinePlugin(config.globalConsts.development);

// 自动加载
const providePlugin = new ProvidePlugin(config.providePlugin);

// 关联 html
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html')
});

// 直接拷贝文件进行打包
const copyWebpackPlugin = new CopyWebpackPlugin(
  [{ from: path.resolve(__dirname, '../public') }]
);

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename:'style/[name].[hash].css',
  chunkFilename: 'style/[id].[hash].css',
});

// 打包监测
// const bundleAnalyzerPlugin = new WebpackBundleAnalyzer.BundleAnalyzerPlugin();

const cssRegex = /\.(css|scss)$/;
const cssModuleRegex = /\.module\.(css|scss)$/;

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].[hash].bundle.js',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        exclude: [
          path.resolve(__dirname, '../src/assets/font'),
        ],

        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        sideEffects: true,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: cssModuleRegex,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash:base64]'
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/[hash].[ext]'
          }
        }]
      },
      {
        test: /\.(text|md)$/,
        use: 'raw-loader',
      },
    ]
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
    historyApiFallback: true,
    hot: true
  }
}
