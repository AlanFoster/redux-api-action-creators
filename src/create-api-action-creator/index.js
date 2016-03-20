import _ from 'lodash';
import validateConfiguration from './../validate-configuration';
import xhrWrapper from '../xhr-wrapper';
import requestFor from './request-for';
import actionsFor from './actions-for';

const noopMiddleware = function (request, response, next) {
  return next(request, response);
};

const defaultMiddleware = {
  onRequest: noopMiddleware,
  onSuccess: noopMiddleware
};

export default function (configuration, actionCreatorName, middleware) {
  validateConfiguration(configuration, function (error) {
    throw new Error(`Can not create ApiActionCreator '${actionCreatorName}' because '${error}'`);
  });

  middleware = _.defaults(middleware, defaultMiddleware);

  return (...args) => (dispatch) => {
    const actions = actionsFor(configuration);

    if (_.isString(configuration.pending)) {
      dispatch(actions.pending());
    }

    const request = requestFor(configuration, ...args);

    middleware.onRequest(request, undefined, function (request) {
      const onSuccess = function (response) {
        middleware.onSuccess(request, response, function (request, response) {
          dispatch(actions.success({ request, response }));
        });
      };

      xhrWrapper(request, onSuccess);
    });
  };
};

