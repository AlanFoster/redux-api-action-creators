import _ from 'lodash';
import urlFor from './url-for';

export default function (configuration) {
  const request = _.result(configuration, 'createRequest', { });

  const url = urlFor(request, configuration.route);
  const method = _.result(configuration, 'method', 'GET');

  return _.extend({}, request, { url, method });
}
