const path = require('path')

let ROOT = process.env.PWD

if (!ROOT) {
  ROOT = process.cwd()
}

const settings = {
  appName: 'BRZ Boilerplate',
  favicon: path.join(ROOT, '/src/images/favicon.svg'),
  googleMapsKey: 'YOUR KEY',
  devHost: 'localhost',
  port: process.env.PORT || 8000,
  env: process.env.NODE_ENV,
  root: ROOT,
  paths: {
    config: 'config',
    src: 'src',
    dist: 'dist'
  }
}

module.exports = settings
