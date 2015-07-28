/**
 * @param {Object} json
 * @param {hh.Response} serverResponse
 */
hh.errorHandler = function(json, serverResponse) {
  console.log(json);
  if (json.errors[0].type === 'bad_request') {
    serverResponse.error(404, 'bad_request');
  }
  if (json.errors[0].type === 'too_many_requests') {
    serverResponse.error(429, 'Вы превысили количество запросов');
  }
  switch (json.errors[0].value) {
    case 'token_expired':
      serverResponse.error(hh.StatusCode.auth, 'Авторизуйтесь снова');
      break;
    case 'bad_authorization':
      serverResponse.error(hh.StatusCode.auth, 'Авторизуйтесь снова');
      break;
    case 'application_not_found':
      serverResponse.error(hh.StatusCode.auth, 'Обратитесь к разработчикам,' +
                                'приложение удалили');
      break;
    default: serverResponse.ok(JSON.stringify(json));
  }
};
