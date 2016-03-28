'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  onRequest: function onRequest(request, response, next) {
    var newHeaders = _lodash2.default.extend({}, request.headers, { 'Content-Type': 'application/json' });
    var newBody = JSON.stringify(request.body);

    var newRequest = _lodash2.default.extend({}, request, {
      headers: newHeaders,
      body: newBody
    });

    next(newRequest, response);
  },
  onSuccess: function onSuccess(request, response, next) {
    var newResponse = _lodash2.default.extend({}, response, { body: JSON.parse(response.responseText) });

    next(request, newResponse);
  }
};