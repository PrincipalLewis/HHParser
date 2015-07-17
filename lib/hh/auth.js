

/**
 * @param {hh.Response} response
 * @param {string} payload
 */
hh.getToken = function(response, payload) {
  var data = 'grant_type=authorization_code&' +
      'client_id=KT12L7PO6LPMCJM6KL606EE97BE7PV4JSQLVUK83R8A72M962O18CS3V' +
      'N4UGGALU&client_secret=S18HBGSUU5R2FR6OMGJ3NO91MS96IC21P282A4NLR0D' +
      'QRPF055PSJOTQB8V3JNN4&code=' + payload +
      '&redirect_uri=http://hr.livetex.ru/auth';

  hh.token(response, data);
};


/**
 * @param {hh.Response} response
 * @param {string} payload
 */
hh.refreshToken = function(response, payload) {

  //hh.token(response, data);
};


/**
 * @param {hh.Response} myResponse
 * @param {string} data
 */
hh.token = function(myResponse, data) {
  var options = {
    host: 'hh.ru',
    method: 'POST',
    path: '/oauth/token',
    headers:
        {'Content-Type': 'application/x-www-form-urlencoded'},
    body: data
  };
  var request = https.request(options, function(response) {
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      //var json = JSON.parse(body);
      myResponse.ok(body);
    });
  });
  request.on('error', function(error) {
    console.log(error);
  });
  request.end();
};
