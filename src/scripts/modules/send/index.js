import axios from 'axios'
import swal from 'sweetalert'
import dataAppend from '../../helpers/dataAppend'
import loading from '../../helpers/loading'

const addValidation = (response, form) => {
  const { title, message, data } = response

  if (title || message) {
    swal({
      title: title || 'Ops',
      text: message || 'Ocorreu um erro ao enviar, tente novamente.',
      icon: 'error',
      timer: 3000,
      buttons: false
    })
  }

  data.forEach((index, key) => {
    const input = form.querySelector(`.js-validate[name="${index}"]`)

    const group = input.closest('.js-validate-group')
    input.classList.add('is-invalid')
    group.classList.add('-wrong')

    const messageError = document.createElement('div')
    messageError.classList.add('invalid-feedback')
    messageError.innerHTML = data[key]

    group.appendChild(messageError)
  })
}

const removeValidation = form => {
  const groups = form.querySelectorAll('.js-validate-group')

  groups.forEach(group => {
    if (group.classList.contains('-wrong')) {
      group.classList.remove('-wrong')
      const input = group.querySelector('.js-validate')
      input.classList.remove('is-invalid')
    }
    if (group.querySelector('.invalid-feedback')) {
      group.removeChild(group.querySelector('.invalid-feedback'))
    }
  })
}

const handleSuccess = (response, form) => {
  let timeout = 0
  const { reset, title, message, redirect } = response

  removeValidation(form)

  if (typeof reset === 'undefined') {
    form.reset()
  }

  if (title || message) {
    timeout = 3000
    swal({
      title: title || 'Obrigado',
      text: message || 'Enviado com sucesso!',
      icon: 'success',
      timer: timeout,
      buttons: false
    })
  } else {
    timeout = 100
  }

  if (redirect) {
    setTimeout(() => {
      window.location.replace(redirect)
    }, timeout)
  }
}

const handleError = (response, form) => {
  removeValidation(form)
  addValidation(response, form)
}

const handleOnSubmit = async event => {
  event.preventDefault()

  loading(event.target)

  const form = event.target.closest('.form')
  const formData = dataAppend(form)

  try {
    const response = await axios({
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      url: form.action,
      data: formData
    })

    handleSuccess(response.data, form)
  } catch (err) {
    handleError(err.response.data, form)
  }

  loading(event.target, false)
}

const Send = buttons => {
  buttons.forEach(button => {
    button.addEventListener('click', event => handleOnSubmit(event))
  })
}

export default Send
