'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _forOwn = require('lodash/forOwn');

var _forOwn2 = _interopRequireDefault(_forOwn);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _dat = require('dat.gui/build/dat.gui');

var _dat2 = _interopRequireDefault(_dat);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (WrappedComponent) {
  var _class, _temp;

  var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _temp = _class = function (_Component) {
    _inherits(_class, _Component);

    function _class(props) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.hasData = function () {
        return !(0, _isEmpty2.default)(_this.data);
      };

      _this.addGuiData = function (prop) {
        var _model$prop = model[prop],
            type = _model$prop.type,
            values = _model$prop.values,
            min = _model$prop.min,
            max = _model$prop.max,
            step = _model$prop.step;

        // Create appropriate data.gui controller

        var controller = void 0;
        switch (type) {
          case 'enum':
            controller = _this.gui.add(_this.data, prop, values);
            break;
          case 'color':
            controller = _this.gui.addColor(_this.data, prop);
            break;
          case 'slider':
            controller = _this.gui.add(_this.data, prop, min, max);
            break;
          default:
            controller = _this.gui.add(_this.data, prop);
            break;
        }

        // Add datgui constraints (for numbers only)
        if (type === 'number') {
          min !== undefined && controller.min(min);
          max !== undefined && controller.max(max);
          step !== undefined && controller.step(step);
        }

        // Update state when a data changes
        var handleChange = function handleChange(value) {
          if (_this.state[prop] !== value) {
            _this.data[prop] = value;
            _this.setState(_defineProperty({}, prop, (0, _utils.mapDataToState)(value, prop, type)));
          }
        };
        if (type === 'object' || type === 'array') {
          controller.onFinishChange(handleChange);
        } else if (type !== 'func') {
          controller.onChange(handleChange);
        }
      };

      _this.componentDidMount = function () {
        if (_this.container && _this.hasData()) {
          // create dat.gui and add it to the dom
          _this.gui = new _dat2.default.GUI({ autoPlace: false });
          _this.container.appendChild(_this.gui.domElement);
          // Add each props to the dat.gui component
          (0, _forOwn2.default)(_this.data, function (value, key) {
            return _this.addGuiData(key);
          });
        }
      };

      _this.render = function () {
        if (!_this.hasData()) {
          return _react2.default.createElement(WrappedComponent, _this.props);
        }
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', {
            ref: function ref(e) {
              _this.container = e;
            },
            style: { position: 'absolute', right: '0px' }
          }),
          _react2.default.createElement(WrappedComponent, _extends({}, _this.props, _this.state))
        );
      };

      _this.data = (0, _utils.mapModelToData)(model, props);
      _this.state = (0, _utils.mapAllDataToState)(model, _this.data);
      return _this;
    }

    return _class;
  }(_react.Component), _class.displayName = 'DatGui(' + (0, _utils.getDisplayName)(WrappedComponent) + ')', _temp;
};