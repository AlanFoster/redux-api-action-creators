import _ from 'lodash';

export default function (configuration, onError = _.noop) {
  if (!_.isObject(configuration)) {
    onError('Missing full configuration object');
  }

  const { route, success } = configuration || { };

  if (!_.isString(route)) {
    onError('Missing route');
  }

  if (!_.isString(success)) {
    onError('Missing success');
  }
}
