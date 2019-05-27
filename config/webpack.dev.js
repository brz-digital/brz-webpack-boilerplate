const path = require('path')

const webpack = require('webpack')
const merge = require('webpack-merge')
const settings = require('./settings')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: path.join(settings.root, settings.paths.src),
    clientLogLevel: 'error',
    watchContentBase: true,
    hot: true,
    open: true,
    port: settings.port,
    host: settings.devHost
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
