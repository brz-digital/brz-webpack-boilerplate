import IMask from 'imask'

const setMask = (classname, settings) => {
  const inputs = document.querySelectorAll(classname)
  if (inputs) {
    inputs.forEach(input => {
      IMask(input, settings)
    })
  }
}

export default setMask
