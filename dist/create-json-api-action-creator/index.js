'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (configuration, actionCreatorName) {
  return (0, _createApiActionCreator2.default)(configuration, actionCreatorName, _jsonApiMiddleware2.default);
};

var _createApiActionCreator = require('../create-api-action-creator');

var _createApiActionCreator2 = _interopRequireDefault(_createApiActionCreator);

var _jsonApiMiddleware = require('./json-api-middleware');

var _jsonApiMiddleware2 = _interopRequireDefault(_jsonApiMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }