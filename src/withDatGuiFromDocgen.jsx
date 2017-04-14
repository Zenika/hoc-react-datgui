import React from 'react'
import withDatGui from './withDatGui'
import map from './mappers/docgen'

export default (WrappedComponent, docgenInfo) => {
  return (props) => {
    const model = map(WrappedComponent.__docgenInfo || docgenInfo)
    const ComponentWithDatGui = withDatGui(WrappedComponent, model)
    return <ComponentWithDatGui {...props} />
  }
}
