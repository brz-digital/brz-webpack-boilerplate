const glob = require('glob');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const pages = () => glob.sync('./src/*.html').map(
  dir => new HTMLWebpackPlugin({
    template: dir,
    filename: path.basename(dir),
  }),
);

module.exports = {
  entry: [
    '@babel/polyfill',
    script: './src/scripts/app.js',
    style: './src/styles/app.scss',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
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
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/static/',
        to: './static/',
      },
    ]),
    ...pages(),
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
}
