const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true,
      })
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      test: /\.(css|js)(\?.*)?$/i
    }),
    new FaviconsWebpackPlugin({
      logo: './src/static/images/favicon.svg',
      prefix: './favicons/',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
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
      pngquant: ({
        quality: '75'
      }),
      plugins: [imageminMozjpeg({
        quality: '75'
      })]
    })
  ],
})
