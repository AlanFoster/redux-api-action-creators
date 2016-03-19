import _ from 'lodash';
import createAPIActionCreator from './create-api-action-creator';
import createJSONAPIActionCreator from './create-json-api-action-creator';

export function createAPIActionCreators(configuration) {
  const actionCreators = _.mapValues(configuration, createAPIActionCreator);

  return actionCreators;
};

export function createJSONAPIActionCreators(configuration) {
  const actionCreators = _.mapValues(configuration, createJSONAPIActionCreator);

  return actionCreators;
};
