const loading = (
  button,
  load = true,
  style = 'js-spinner spinner-border spinner-border-sm'
) => {
  if (load === true) {
    button.disabled = true

    const spinner = document.createElement('span')

    spinner.setAttribute('class', style)
    spinner.setAttribute('role', 'status')

    button.appendChild(spinner)
  } else {
    button.querySelector('.js-spinner').remove()
    button.disabled = false
  }
}

export default loading
