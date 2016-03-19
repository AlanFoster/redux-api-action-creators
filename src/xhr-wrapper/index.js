import XMLHttpRequest from './raw-xhr';
import isSuccess from './is-success';

export default function (request, onSuccess) {
  const { method = 'GET', url } = request;

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (isSuccess(xhr)) {
      onSuccess(xhr)
    }
  };

  xhr.open(method, url);
  xhr.send();
}
