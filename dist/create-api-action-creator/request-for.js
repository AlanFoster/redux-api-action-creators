'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (configuration) {
  var _configuration;

  configuration = _lodash2.default.defaults(configuration, {
    createRequest: _lodash2.default.constant({})
  });

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var request = (_configuration = configuration).createRequest.apply(_configuration, args);
  var url = (0, _urlFor2.default)(request, configuration.route);
  var method = _lodash2.default.result(configuration, 'method', 'GET');

  return _lodash2.default.extend({}, request, { url: url, method: method });
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _urlFor = require('./url-for');

var _urlFor2 = _interopRequireDefault(_urlFor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }