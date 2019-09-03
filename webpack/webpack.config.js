const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const DefinePlugin = webpack.DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
/* ================== 插件 ================= */

// 全局常量定义
const definePlugin = new DefinePlugin(config.globalConsts.development)

// 关联 html
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html')
});
// 热模块替换
const hotModuleReplacementPlugin = new HotModuleReplacementPlugin();
// css 分离
const extractTextWebpackPlugin = new ExtractTextWebpackPlugin('style.css');
// 直接拷贝文件进行打包
const copyWebpackPlugin = new CopyWebpackPlugin(
  [{ from: path.resolve(__dirname, '../public') }]
);

/**
 * 入口
 */
const entry = path.resolve(__dirname, '../src/index.js');

/**
 * 输出
 */
const output = {
  // 记得设置否则 history 模式下二级路由 xxx/xxx 可能会报错
  publicPath: '/',
  path: path.resolve(__dirname, '../build'),
  filename: 'bundle.js',
};

// css 匹配规则
const cssRegex = /\.(css|scss)$/;
const cssModuleRegex = /\.module\.(css|scss)$/;

module.exports = {
  entry,
  output,
  mode: 'production',
  module: {
    // 用于配置哪些模块文件的内容不需要进行解析
    // noParse: /jquery|lodash/,
    // 规则
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: [ path.resolve(__dirname, 'node_modules') ],
        // include: [ path.resolve(__dirname, 'src'), path.resolve(__dirname, 'public') ],
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
            limit: 10000
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
    hotModuleReplacementPlugin,
    extractTextWebpackPlugin,
    copyWebpackPlugin,
  ],

  // 解析模块
  resolve: {
    // 自动解析确定的扩展
    extensions: ['.mjs', '.js', '.jsx'],
    // 自定义路径别名 来确保模块引入变得更简单(其实就在解析路径时如果存在对应 key 使用相应的值进行替换)
    alias: config.alias || {},
  },

  devServer: {
    historyApiFallback: true,
    hot: true
  }
}
