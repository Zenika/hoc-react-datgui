import React from 'react'
import withDatGui from './withDatGui'
import map from './mappers/props'

export default (WrappedComponent) => {
  return (props) => {
    const model = map({ ...WrappedComponent.defaultProps, ...props })
    const ComponentWithDatGui = withDatGui(WrappedComponent, model)
    return <ComponentWithDatGui {...props} />
  }
}
