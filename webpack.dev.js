const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'src',
    clientLogLevel: 'error',
    watchContentBase: true,
    open: true,
    hot: true,
    port: process.env.PORT || 9000,
    host: process.env.HOST || 'localhost'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
