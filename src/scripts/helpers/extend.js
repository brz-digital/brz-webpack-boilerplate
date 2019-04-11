const extend = function () {
  let extended = {}
  let deep = false
  let i = 0

  if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
    deep = arguments[0]
    i++
  }

  let merge = function (obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (
          deep &&
          Object.prototype.toString.call(obj[prop]) === '[object Object]'
        ) {
          extended[prop] = extend(extended[prop], obj[prop])
        } else {
          extended[prop] = obj[prop]
        }
      }
    }
  }

  for (; i < arguments.length; i++) {
    merge(arguments[i])
  }

  return extended
}

export default extend
