import React, { Component } from 'react'
import withDatGui from './withDatGui'
import { getDisplayName, mapPropsToModel } from './utils'

export default (WrappedComponent) => {
  return class extends Component {
    static displayName = `DatGuiFromProps(${getDisplayName(WrappedComponent)})`;

    constructor(props) {
      super(props)
      this.model = mapPropsToModel({ ...WrappedComponent.defaultProps, ...props })
    }

    render = () => {
      const ComponentWithDatGui = withDatGui(WrappedComponent, this.model)
      return <ComponentWithDatGui {...this.props} />
    };
  }
}
