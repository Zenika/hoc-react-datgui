import mapValues from 'lodash/mapValues'
import omitBy from 'lodash/omitBy'
import { toString, toObject, toArray } from './utils'

export const getDisplayName = c => c.displayName || c.name || 'Component'

export const mapModelToData = (model, props) => {
  const filteredTypes = omitBy(model, ({ type }) => {
    const omit = type !== 'object'
      && type !== 'array'
      && type !== 'string'
      && type !== 'color'
      && type !== 'number'
      && type !== 'slider'
      && type !== 'boolean'
      && type !== 'function'
      && type !== 'enum'
    if (omit) {
      /* eslint-disable no-console */
      console.warn(`PropTypes '${type}' is not handled`)
      /* eslint-enable no-console */
    }
    return omit
  })

  return mapValues(filteredTypes, ({ type, defaultValue }, prop) => {
    const propValue = props[prop] || defaultValue

    if (type === 'object') {
      return toString(propValue || {})
    } else if (type === 'array') {
      return toString(propValue || [])
    } else if (type === 'string') {
      return propValue || ''
    } else if (type === 'color') {
      return propValue || '#FFFFFF'
    } else if (type === 'number' || type === 'slider') {
      return propValue || 0
    } else if (type === 'boolean') {
      return propValue || true
    } else if (type === 'function') {
      return propValue || (() => {})
    } else if (type === 'enum') {
      return propValue || []
    }
    return propValue
  })
}

export const mapDataToState = (value, prop, type) => {
  if (type === 'object') {
    return value && toObject(value)
  } else if (type === 'array') {
    return value && toArray(value)
  }
  return value
}

export const mapAllDataToState = (model, data) => {
  return mapValues(model, (value, prop) => {
    const { type } = value
    return mapDataToState(data[prop], prop, type)
  })
}
