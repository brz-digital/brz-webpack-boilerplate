const glob = require('glob');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const pages = () => glob.sync('./src/**/*.html').map(
  dir => new HTMLWebpackPlugin({
    template: dir,
    filename: path.basename(dir),
  }),
);

module.exports = {
  entry: {
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
        use: [{ loader: 'raw-loader' }],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
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
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: './styles/app.css',
      chunkFilename: '[id].css'
    }),
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
}
