import '../styles/app.scss';

import Api from './api';
import Send from './send';
import Slide from './slide';

class App {
  constructor() {
    new Send();
    new Slide();

    document.addEventListener('DOMContentLoaded', function(event) {
      console.log('\n%c     ', `font-size: 30px; background: url(${window.location.origin}/images/brz.svg) no-repeat;`);
      console.log("%cWe love to inspect codes too \ud83d\udc40\ud83d\ude42", "font-size: 16px; color: #a7bf34");
    });
  }
}

new App();
