'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDefaultValues = function mapDefaultValues(value, type) {
  /* eslint-disable no-eval */
  if (type === 'object') {
    return eval('new Object(' + value + ')');
  }
  return eval(value);
  /* eslint-enable no-eval */
};

var mapTypes = function mapTypes(type) {
  var name = type.name,
      value = type.value;

  if (name === 'func') {
    return 'function';
  } else if (name === 'bool') {
    return 'boolean';
  } else if (name === 'node' || name === 'arrayOf') {
    return 'array';
  } else if (name === 'instanceOf' || name === 'objectOf' || name === 'shape') {
    return 'object';
  } else if (name === 'union' && (0, _isArray2.default)(value) && value.length > 0) {
    return mapTypes(value[0]);
  }
  return name;
};

var mapTypesValues = function mapTypesValues(values) {
  if (values && (0, _isArray2.default)(values)) {
    return values.map(function (_ref) {
      var value = _ref.value;
      return mapDefaultValues(value);
    });
  }
  return undefined;
};

/**
 * Map the react-docgen model to hoc-react-datgui model
 */
var map = function map(docgen) {
  var props = docgen.props;

  return (0, _mapValues2.default)(props, function (_ref2) {
    var type = _ref2.type,
        defaultValue = _ref2.defaultValue;
    return {
      type: type && mapTypes(type),
      values: type && mapTypesValues(type.value),
      defaultValue: defaultValue && mapDefaultValues(defaultValue.value, type.name)
    };
  });
};

exports.default = map;