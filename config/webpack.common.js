const path = require('path')
const glob = require('glob')

const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const settings = require('./settings')

const paths = []
const generateHTMLPlugins = () =>
  glob.sync('./src/**/*.html').map(dir => {
    const filename = path.basename(dir)

    paths.push(filename)

    return new HTMLWebpackPlugin({
      filename,
      template: path.join(settings.root, settings.paths.src, filename),
      minify: false
    })
  })

module.exports = {
  context: path.join(settings.root, settings.paths.src),
  entry: {
    app: [
      '@babel/polyfill',
      path.join(settings.root, settings.paths.src, 'scripts/vendors.js'),
      path.join(settings.root, settings.paths.src, 'scripts/app.js'),
      path.join(settings.root, settings.paths.src, 'styles/app.scss')
    ]
  },
  output: {
    path: path.join(settings.root, settings.paths.dist),
    filename: path.join('scripts', '[name].js')
  },
  stats: {
    colors: true
  },
  module: {
    rules: [
      // JavaScript Loaders
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },

      // HTML Loaders
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },

      // Image Loaders
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        include: [path.join(settings.root, settings.paths.src, 'images')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              outputPath: 'images/'
            }
          }
        ]
      },

      // Fonts Loaders
      {
        test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
        include: [path.join(settings.root, settings.paths.src, 'fonts')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new StyleLintPlugin(),
    new MiniCssExtractPlugin({
      filename: path.join('styles', 'app.min.css')
    }),
    new WebpackBar({
      color: '#ff6469'
    }),
    ...generateHTMLPlugins()
  ]
}
