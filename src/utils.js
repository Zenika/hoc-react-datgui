import mapValues from 'lodash/mapValues'

export const mapModelToData = (model, props) => {
  return mapValues(model, (value, prop) => {
    const { type, defaultValue } = value
    const propValue = props[prop]

    if (type === 'object') {
      return JSON.stringify(propValue || defaultValue || {})
    } else if (type === 'array') {
      return JSON.stringify(propValue || defaultValue || [])
    } else if (type === 'string') {
      return propValue || defaultValue || ''
    } else if (type === 'color') {
      return propValue || defaultValue || '#FFFFFF'
    } else if (type === 'number' || type === 'slider') {
      return propValue || defaultValue || 0
    } else if (type === 'boolean') {
      return propValue || defaultValue || true
    } else if (type === 'function') {
      return propValue || defaultValue || (() => {})
    } else if (type === 'enum') {
      return propValue || defaultValue || []
    }
    return propValue || defaultValue
  })
}

export const mapDataToState = (value, prop, type) => {
  if (type === 'object' || type === 'array') {
    return value && JSON.parse(value)
  }
  return value
}

export const mapAllDataToState = (model, data) => {
  return mapValues(model, (value, prop) => {
    const { type } = value
    return mapDataToState(data[prop], prop, type)
  })
}