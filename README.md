## hoc-react-datgui

> HOC adding a `dat.GUI` plugged to `React.Component` props.

_*Library currently in development*_

### What's dat.GUI ?

`dat.GUI` is a lightweight graphical user interface for changing variables in JavaScript. Written by https://github.com/dataarts/

See some examples at http://workshop.chromeexperiments.com/examples/gui.

### Getting started

#### withDatGui(Component, model)

Generate the `dat.GUI` following the given model object.

```jsx
import { withDatGui } from 'hoc-react-datgui'

const CompWithDatGui = withDatGui(MyComponent, {
  name: { type: 'string', defaultValue: 'noname' },
  age: { type: 'number', min: 1, max: 99, step: 1 },
  gender: { type: 'enum', values: ['Male', 'Female']}
})

<CompWithDatGui name="Benjamin" />
```
 The model is an object descripting the `dat.GUI` component. All keys must match with the component props (name and type).

 property | description
 ---------|-----------
| `type` | `string`, `number`, `enum`, `object`, `array`, `function`, `color` |
| `defaultValue` | default value of the property. |
| `max` | only for `number` |
| `min` | only for `number` |
| `step` | only for `number`. |
| `values` | only for `enum`. Array of values for an enum property.|

#### withDatGuiFromProps(Component)

Generate the `dat.GUI` according to the input props of the wrapped component. (be careful, it doesn't check component propTypes)

```jsx
import { withDatGuiFromProps } from 'hoc-react-datgui'

const CompWithDatGui = withDatGuiFromProps(MyComponent)

<CompWithDatGui name="Benjamin" />
```