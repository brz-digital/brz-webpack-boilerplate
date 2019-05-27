/* eslint-disable */
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

const { prompt } = require('enquirer')
const skipSetup = process.env.SKIP_SETUP || false
const settings = require('./settings')

async function run() {
  clear()

  console.log(chalk.hex('#93C53F')(figlet.textSync('BRZ Boilerplate')))

  // Run setup
  try {
    const setup = await prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'Website name?',
        initial: 'BRZ Boilerplate'
      },
      {
        type: 'input',
        name: 'googleMapsKey',
        message: 'Set Google Maps Key:',
        initial: 'YOUR KEY'
      },
      {
        type: 'select',
        name: 'jquery',
        message: 'Would you like jQuery installed?',
        choices: ['Yes', 'No']
      }
    ])

    // Update site configuration
    fs.readFile('./config/settings.js', 'utf8', (err, data) => {
      if (typeof setup.appName !== 'undefined') {
        data = data.replace(/appName: '.*?'/g, `appName: '${setup.appName}'`)
      }

      if (typeof setup.googleMapsKey !== 'undefined') {
        data = data.replace(
          /googleMapsKey: '.*?'/g,
          `googleMapsKey: '${setup.googleMapsKey}'`
        )
      }

      fs.writeFile('./config/settings.js', data, 'utf8', err => {})
    })

    // Add jQuery to scripts
    if (setup.jquery == 'Yes') {
      let file = path.join(settings.root, settings.paths.src, 'scripts/app.js')

      const jsContent =
        '// Load jQuery from NPM\n' +
        "import $ from 'jquery';\n\n" +
        'window.jQuery = $;\n' +
        'window.$ = $;\n\n'

      let data = fs.readFileSync(file)

      if (!data.includes('jQuery')) {
        let fd = fs.openSync(file, 'w+')
        let buffer = Buffer.from(jsContent)

        fs.writeSync(fd, buffer, 0, buffer.length, 0)
        fs.writeSync(fd, data, 0, data.length, buffer.length)
        fs.close(fd)
      }
    }
  } catch (err) {
    console.log(chalk.red('\nSetup skipped!\n'))
  }
}

if (!skipSetup) {
  run()
}
