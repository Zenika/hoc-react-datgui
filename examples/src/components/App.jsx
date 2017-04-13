import React, { Component } from 'react'
import { withDatGui, withDatGuiFromProps, withDatGuiFromDocgen } from 'hoc-react-datgui'

import MyComponent from './MyComponent'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { name: 'From model' }
  }

  handleChange = e => {
    this.setState({ name: e.target.value })
  };

  render() {
    const NewComp = withDatGui(MyComponent, {
      name: { type: 'string', defaultValue: 'Benjamin' },
      age: { type: 'slider', min: 1, max: 50, defaultValue: 30 },
      gender: { type: 'enum', values: ['Male', 'Female'], defaultValue: 'Male' },
      happy: { type: 'boolean' },
      address: { type: 'object', defaultValue: { numero: 0, rue: 'rue du cours' } },
      books: { type: 'array' },
      onBoom: { type: 'func', defaultValue: () => alert('yes'), params: ['one', 2] },
      color: { type: 'color' },
    })

    const NewComp2 = withDatGuiFromProps(MyComponent)

    const NewComp3 = withDatGuiFromDocgen(MyComponent)

    const WithoutProps = withDatGui(() => (<div>Without props</div>))

    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        <NewComp {...this.state} />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <NewComp2 name="From props" />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <NewComp3 name="From docgen" />
        <WithoutProps />
      </div>
    )
  }
}

export default App
