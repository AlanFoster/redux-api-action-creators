'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAPIActionCreators = createAPIActionCreators;
exports.createJSONAPIActionCreators = createJSONAPIActionCreators;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _createApiActionCreator = require('./create-api-action-creator');

var _createApiActionCreator2 = _interopRequireDefault(_createApiActionCreator);

var _createJsonApiActionCreator = require('./create-json-api-action-creator');

var _createJsonApiActionCreator2 = _interopRequireDefault(_createJsonApiActionCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createAPIActionCreators(configuration) {
  var actionCreators = _lodash2.default.mapValues(configuration, _createApiActionCreator2.default);

  return actionCreators;
};

function createJSONAPIActionCreators(configuration) {
  var actionCreators = _lodash2.default.mapValues(configuration, _createJsonApiActionCreator2.default);

  return actionCreators;
};