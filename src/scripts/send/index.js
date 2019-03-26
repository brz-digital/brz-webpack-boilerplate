import dataAppend from '../helpers/data';
import loading from '../helpers/loading';
import api from '../api';

class Send {
  constructor() {
    this.registerHandlers(document.querySelectorAll('.js-send'));
  }

  registerHandlers(buttons) {
    buttons.forEach(button => {
      button.onclick = event => this.handleOnSubmit(event);
    });
  }

  async handleOnSubmit(event) {
    event.preventDefault();

    loading(event.target);

    let form = event.target.closest('.form');
    let formData = dataAppend(form);

    try {
      const response = await api.post({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: form.action,
        data: formData
      });

      this.handleSuccess(response.data, form);
    } catch (err) {
      this.handleError(err.response.data, form);
    }

    loading(event.target, false);
  }

  handleSuccess(response, form) {
    let timeout = 0;
    let { reset, title, message, redirect } = response;

    this.removeValidation(form);

    if (typeof reset == 'undefined'){
      form.reset();
    }

    if(title || message) {
      timeout = 3000;
      swal({
        title:   title    || 'Obrigado',
        text:    message  || 'Enviado com sucesso!',
        icon:    'success',
        timer:   timeout,
        buttons: false
      });
    } else {
      timeout = 100;
    }

    if(redirect) {
      setTimeout(function(){
        window.location.replace(redirect);
      }, timeout);
    }
  }

  handleError(response, form) {
    this.removeValidation(form);
    this.addValidation(response, form);
  }

  addValidation(response, form) {
    let { title, message, data } = response;

    if(title || message) {
      swal({
        title:   title    || 'Ops',
        text:    message  || 'Ocorreu um erro ao enviar, tente novamente.',
        icon:    'error',
        timer:   3000,
        buttons: false
      });
    }

    data.forEach((index, value) => {
      let input = form.querySelector('.js-validate[name="' + index + '"]');

      let group = input.closest('.js-validate-group');
          input.classList.add('is-invalid');
          group.classList.add('-wrong');

      let messageError = document.createElement('div');
          messageError.classList.add('invalid-feedback');
          messageError.innerHTML = data[key];

      group.appendChild(messageError);
    });
  }

  removeValidation(form) {
    let groups = form.querySelectorAll('.js-validate-group');

    groups.forEach((group) => {
      if (group.classList.contains('-wrong')) {
        group.classList.remove('-wrong');
        let input = group.querySelector('.js-validate')
            input.classList.remove('is-invalid');
      }
      if (group.querySelector('.invalid-feedback')) group.removeChild(group.querySelector('.invalid-feedback'));
    });
  }
}

export default Send;
