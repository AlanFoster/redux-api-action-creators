import _ from 'lodash';
import urlFor from './url-for';

export default function (configuration) {
  const request = _.result(configuration, 'createRequest', { });
  const method = _.result(request, 'method', 'GET');
  const url = urlFor(request, configuration.route);

  return _.extend({}, request, { url, method });
}
