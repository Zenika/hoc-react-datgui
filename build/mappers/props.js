'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapTypes = function mapTypes(value) {
  if ((0, _isArray2.default)(value)) {
    return 'array';
  }
  return typeof value === 'undefined' ? 'undefined' : _typeof(value);
};

/**
 * Map the component given props to hoc-react-datgui model
 */
var map = function map(props) {
  return (0, _mapValues2.default)(props, function (value) {
    if (value !== undefined) {
      return { type: mapTypes(value), defaultValue: value };
    }
    return { type: 'string', defaultValue: '' };
  });
};

exports.default = map;