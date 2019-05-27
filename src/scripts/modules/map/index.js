import loadGoogleMapsApi from 'load-google-maps-api'
import googleMaps from './googleMaps'
import styles from './style'
import settings from '../../../../config/settings'

class Map {
  constructor () {
    loadGoogleMapsApi({
      key: settings.googleMapsKey
    })
      .then(google => {
        googleMaps(document.querySelectorAll('.js-google-map'), {
          style: styles
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export const map = new Map()
