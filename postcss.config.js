/* postcss.config.js */
const purgecss = require('@fullhuman/postcss-purgecss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    pxtorem({
      propList: ['*'],
    }),
    cssnano
  ],
};





