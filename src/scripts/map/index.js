import loadGoogleMapsApi from "load-google-maps-api";
import googleMaps from "./googleMaps";
import styles from "./googleMapsStyle";

class Map {
  constructor() {
    loadGoogleMapsApi({
      key: "AIzaSyDoRN5VSDPYUXTNu1Lflg6Bmqd8GY2MJQ0"
    })
      .then(function(google) {
        new googleMaps(document.querySelectorAll(".js-google-map"), {
          style: styles
        });
      })
      .catch(function(err) {
        console.error(err);
      });
  }
}

export default Map;
