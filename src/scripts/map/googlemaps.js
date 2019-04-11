import extend from "../helpers/extend";
import boolParse from "../helpers/bool";
import api from "../api";

const googleMaps = (elements, options) => {
  return elements.forEach(el => {
    el.classList.add("map");

    let params = {
      api: el.dataset.api || null,
      zoom: parseInt(el.dataset.zoom) || 21,
      zoomControl: el.hasAttribute("data-zoom-control") ? boolParse(slide.dataset.zoomControl) : false,
      scroll: el.hasAttribute("data-scroll") ? boolParse(slide.dataset.onlyMobile) : false,
      lat: el.dataset.lat || null,
      lng: el.dataset.lng || null,
      title: el.dataset.title || null,
      address: el.dataset.address || null,
      image: el.dataset.image || null,
      icon: el.dataset.icon || null,
      defaultPosition: el.dataset.defaultPosition || "-7.108270,-34.830408"
    };

    let defaultPosition = params.defaultPosition.split(",");

    let settings = extend(
      {
        fullscreenControl: false,
        scaleControl: false,
        streetViewControl: false,
        scrollwheel: params.scroll,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        mapTypeControl: false,
        center: new google.maps.LatLng(defaultPosition[0], defaultPosition[1]),
        zoom: params.zoom,
        zoomControl: params.zoomControl,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      },
      options
    );

    let map = new google.maps.Map(el, settings);
    let bounds = new google.maps.LatLngBounds();
    let openCard = [];

    if (params.api === null) {
      if (params.lat !== null && params.lng !== null) {
        let location = normalizeData(params);
        pushToMap(map, bounds, params, location, openCard);
      }
    } else {
      fetchLocations(params.api, map, bounds, params, openCard);
    }
  });
};

const normalizeData = data => {
  return {
    title: data.title || null,
    address: data.address || null,
    lat: data.lat || null,
    lng: data.lng || null,
    image: data.image || null,
    icon: data.icon || null
  };
};

const fetchLocations = async (endpoint, map, bounds, params, openCard) => {
  try {
    const response = await api.get(endpoint);

    response.data.locations.forEach(data => {
      let location = normalizeData(data);
      pushToMap(map, bounds, params, location, openCard);
    });
  } catch (err) {
    console.error("Error on loading locations.");
  }
};

const pushToMap = (map, bounds, params, location, openCard) => {
  let data = {};
  let icon = location.icon;

  if (icon === null) {
    icon = params.icon;
  }

  if (icon !== null) {
    data["icon"] = new google.maps.Marker({
      url: icon,
      size: new google.maps.Size(32, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    });
  }

  data["position"] = new google.maps.LatLng(location.lat, location.lng);
  data["content"] = createCard(location);

  let markerSettings = extend(
    {
      map: map
    },
    data
  );

  let marker = new google.maps.Marker(markerSettings);

  bounds.extend(data["position"]);
  map.panToBounds(bounds);

  handleOnClick(map, bounds, marker, data["content"], openCard);
};

const createCard = location => {
  let card = document.createElement("div");
  card.setAttribute("class", "map-card");

  if (location.image !== null) {
    card.classList.add("-with-image");
    let figure = document.createElement("div");
    figure.setAttribute("class", "map-figure");

    let image = document.createElement("div");
    image.setAttribute("class", "map-image bg-cover");
    image.style.backgroundImage = `url(${location.image})`;

    figure.appendChild(image);
    card.appendChild(figure);
  }

  let caption = document.createElement("div");
  caption.setAttribute("class", "map-caption");

  if (location.title) {
    let title = document.createElement("h4");
    title.setAttribute("class", "map-title");
    title.appendChild(document.createTextNode(location.title));
    caption.appendChild(title);
  }

  if (location.address) {
    let address = document.createElement("p");
    address.setAttribute("class", "map-address");
    address.appendChild(document.createTextNode(location.address));
    caption.appendChild(address);
  }

  card.appendChild(caption);

  return card;
};

const handleOnClick = (map, bounds, marker, data, openCard) => {
  let infoWindow = new google.maps.InfoWindow({
    content: data
  });

  marker.addListener("click", () => {
    if (openCard[0]) {
      openCard[0].close();
      openCard.pop();
    }

    infoWindow.open(map, marker);
    openCard.push(infoWindow);
    // map.panToBounds(bounds);
  });
};

export default googleMaps;
