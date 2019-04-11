import '../styles/app.scss'

import './slide'
import './map'
import './send'
import './mask'
import './share'

export class App {
  constructor () {
    console.log(
      '\n%c     ',
      `font-size: 30px; background: url(${
        window.location.origin
      }/images/brz.svg) no-repeat;`
    )
    console.log(
      '%cWe love to inspect codes too \ud83d\udc40\ud83d\ude42',
      'font-size: 16px; color: #a7bf34'
    )
  }
}

document.addEventListener('DOMContentLoaded', e => new App())
