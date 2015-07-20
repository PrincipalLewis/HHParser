/**
 * @param {string} path
 * @param {hh.Response} response
 * @param {string=} opt_payload
 */
hh.api = function(path, response, opt_payload) {
  hh.apiRequest(path, function(array) {
    for (var i in array) {
      hh.sendRequest(path + array[i].id, function(resume) {
        if (resume.contact[0].type.name === 'Мобильный телефон') {
          hh.writeToDb(
              {
                name: resume.last_name + ' ' + resume.first_name + ' ' +
                resume.middle_name,
                telephone: resume.contact[0].value.country +
                resume.contact[0].value.city + resume.contact[0].value.number
              }
          );
        }
      }, response);
    }
  }, response, opt_payload);
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
  }, response, opt_payload);
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
    hh.sendRequest(path + '?page=' + page + '&per_page=500', function(data) {
      if (data.items.length === 500 && data.page !== 3) {
        thisArray = thisArray.concat(data.items);
        send(++page);
      }
      else {
        thisArray = thisArray.concat(data.items);
        callback(thisArray);
      }
    }, response);
  }
  send(page);
};


/**
 * @param {string} path
 * @param {function(!Object)} callback
 * @param {hh.Response} serverResponse
 * @param {string=} opt_payload
 */
hh.sendRequest = function(path, callback, serverResponse, opt_payload) {
  if (opt_payload) {
    var options = {
      host: 'api.hh.ru',
      method: 'GET',
      path: path,
      headers: {'User-Agent': 'livetex (vadim.k@livetex.ru)',
        Authorization: 'Bearer ' + opt_payload}

    };
  } else {
    options = {
      host: 'api.hh.ru',
      method: 'GET',
      path: path,
      headers: {'User-Agent': 'livetex (vadim.k@livetex.ru)'}
    };
  }
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
