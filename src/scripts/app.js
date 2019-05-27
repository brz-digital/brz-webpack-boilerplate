// Load jQuery from NPM
import $ from 'jquery'

import brz from '../images/brz.svg'

import './modules/slide'
import './modules/mask'
import './modules/share'
import './modules/map'
import Send from './modules/send'

window.jQuery = $
window.$ = $

export default class App {
  constructor () {
    console.log(
      '\n%c     ',
      `font-size: 30px; background: url(${
        window.location.origin
      }/${brz}) no-repeat;`
    )
    console.log(
      '%cWe love to inspect codes too \ud83d\udc40\ud83d\ude42',
      'font-size: 16px; color: #a7bf34'
    )

    Send(document.querySelectorAll('.js-send'))
  }
}

document.addEventListener('DOMContentLoaded', () => new App())
