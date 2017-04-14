'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withDatGui = require('./withDatGui');

var _withDatGui2 = _interopRequireDefault(_withDatGui);

var _props = require('./mappers/props');

var _props2 = _interopRequireDefault(_props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (WrappedComponent) {
  return function (props) {
    var model = (0, _props2.default)(_extends({}, WrappedComponent.defaultProps, props));
    var ComponentWithDatGui = (0, _withDatGui2.default)(WrappedComponent, model);
    return _react2.default.createElement(ComponentWithDatGui, props);
  };
};