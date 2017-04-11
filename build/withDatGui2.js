'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DatGui = require('./DatGui');

var _DatGui2 = _interopRequireDefault(_DatGui);

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

      _this.handleChange = function (prop, value, type) {
        if (_this.state[prop] !== value) {
          _this.data[prop] = value;
          _this.setState(_defineProperty({}, prop, (0, _utils.mapDataToState)(value, prop, type)));
        }
      };

      _this.render = function () {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_DatGui2.default, {
            data: _this.data,
            onChange: _this.handleChange,
            onFinishChange: _this.handleChange
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