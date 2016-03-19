import _ from 'lodash';
import createAPIActionCreator from './create-api-action-creator';
import createJSONAPIActionCreator from './create-json-api-action-creator';

export default {
  createAPIActionCreators(configuration) {
    const actionCreators = _.mapValues(configuration, createAPIActionCreator);

    return actionCreators;
  },

  createJSONAPIActionCreators(configuration) {
    const actionCreators = _.mapValues(configuration, createJSONAPIActionCreator);

    return actionCreators;
  }
}
