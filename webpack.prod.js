const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const TerserPlugin = require('terser-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const CompressionPlugin = require('compression-webpack-plugin')

const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: false,
        extractComments: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlBeautifyPlugin({
      config: {
        html: {
          indent_size: 2
        }
      }
    }),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: './styles/app.css',
      chunkFilename: '[id].css'
    }),
    new CompressionPlugin({
      test: /\.(css|js)(\?.*)?$/i
    }),
    new FaviconsWebpackPlugin({
      logo: './src/static/images/favicon.svg',
      prefix: './favicons/',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: true
      }
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      gifsicle: {
        optimizationLevel: 9
      },
      pngquant: {
        quality: '75'
      },
      plugins: [
        imageminMozjpeg({
          quality: '75'
        })
      ]
    })
  ]
})
