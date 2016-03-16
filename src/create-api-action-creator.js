import _ from 'lodash';
import validateConfiguration from './validate-configuration';

const actionsFor = function (configuration) {
  const { pending } = configuration;

  return {
    pending() {
      return {
        type: pending
      }
    }
  };
};

export default  function (configuration, actionCreatorName) {
  validateConfiguration(configuration, function (error) {
    throw new Error(`Can not create ApiActionCreator '${actionCreatorName}' because '${error}'`);
  });

  return () => (dispatch) => {
    const actions = actionsFor(configuration);

    if (_.isString(configuration.pending)) {
      dispatch(actions.pending())
    }

  };
};

