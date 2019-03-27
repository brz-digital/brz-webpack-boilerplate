import extend from './helpers/extend';
import boolParse from '../helpers/bool';

const normalizeData = data => {
  return {
    title:   data.title,
    address: data.address,
    lat:     data.lat,
    lng:     data.lng,
    image:   data.image
  };
}

const googleMaps = (elements, options) => {
  return elements.forEach(el => {
    let params = {
      api:               el.dataset.api                 ||   null,
      zoom:              el.dataset.zoom                ||   21,
      scroll:            boolParse(el.dataset.scroll)   ||   false,
      lat:               el.dataset.lat                 ||   null,
      lng:               el.dataset.lng                 ||   null,
      title:             el.dataset.title               ||   null,
      address:           el.dataset.address             ||   null,
      image:             el.dataset.image               ||   null,
      icon:              el.dataset.icon                ||   null,
      defaultPosition:   el.dataset.defaultPosition     ||   '-7.108270,-34.830408',
    };

    let defaultPosition = params.defaultPosition.split(',');

    let settings = extend({
      scaleControl: false,
      streetViewControl: false,
      scrollwheel: params.scroll,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      panControl: false,
      mapTypeControl: false,
      center: new google.maps.LatLng(defaultPosition[0], defaultPosition[1]),
      zoom: params.zoom,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
    }, options);


    let map = new google.maps.Map(el, settings);
    let markerInfo = {};
    let caption    = null;
    let openCard   = [];

    if (params.api === null) {
      caption = normalizeData(params);
    } else {

    }
  });
};

export default googleMaps;



    // // If not exists api endpoint
    // if(typeof params.api === 'undefined') {
    //   caption = normalizeData(params);

    //   // Set marker in map
    //   pushToMap(map, params, caption);
    // } else {
    //   $.getJSON(params.api, function(resp) {
    //     $.each(resp.data, function (index, result) {
    //       caption = normalizeData(result);

    //       // Set marker in map
    //       pushToMap(map, params, caption);
    //     });
    //   });
    // }

    // function pushToMap(map, params, caption) {
    //   if(typeof params.marker !== 'undefined') {
    //     markerInfo['icon'] = new google.maps.MarkerImage(
    //       params.marker,
    //       null,
    //       null,
    //       null,
    //       new google.maps.Size(32, 32)
    //     );
    //   }

    //   markerInfo['position'] = new google.maps.LatLng(caption.lat, caption.lng);
    //   markerInfo['content'] = setCard(caption);

    //   var markerSettings = $.extend({
    //     map: map
    //   }, markerInfo);

    //   var marker = new google.maps.Marker(markerSettings);

    //   markerClick(marker, markerInfo['content']);
    // }

    // function markerClick(marker, content) {
    //   var infoCard = new google.maps.InfoWindow({
    //     content: content
    //   });

    //   google.maps.event.addListener(marker, 'click', function() {
    //     if (typeof openCard[0] !== 'undefined')
    //       openCard[0].close();
    //       openCard.pop();

    //       infoCard.open(map, marker);
    //       openCard.push(infoCard);
    //   });
    // }

    // function setCard(data) {
    //   var card;

    //   if(data.image !== null) {
    //     card = '<div class="map-card -with-image"><div class="map-figure"><div class="map-image bg-cover" style="background-image: url('+ caption.image +')"></div>';
    //   } else {
    //     card = '<div class="map-card">';
    //   }

    //   card += '<div class="map-caption"><span class="map-title">' + data.title + '</span><span class="map-address">' + data.address + '</span></div></div>';

    //   return card;
    // }

