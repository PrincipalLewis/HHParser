/**
 * @param {Object} json
 * @param {hh.Response} serverResponse
 */
hh.errorHandler = function(json, serverResponse) {
  console.log(json);
  if (json.errors[0].type === 'bad_request') {
    serverResponse.error(404, 'bad_request');
  }
  switch (json.errors[0].value) {
    case 'token_expired':
      serverResponse.error(hh.StatusCode.auth, 'token_expired');
      break;
    case 'bad_authorization':
      serverResponse.error(hh.StatusCode.auth, 'bad_authorization');
      break;
    default: serverResponse.ok(JSON.stringify(json));
  }
};
