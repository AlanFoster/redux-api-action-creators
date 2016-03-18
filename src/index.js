import _ from 'lodash';
import createAPIActionCreator from './create-api-action-creator';

export default {
  createAPIActionCreators(configuration) {
    const actionCreators = _.mapValues(configuration, createAPIActionCreator);

    return actionCreators;
  }
}
