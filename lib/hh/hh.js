/**
 * @param {string} path
 * @param {hh.Response} response
 */
hh.api = function(path, response) {
  hh.apiRequest(path, function(array) {
    var string = JSON.stringify(array);
    response.ok(string);
  }, response);
};


/**
 * @param {string} path
 * @param {hh.Response} response
 * @param {string=} opt_payload
 */
hh.request = function(path, response, opt_payload) {
  hh.sendRequest(path, function(data) {
    var string = JSON.stringify(data);
    response.ok(string);
  }, response);
};


/**
 * @param {string} path
 * @param {function(!Object)} callback
 * @param {hh.Response} response
 */
hh.apiRequest = function(path, callback, response) {
  var thisArray = [];
  var page = 0;
  function send(page) {
    hh.sendRequest(path + '?page=' + page + '&per_page=1', function(data) {
      if (data.items.length === 500 && data.page !== 3) {
        thisArray = thisArray.concat(data.items);
        send(++page);
      }
      else {
        thisArray = thisArray.concat(data.items);
        callback(thisArray[0]);
      }
    }, response);
  }
  send(page);
};


/**
 * @param {string} path
 * @param {function(!Object)} callback
 * @param {hh.Response} serverResponse
 */
hh.sendRequest = function(path, callback, serverResponse) {
  var options = {
    host: 'api.hh.ru',
    method: 'GET',
    path: path,
    headers:
        {'User-Agent': 'test (dflz666@gmail.com)'}
  };
  var request = https.request(options, function(response) {
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      console.log(path);
      var json = JSON.parse(body);
      callback(json);
    });
  });
  request.on('error', function(error) {
    serverResponse.error(hh.StatusCode.INTERNAL_SERVER_ERROR,
        'error from hh is' + error);
  });
  request.end();
};
