'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var request = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var route = arguments[1];
  var params = request.params;
  var query = request.query;


  var url = interpolateNames(params, route);
  return appendQuery(url, query);
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interpolateNames = function interpolateNames() {
  var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var route = arguments[1];

  return _lodash2.default.reduce(params, function (url, value, key) {
    var keyRegex = new RegExp(':' + key + '(?=/|$)', 'g');
    return url.replace(keyRegex, value);
  }, route);
};

var queryStringFor = function queryStringFor() {
  var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var values = _lodash2.default.map(query, function (value, key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  });

  return values.join('&');
};

var appendQuery = function appendQuery(url, query) {
  if (_lodash2.default.isEmpty(query)) return url;

  var queryString = queryStringFor(query);
  return url + '?' + queryString;
};