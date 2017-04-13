const forOwn = require('lodash/forOwn')
const isArray = require('lodash/isArray')
const isObject = require('lodash/isObject')
const replace = require('lodash/replace')

const objectToString = (obj) => {
  if (typeof obj === 'string') {
    return `'${replace(obj, "'", "\\'")}'`
  } else if (isArray(obj)) {
    const properties = []
    obj.forEach(value => properties.push(objectToString(value)))
    return `[ ${properties.join(', ')} ]`
  } else if (isObject(obj)) {
    const properties = []
    forOwn(obj, (value, key) => properties.push(`${key}: ${objectToString(value)}`))
    return `{ ${properties.join(', ')} }`
  }
  return String(obj)
}

const stringToObject = (string) => {
  return eval(`new Object(${string})`)
}

const res = objectToString({ a: 'Hello', b: '1', c: true, d: { d1: 'Hello' }, e: ['a', 1, false, {}], f: undefined, g: null })
console.log(res)
console.log(stringToObject(res))

