'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = exports.toObject = exports.toString = undefined;

var _forOwn = require('lodash/forOwn');

var _forOwn2 = _interopRequireDefault(_forOwn);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _replace = require('lodash/replace');

var _replace2 = _interopRequireDefault(_replace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toString = function toString(element) {
  if (typeof element === 'string') {
    return '\'' + (0, _replace2.default)(element, "'", "\\'") + '\'';
  } else if ((0, _isArray2.default)(element)) {
    var properties = [];
    element.forEach(function (value) {
      return properties.push(toString(value));
    });
    return '[ ' + properties.join(', ') + ' ]';
  } else if ((0, _isObject2.default)(element)) {
    var _properties = [];
    (0, _forOwn2.default)(element, function (value, key) {
      return _properties.push(key + ': ' + toString(value));
    });
    return '{ ' + _properties.join(', ') + ' }';
  }
  return String(element);
};

var toObject = function toObject(string) {
  /* eslint-disable no-eval,no-console */
  try {
    return eval('new Object(' + string + ')');
  } catch (e) {
    console.error('malformed javascript object : ' + string);
  }
  return {};
  /* eslint-enable no-eval,no-console */
};

var toArray = function toArray(string) {
  /* eslint-disable no-eval,no-console */
  try {
    return eval(string);
  } catch (e) {
    console.error('malformed javascript array : ' + string);
  }
  return [];
  /* eslint-enable no-eval,no-console */
};

exports.toString = toString;
exports.toObject = toObject;
exports.toArray = toArray;