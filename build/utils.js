'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDocgenToModel = exports.mapAllDataToState = exports.mapDataToState = exports.mapModelToData = exports.mapPropsToModel = exports.getDisplayName = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDisplayName = exports.getDisplayName = function getDisplayName(c) {
  return c.displayName || c.name || 'Component';
};

var mapPropsToModel = exports.mapPropsToModel = function mapPropsToModel(props) {
  return (0, _mapValues2.default)(props, function (value) {
    if (value !== undefined) {
      return { type: typeof value === 'undefined' ? 'undefined' : _typeof(value), defaultValue: value };
    }
    return { type: 'string', defaultValue: '' };
  });
};

var mapModelToData = exports.mapModelToData = function mapModelToData(model, props) {
  return (0, _mapValues2.default)(model, function (value, prop) {
    var type = value.type,
        defaultValue = value.defaultValue;

    var propValue = props[prop];

    if (type === 'object') {
      return JSON.stringify(propValue || defaultValue || {});
    } else if (type === 'array') {
      return JSON.stringify(propValue || defaultValue || []);
    } else if (type === 'string') {
      return propValue || defaultValue || '';
    } else if (type === 'color') {
      return propValue || defaultValue || '#FFFFFF';
    } else if (type === 'number' || type === 'slider') {
      return propValue || defaultValue || 0;
    } else if (type === 'boolean') {
      return propValue || defaultValue || true;
    } else if (type === 'func') {
      return propValue || defaultValue || function () {};
    } else if (type === 'enum') {
      return propValue || defaultValue || [];
    }
    return propValue || defaultValue;
  });
};

var mapDataToState = exports.mapDataToState = function mapDataToState(value, prop, type) {
  if (type === 'object' || type === 'array') {
    return value && JSON.parse(value);
  }
  return value;
};

var mapAllDataToState = exports.mapAllDataToState = function mapAllDataToState(model, data) {
  return (0, _mapValues2.default)(model, function (value, prop) {
    var type = value.type;

    return mapDataToState(data[prop], prop, type);
  });
};

var mapDocgenValues = function mapDocgenValues(value, type) {
  /* eslint-disable no-eval */
  if (type === 'object') {
    return eval('new Object(' + value + ')');
  }
  return eval(value);
  /* eslint-enable no-eval */
};

var mapDocgenEnum = function mapDocgenEnum(values) {
  if (values) {
    return values.map(function (v) {
      return mapDocgenValues(v.value);
    });
  }
  return undefined;
};

var mapDocgenToModel = exports.mapDocgenToModel = function mapDocgenToModel(docgenInfo) {
  return (0, _mapValues2.default)(docgenInfo.props, function (_ref) {
    var type = _ref.type,
        defaultValue = _ref.defaultValue;
    return {
      type: type.name,
      values: mapDocgenEnum(type.value),
      defaultValue: mapDocgenValues(defaultValue.value, type.name)
    };
  });
};