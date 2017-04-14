import forOwn from 'lodash/forOwn'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import replace from 'lodash/replace'

const toString = (element) => {
  if (typeof element === 'string') {
    return `'${replace(element, "'", "\\'")}'`
  } else if (isArray(element)) {
    const properties = []
    element.forEach(value => properties.push(toString(value)))
    return `[ ${properties.join(', ')} ]`
  } else if (isObject(element)) {
    const properties = []
    forOwn(element, (value, key) => properties.push(`${key}: ${toString(value)}`))
    return `{ ${properties.join(', ')} }`
  }
  return String(element)
}

const toObject = (string) => {
  /* eslint-disable no-eval,no-console */
  try {
    return eval(`new Object(${string})`)
  } catch (e) {
    console.error(`malformed javascript object : ${string}`)
  }
  return {}
  /* eslint-enable no-eval,no-console */
}

const toArray = (string) => {
  /* eslint-disable no-eval,no-console */
  try {
    return eval(string)
  } catch (e) {
    console.error(`malformed javascript array : ${string}`)
  }
  return []
  /* eslint-enable no-eval,no-console */
}

export {
  toString,
  toObject,
  toArray,
}
