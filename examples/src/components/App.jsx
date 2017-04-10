import React, { Component } from 'react'
import withDatGui from 'hoc-react-datgui'

import MyComponent from './MyComponent'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { name: 'Benjamin' }
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
      onBoom: { type: 'function', defaultValue: () => alert('yes'), params: ['one', 2] },
      color: { type: 'color' },
    })

    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        <NewComp {...this.state} />
      </div>
    )
  }
}

export default App
