'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dat = require('dat.gui/build/dat.gui');

var _dat2 = _interopRequireDefault(_dat);

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _forOwn = require('lodash/forOwn');

var _forOwn2 = _interopRequireDefault(_forOwn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatGui = function (_Component) {
  _inherits(DatGui, _Component);

  function DatGui(props) {
    _classCallCheck(this, DatGui);

    var _this = _possibleConstructorReturn(this, (DatGui.__proto__ || Object.getPrototypeOf(DatGui)).call(this, props));

    _this.componentDidMount = function () {
      if (_this.container) {
        // create dat.gui and add it to the dom
        var gui = new _dat2.default.GUI({ autoPlace: false });
        _this.container.appendChild(gui.domElement);

        // Add each props to the dat.gui component
        (0, _forOwn2.default)(_this.data, function (value, key) {
          return _this.addGuiData(gui, key);
        });
      }
    };

    _this.addGuiData = function (gui, prop) {
      var _this$props$data$prop = _this.props.data[prop],
          type = _this$props$data$prop.type,
          values = _this$props$data$prop.values,
          min = _this$props$data$prop.min,
          max = _this$props$data$prop.max,
          step = _this$props$data$prop.step;

      // Create appropriate data.gui controller

      var controller = void 0;
      switch (type) {
        case 'enum':
          controller = gui.add(_this.data, prop, values);
          break;
        case 'color':
          controller = gui.addColor(_this.data, prop);
          break;
        case 'slider':
          controller = gui.add(_this.data, prop, min, max);
          break;
        default:
          controller = gui.add(_this.data, prop);
          break;
      }

      // Add datgui constraints (for numbers only)
      if (type === 'number') {
        min !== undefined && controller.min(min);
        max !== undefined && controller.max(max);
        step !== undefined && controller.step(step);
      }

      // Update state when a data changes
      if (type === 'object' || type === 'array') {
        controller.onFinishChange(function (value) {
          _this.props.onFinishChange(prop, value, type || (typeof value === 'undefined' ? 'undefined' : _typeof(value))); // TODO parse objects and arrays
        });
      } else if (type !== 'function') {
        controller.onChange(function (value) {
          _this.props.onChange(prop, value, type || (typeof value === 'undefined' ? 'undefined' : _typeof(value)));
        });
      }
    };

    _this.data = (0, _mapValues2.default)(props.data, function (obj) {
      return obj.value;
    }); // TODO parse objects and arrays
    return _this;
  }

  _createClass(DatGui, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', {
        ref: function ref(e) {
          _this2.container = e;
        },
        style: { position: 'absolute', right: '0px' }
      });
    }
  }]);

  return DatGui;
}(_react.Component);

DatGui.propTypes = {
  data: _react.PropTypes.object.isRequired,
  onFinishChange: _react.PropTypes.func,
  onChange: _react.PropTypes.func
};
exports.default = DatGui;