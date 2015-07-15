/**
 * @namespace
 */
var hh = {};

/**
 * точка входа
 */
hh.init = function() {
  hh.vacancies();
};


/**
 *
 */
hh.vacancies = function() {
  hh.sendRequest('/vacancies', function(data) {
    console.log(data)
  });
};


/**
 * @param {string} path
 * @param {function(Array)} callback
 */
hh.apiRequest = function(path, callback) {
  var thisArray = [];
  var page = 1;
  function send(page) {
    hh.sendRequest(path + '?page=' + page + '&per_page=500', function(data) {
      if (data.length === 500 ) {
        thisArray = thisArray.concat(data);
        send(++page);
      }
      else {
        thisArray = thisArray.concat(data);
        callback(thisArray);
      }
    });
  }
  send(page);
};


/**
 * @param {string} path
 * @param {function(!Object)} callback
 */
hh.sendRequest = function(path, callback) {
  var options = {
    host: 'api.hh.ru',
    method: 'GET',
    path: path,
    headers:
    {'User-Agent': 'test (dflz666@gmail.com)'}
  };
  var request = https.request(options, function(response) {
      var body = '';
      response.on('data', function (chunk) {
        body += chunk;
      });
      response.on('end', function () {
        console.log(path);
        console.log(body);
        var json = JSON.parse(body);

        callback(json);
      });
  });
  request.on('error', function(e) {
    console.error('and the error is ' + e);
  });
  request.end();
};