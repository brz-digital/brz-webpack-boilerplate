import IMask from 'imask';

const setMask = (classname, settings) => {
  let inputs = document.querySelectorAll(classname);
  if (inputs) {
    inputs.forEach(input => {
      new IMask(input, settings);
    });
  }
};

export default setMask;
