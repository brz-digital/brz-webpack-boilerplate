const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const pages = () => glob.sync('./src/**/*.html').map(
  dir => new HTMLWebpackPlugin({
    template: dir,
    filename: path.basename(dir)
  }),
);

module.exports = {
  entry: {
    './scripts/app' : ['@babel/polyfill', './src/scripts/vendors.js', './src/scripts/app.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  stats: {
    colors: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: './scripts/vendors',
          priority: 10,
          enforce: true
        }
      }
    }
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
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        },{
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      axios: 'axios'
    }),
    new CopyWebpackPlugin([
      {
        from: './src/static/',
        to: './',
      },
    ]),
    ...pages(),
  ],
}
