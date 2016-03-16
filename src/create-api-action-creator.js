import validateConfiguration from './validate-configuration';

export default  function (configuration, actionCreatorName) {
  validateConfiguration(configuration, function (error) {
    throw new Error(`Can not create ApiActionCreator '${actionCreatorName}' because '${error}'`);
  });

  return function () {

  };
};

