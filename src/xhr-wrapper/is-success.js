import _ from 'lodash';

export default function (response) {
  if (!_.isObject(response)) return false;

  const { readyState, status } = response;
  return (readyState === 4 && (status >= 200 && status < 300));
}
