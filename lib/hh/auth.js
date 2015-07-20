

/**
 * @param {hh.Response} response
 * @param {string} payload
 */
hh.getToken = function(response, payload) {
  var data = 'grant_type=authorization_code&' +
      'client_id=KT12L7PO6LPMCJM6KL606EE97BE7PV4JSQLVUK83R8A72M962O18CS3VN4' +
      'UGGALU&' +
      'client_secret=S18HBGSUU5R2FR6OMGJ3NO91MS96IC21P282A4NLR0DQRPF055PSJO' +
      'TQB8V3JNN4&' +
      'code=' + payload +
      '&redirect_uri=http://hr.livetex.ru/auth';

  hh.token(response, data);
};


/**
 * @param {hh.Response} response
 * @param {string} payload
 */
hh.refreshToken = function(response, payload) {
  var data = 'grant_type=refresh_token&refresh_token=' + payload;
  hh.token(response, data);
};


/**
 * @param {hh.Response} serverResponse
 * @param {string} data
 */
hh.token = function(serverResponse, data) {
  var options = {
    host: 'hh.ru',
    method: 'POST',
    path: '/oauth/token?' + data,
    headers:
        {'Content-Type': 'application/x-www-form-urlencoded'}
  };
  var request = https.request(options, function(response) {
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      //var json = JSON.parse(body);
      serverResponse.ok(body);
    });
  });
  request.on('error', function(error) {
    serverResponse.error(hh.StatusCode.INTERNAL_SERVER_ERROR,
        'error from hh is' + error);
  });
  request.end();
};
