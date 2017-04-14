import mapValues from 'lodash/mapValues'
import isArray from 'lodash/isArray'

const mapDefaultValues = (value, type) => {
  /* eslint-disable no-eval */
  if (type === 'object') {
    return eval(`new Object(${value})`)
  }
  return eval(value)
  /* eslint-enable no-eval */
}

const mapTypes = (type) => {
  const { name, value } = type
  if (name === 'func') {
    return 'function'
  } else if (name === 'bool') {
    return 'boolean'
  } else if (name === 'node' || name === 'arrayOf') {
    return 'array'
  } else if (name === 'instanceOf' || name === 'objectOf' || name === 'shape') {
    return 'object'
  } else if (name === 'union' && isArray(value) && value.length > 0) {
    return mapTypes(value[0])
  }
  return name
}

const mapTypesValues = (values) => {
  if (values && isArray(values)) {
    return values.map(({ value }) => mapDefaultValues(value))
  }
  return undefined
}

/**
 * Map the react-docgen model to hoc-react-datgui model
 */
const map = (docgen) => {
  const { props } = docgen
  return mapValues(props, ({ type, defaultValue }) => ({
    type: type && mapTypes(type),
    values: type && mapTypesValues(type.value),
    defaultValue: defaultValue && mapDefaultValues(defaultValue.value, type.name),
  }))
}

export default map
