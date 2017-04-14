'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapAllDataToState = exports.mapDataToState = exports.mapModelToData = exports.getDisplayName = undefined;

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _omitBy = require('lodash/omitBy');

var _omitBy2 = _interopRequireDefault(_omitBy);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDisplayName = exports.getDisplayName = function getDisplayName(c) {
  return c.displayName || c.name || 'Component';
};

var mapModelToData = exports.mapModelToData = function mapModelToData(model, props) {
  var filteredTypes = (0, _omitBy2.default)(model, function (_ref) {
    var type = _ref.type;

    var omit = type !== 'object' && type !== 'array' && type !== 'string' && type !== 'color' && type !== 'number' && type !== 'slider' && type !== 'boolean' && type !== 'function' && type !== 'enum';
    if (omit) {
      /* eslint-disable no-console */
      console.warn('PropTypes \'' + type + '\' is not handled');
      /* eslint-enable no-console */
    }
    return omit;
  });

  return (0, _mapValues2.default)(filteredTypes, function (_ref2, prop) {
    var type = _ref2.type,
        defaultValue = _ref2.defaultValue;

    var propValue = props[prop] || defaultValue;

    if (type === 'object') {
      return (0, _utils.toString)(propValue || {});
    } else if (type === 'array') {
      return (0, _utils.toString)(propValue || []);
    } else if (type === 'string') {
      return propValue || '';
    } else if (type === 'color') {
      return propValue || '#FFFFFF';
    } else if (type === 'number' || type === 'slider') {
      return propValue || 0;
    } else if (type === 'boolean') {
      return propValue || true;
    } else if (type === 'function') {
      return propValue || function () {};
    } else if (type === 'enum') {
      return propValue || [];
    }
    return propValue;
  });
};

var mapDataToState = exports.mapDataToState = function mapDataToState(value, prop, type) {
  if (type === 'object') {
    return value && (0, _utils.toObject)(value);
  } else if (type === 'array') {
    return value && (0, _utils.toArray)(value);
  }
  return value;
};

var mapAllDataToState = exports.mapAllDataToState = function mapAllDataToState(model, data) {
  return (0, _mapValues2.default)(model, function (value, prop) {
    var type = value.type;

    return mapDataToState(data[prop], prop, type);
  });
};