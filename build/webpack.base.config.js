const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              'useBuiltIns': 'entry'
            }]
          ],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([{
      from: 'static',
      to: 'static'
    },])
  ],
  stats: {
    children: false
  },
  //设置本地服务(webpack-dev-server将读取devServer设置)
  //webpack-dev-server会在内存中进行项目打包
  devServer: {
    // contentBase: './build', // 本地服务内容来源
    port: 3333, // 设置端口
    open: true, // 运行项目时自动打开浏览器，或者在package,json中配置脚本'webpack-dev-server --open'
    hot: true, // 是否开启热重载
    // hotOnly: true, // 即便html不生效时，不自动刷新浏览器
    // overlay: true // 在浏览器输出编译情况
  }
}
