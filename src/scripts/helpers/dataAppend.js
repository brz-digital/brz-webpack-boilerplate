const checkType = element => {
  return element.getAttribute('type');
};

const dataAppend = form => {
  let formData = new FormData();

  for (let i = 0; i < form.length; ++i) {
    switch (checkType(form[i])) {
      case "checkbox":
      case "radio":
        if (form[i].checked) {
          formData.append(form[i].name, form[i].value);
        }
        break;
      case "file":
        if (form[i].value.length) {
          formData.append(form[i].name, form[i].files[0], form[i].files[0].name);
        }
        break;
      default:
        formData.append(form[i].name, form[i].value);
        break;
    }
  }

  return formData;
};

export default dataAppend;
