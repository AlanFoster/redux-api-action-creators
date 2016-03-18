import _ from 'lodash';

const interpolateNames = function (params = {}, route) {
  return _.reduce(params, function (url, value, key) {
    const keyRegex = new RegExp(`:${key}(?=/|$)`, 'g');
    return url.replace(keyRegex, value)
  }, route);
};

const queryStringFor = function (query = {}) {
  const values = _.map(query, function (value, key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  });

  return values.join('&');
};

export default function (request = { }, route) {
  const { params, query } = request;

  const url = interpolateNames(params, route);
  if (_.isEmpty(query)) return url;

  const queryString = queryStringFor(request.query);
  return `${url}?${queryString}`;
}
