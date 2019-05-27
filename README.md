<img src="https://raw.githubusercontent.com/brz-digital/brz-webpack-boilerplate/develop/src/images/brz.png" width="80" height="60" />

> # BRZ Webpack Starter
>
> BRZ Starter is a boilerplate template for building static websites.

### For default, contains

- jquery
- bootstrap
- include media
- swiper
- imask
- axios
- sweetalert
- google maps module
- social share module

### Setup

- Clone the repo: `$ git clone git@github.com:brz-digital/brz-webpack-boilerplate.git`
- Install dependencies: `$ yarn`

### Running

`$ yarn start` to run webpack-dev-server

### Build

`$ yarn build` to build files, generate favicons, compress, optimize and copy all static files (html, images, videos, fonts) to dist

### How to installing frontend dependencies?

- We use yarn or npm to manage our frontend dependencies. For example, if you want to install jQuery, run `$ yarn add jquery`

### How to use send?

Add js-send in submit form button and add js-validate in all inputs need validation via backend, example returns.

- Failed

```

```

- Sucess

```

```

### How to use share?

### How to use mask?

- See all mask types in [/src/scripts/mask/index.js](https://github.com/brz-digital/brz-webpack-boilerplate/blob/develop/src/scripts/modules/mask/index.js)

### How to use swiper?

- See all features in [/src/scripts/slide/index.js](https://github.com/brz-digital/brz-webpack-boilerplate/blob/develop/src/scripts/modules/slide/index.js)

```
<div class="js-slide slide" data-autoplay="true">
  <div class="slide-wrapper">
    <div class="slide-item">
      <div style="background-color: blue; height: 300px;">Slide 1</div>
    </div>
    <div class="slide-item">
      <div style="background-color: red; height: 300px;">Slide 2</div>
    </div>
  </div>
  <div class="slide-pagination"></div>
  <div class="slide-prev"></div>
  <div class="slide-next"></div>
</div>
```

### How to use maps?

- See all features in [/src/scripts/map/googlemaps.js](https://github.com/brz-digital/brz-webpack-boilerplate/blob/develop/src/scripts/modules/map/googleMaps.js)
- To use it is necessary to generate a key in [google cloud console](https://console.cloud.google.com)

* For unique place

```
<div class="js-google-map" data-zoom="15" data-lat="-7.108270" data-lng="-34.830408" data-title="BRZ Digital" data-address="Av. Bananeiras, 381" data-icon="./images/brz.svg"></div>
```

- For multiple places

```
<div class="js-google-map" data-zoom="15" data-api="http://localhost:8000/locations.json" data-icon="./images/brz.svg"></div>
```
