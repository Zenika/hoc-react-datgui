import React from 'react'
import withDatGui from './withDatGui'
import { mapDocgenToModel } from './utils'

export default (WrappedComponent, docgenInfo) => {
  return (props) => {
    const model = mapDocgenToModel(WrappedComponent.__docgenInfo || docgenInfo)
    const ComponentWithDatGui = withDatGui(WrappedComponent, model)
    return <ComponentWithDatGui {...props} />
  }
}
