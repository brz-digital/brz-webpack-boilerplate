const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: 'src',
    clientLogLevel: 'error',
    watchContentBase: true,
    open: true,
    hot: true,
    port: process.env.PORT || 9000,
    host: process.env.HOST || 'localhost',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
})
