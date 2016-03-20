import _ from 'lodash';
import XMLHttpRequest from './raw-xhr';
import isSuccess from './is-success';

export default function (request, onSuccess) {
  const { method = 'GET', url, body, headers = {} } = request;

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (isSuccess(xhr)) {
      onSuccess(xhr)
    }
  };

  xhr.open(method, url, true);

  _.each(headers, function (value, header) {
    xhr.setRequestHeader(header, value);
  });

  xhr.send(body);
}
