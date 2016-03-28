'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (configuration) {
  var onError = arguments.length <= 1 || arguments[1] === undefined ? _lodash2.default.noop : arguments[1];

  if (!_lodash2.default.isObject(configuration)) {
    onError('Missing full configuration object');
  }

  var _ref = configuration || {};

  var route = _ref.route;
  var success = _ref.success;


  if (!_lodash2.default.isString(route)) {
    onError('Missing route');
  }

  if (!_lodash2.default.isString(success)) {
    onError('Missing success');
  }
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }