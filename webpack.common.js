const glob = require('glob');
const path = require('path');
const settings = require('./settings.json');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const pages = () => glob.sync('./src/**/*.html').map(
  dir => new HTMLWebpackPlugin({
    template: dir,
    filename: path.basename(dir),
  }),
);

module.exports = {
  entry: {
    './scripts/vendors.js': Object.values(settings.dependencies),
    './scripts/scripts.js': ['@babel/polyfill', './src/scripts/app.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        }]
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }]
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/static/',
        to: './',
      },
    ]),
    ...pages(),
  ],
  stats: {
    colors: true,
  },
}
