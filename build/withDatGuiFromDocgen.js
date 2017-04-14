'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withDatGui = require('./withDatGui');

var _withDatGui2 = _interopRequireDefault(_withDatGui);

var _docgen = require('./mappers/docgen');

var _docgen2 = _interopRequireDefault(_docgen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (WrappedComponent, docgenInfo) {
  return function (props) {
    var model = (0, _docgen2.default)(WrappedComponent.__docgenInfo || docgenInfo);
    var ComponentWithDatGui = (0, _withDatGui2.default)(WrappedComponent, model);
    return _react2.default.createElement(ComponentWithDatGui, props);
  };
};