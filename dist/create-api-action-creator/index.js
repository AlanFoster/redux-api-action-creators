'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (configuration, actionCreatorName, middleware) {
  (0, _validateConfiguration2.default)(configuration, function (error) {
    throw new Error('Can not create ApiActionCreator \'' + actionCreatorName + '\' because \'' + error + '\'');
  });

  middleware = _lodash2.default.defaults(middleware, defaultMiddleware);

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (dispatch) {
      var actions = (0, _actionsFor2.default)(configuration);

      if (_lodash2.default.isString(configuration.pending)) {
        dispatch(actions.pending());
      }

      var request = _requestFor2.default.apply(undefined, [configuration].concat(args));

      middleware.onRequest(request, undefined, function (request) {
        var onSuccess = function onSuccess(response) {
          middleware.onSuccess(request, response, function (request, response) {
            dispatch(actions.success({ request: request, response: response }));
          });
        };

        (0, _xhrWrapper2.default)(request, onSuccess);
      });
    };
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _validateConfiguration = require('./../validate-configuration');

var _validateConfiguration2 = _interopRequireDefault(_validateConfiguration);

var _xhrWrapper = require('../xhr-wrapper');

var _xhrWrapper2 = _interopRequireDefault(_xhrWrapper);

var _requestFor = require('./request-for');

var _requestFor2 = _interopRequireDefault(_requestFor);

var _actionsFor = require('./actions-for');

var _actionsFor2 = _interopRequireDefault(_actionsFor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noopMiddleware = function noopMiddleware(request, response, next) {
  return next(request, response);
};

var defaultMiddleware = {
  onRequest: noopMiddleware,
  onSuccess: noopMiddleware
};

;