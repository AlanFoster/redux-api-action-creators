import _ from 'lodash';

export default function (configuration, onError) {
  const { route, success } = configuration;

  if (!_.isString(route)) {
    onError('Missing route');
  }

  if (!_.isString(success)) {
    onError('Missing success');
  }
}
