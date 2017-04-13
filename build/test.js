'use strict';

var forOwn = require('lodash/forOwn');
var isArray = require('lodash/isArray');
var isObject = require('lodash/isObject');
var replace = require('lodash/replace');

var objectToString = function objectToString(obj) {
  if (typeof obj === 'string') {
    return '\'' + replace(obj, "'", "\\'") + '\'';
  } else if (isArray(obj)) {
    var properties = [];
    obj.forEach(function (value) {
      return properties.push(objectToString(value));
    });
    return '[ ' + properties.join(', ') + ' ]';
  } else if (isObject(obj)) {
    var _properties = [];
    forOwn(obj, function (value, key) {
      return _properties.push(key + ': ' + objectToString(value));
    });
    return '{ ' + _properties.join(', ') + ' }';
  }
  return String(obj);
};

var stringToObject = function stringToObject(string) {
  return eval('new Object(' + string + ')');
};

var res = objectToString({ a: 'Hello', b: '1', c: true, d: { d1: 'Hello' }, e: ['a', 1, false, {}], f: undefined, g: null });
console.log(res);
console.log(stringToObject(res));