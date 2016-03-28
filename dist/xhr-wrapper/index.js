'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (request, onSuccess) {
  var _request$method = request.method;
  var method = _request$method === undefined ? 'GET' : _request$method;
  var url = request.url;
  var body = request.body;
  var _request$headers = request.headers;
  var headers = _request$headers === undefined ? {} : _request$headers;


  var xhr = new _rawXhr2.default();
  xhr.onreadystatechange = function () {
    if ((0, _isSuccess2.default)(xhr)) {
      onSuccess(xhr);
    }
  };

  xhr.open(method, url, true);

  _lodash2.default.each(headers, function (value, header) {
    xhr.setRequestHeader(header, value);
  });

  xhr.send(body);
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _rawXhr = require('./raw-xhr');

var _rawXhr2 = _interopRequireDefault(_rawXhr);

var _isSuccess = require('./is-success');

var _isSuccess2 = _interopRequireDefault(_isSuccess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }