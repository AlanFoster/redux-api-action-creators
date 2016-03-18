import _ from 'lodash';

export default function (response) {
  const status = _.result(response, 'status');

  return (status >= 200 && status < 300);
}
