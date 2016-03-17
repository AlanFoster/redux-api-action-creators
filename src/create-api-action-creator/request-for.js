import _ from 'lodash';

export default function (configuration) {
  const request = _.result(configuration, 'createRequest', { });
  const method = _.result(request, 'method', 'GET');
  const url = configuration.route;

  return _.extend({}, request, { url, method });
}
