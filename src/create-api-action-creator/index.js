import _ from 'lodash';
import validateConfiguration from './../validate-configuration';
import xhrWrapper from '../xhr-wrapper';
import requestFor from './request-for';
import actionsFor from './actions-for';

export default  function (configuration, actionCreatorName) {
  validateConfiguration(configuration, function (error) {
    throw new Error(`Can not create ApiActionCreator '${actionCreatorName}' because '${error}'`);
  });

  return () => (dispatch) => {
    const actions = actionsFor(configuration);

    if (_.isString(configuration.pending)) {
      dispatch(actions.pending());
    }

    const request = requestFor(configuration);

    const onSuccess = function (response) {
      dispatch(actions.success({ request, response }));
    };

    xhrWrapper(request, onSuccess);
  };
};

