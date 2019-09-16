const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const DefinePlugin = webpack.DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
/* ================== 插件 ================= */

// 全局常量定义
const definePlugin = new DefinePlugin(config.globalConsts.production);

// 关联 html
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html')
});

// css 分离
const extractTextWebpackPlugin = new ExtractTextWebpackPlugin('style/[hash].style.css');

// 直接拷贝文件进行打包
const copyWebpackPlugin = new CopyWebpackPlugin(
  [{ from: path.resolve(__dirname, '../public') }]
);

// 打包监测
// const bundleAnalyzerPlugin = new WebpackBundleAnalyzer.BundleAnalyzerPlugin();

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
      maxInitialRequests: 10,
      cacheGroups: {
        react: {
          chunks: 'all',
          name: 'react',
          test: /[\\/]node_modules[\\/](react.*|mobx.*)[\\/]/,
        },
        lodash: {
          chunks: 'all',
          name: 'lodash',
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
        },
        moment: {
          chunks: 'all',
          name: 'moment',
          test: /[\\/]node_modules[\\/]moment[\\/]/,
        },
        antDesign: {
          chunks: 'all',
          name: 'antDesign',
          test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
        },
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        sideEffects: true,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: cssModuleRegex,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
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
    copyWebpackPlugin,
    htmlWebpackPlugin,
    // bundleAnalyzerPlugin,
    extractTextWebpackPlugin,
  ],

  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
    alias: config.alias || {},
  },

  devServer: {
    historyApiFallback: true,
  }
}
