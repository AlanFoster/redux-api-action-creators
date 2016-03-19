import _ from 'lodash';

export default {
  onRequest(request, response, next) {
    const newHeaders = _.extend({}, request.headers, { 'Content-Type': 'application/json' });
    const newBody = JSON.stringify(request.body);

    const newRequest = _.extend({}, request, {
      headers: newHeaders,
      body: newBody
    });

    next(newRequest, response);
  },

  onSuccess(request, response, next) {
    const newResponse = _.extend({}, response, { body: JSON.parse(response.responseText) });

    next(request, newResponse);
  }
};
