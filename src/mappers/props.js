import mapValues from 'lodash/mapValues'
import isArray from 'lodash/isArray'

const mapTypes = (value) => {
  if (isArray(value)) {
    return 'array'
  }
  return typeof value
}

/**
 * Map the component given props to hoc-react-datgui model
 */
const map = (props) => {
  return mapValues(props, (value) => {
    if (value !== undefined) {
      return { type: mapTypes(value), defaultValue: value }
    }
    return { type: 'string', defaultValue: '' }
  })
}

export default map
