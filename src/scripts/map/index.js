import loadGoogleMapsApi from 'load-google-maps-api'
import googleMaps from './googleMaps'
import styles from './googleMapsStyle'

class Map {
  constructor () {
    loadGoogleMapsApi({
      key: 'PUT-YOR-KEY'
    })
      .then(function (google) {
        new googleMaps(document.querySelectorAll('.js-google-map'), {
          style: styles
        })
      })
      .catch(function (err) {
        console.error(err)
      })
  }
}

export let map = new Map()
