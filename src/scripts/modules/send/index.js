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
    let input = form.querySelector(`[name="${index}"]`)

    if (input) {
      let group = input.closest('.js-validate-group')
      if (!group.classList.contains('is-invalid')) { group.classList.add('is-invalid') }

      let feedback = document.createElement('div')
      feedback.classList.add('invalid-feedback')
      feedback.appendChild(document.createTextNode(data[index]))

      if (!group.querySelector('.invalid-feedback')) group.appendChild(feedback)
    }
  })
}

const removeValidation = form => {
  let groups = form.querySelectorAll('.js-validate-group')

  groups.forEach(group => {
    if (group.classList.contains('is-invalid')) { group.classList.remove('is-invalid') }
    if (group.querySelector('.invalid-feedback')) { group.removeChild(group.querySelector('.invalid-feedback')) }
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
