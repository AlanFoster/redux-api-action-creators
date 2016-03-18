import _ from 'lodash';
import createApiActionCreator from './create-api-action-creator';

export default function (configuration) {
  const actionCreators = _.mapValues(configuration, createApiActionCreator);

  return actionCreators;
}
