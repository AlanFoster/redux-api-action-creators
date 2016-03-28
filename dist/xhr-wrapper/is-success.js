'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (response) {
  if (!_lodash2.default.isObject(response)) return false;

  var readyState = response.readyState;
  var status = response.status;

  return readyState === 4 && status >= 200 && status < 300;
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }