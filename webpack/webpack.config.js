const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const DefinePlugin = webpack.DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
/* ================== 插件 ================= */

// 全局常量定义
const definePlugin = new DefinePlugin(config.globalConsts.production)

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
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       reactBase: {
  //         name: 'react',
  //         test: (module) => {
  //           return /react|redux|prop-types|lodash/.test(module.context);
  //         },
  //         chunks: 'initial',
  //         priority: 10,
  //       },
  //     }
  //   }
  // },
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
    htmlWebpackPlugin,
    extractTextWebpackPlugin,
    copyWebpackPlugin,
  ],

  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
    alias: config.alias || {},
  },

  devServer: {
    historyApiFallback: true,
  }
}
