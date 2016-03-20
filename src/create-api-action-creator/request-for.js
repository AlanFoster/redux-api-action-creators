import _ from 'lodash';
import urlFor from './url-for';

export default function (configuration, ...args) {
  configuration = _.defaults(configuration, {
    createRequest: _.constant({})
  });

  const request = configuration.createRequest(...args);
  const url = urlFor(request, configuration.route);
  const method = _.result(configuration, 'method', 'GET');

  return _.extend({}, request, { url, method });
}
