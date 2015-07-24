/**
 * @param {Object} path
 * @param {hh.Response} response
 * @param {string=} opt_payload
 */
hh.api = function(path, response, opt_payload) {
  var thisArray = [];
  var count = 0;
  hh.apiRequest(path.path, function(array) {
    console.log(array.length);
    for (var i in array) {
      hh.handler(path.pathname + '/' + array[i].id, response, opt_payload,
          function(resume) {
            count += 1;
            thisArray.push(resume);
            if (count === array.length) {
              var string = JSON.stringify(thisArray);
              response.ok(string);
            }
          });
    }
  }, response, opt_payload);
};


/**
 * @param {string} path
 * @param {hh.Response} response
 * @param {string=} opt_payload
 * @param {function(!Object)} callback
 */
hh.handler = function(path, response, opt_payload, callback) {
  hh.sendRequest(path, function(resume) {
    //if (resume.errors[0].type === 'not_found') {
    //  console.log('Прав нет у тебя, блеать');
    //  hh.sendRequest(path, function(resume2) {
    //    console.log('resume2', resume2);
    //
    //    //callback(resume2);
    //    if (resume.contact) {
    //          callback(
    //              {
    //                fio: resume2.last_name + ' ' + resume2.first_name + ' ' +
    //                resume2.middle_name,
    //                phone: resume2.contact[0].value.country +
    //           resume2.contact[0].value.city + resume2.contact[0].value.number
    //              }
    //          );
    //    } else {
    //      callback({contact: 'NOT'});
    //    }
    //  }, response, opt_payload);
    //} else {
      console.log(resume);
      //callback(resume);
      if (resume.contact[0]) {
          callback(
              {
                fio: resume.last_name + ' ' + resume.first_name + ' ' +
                resume.middle_name,
                phone: resume.contact[0].value.country +
                resume.contact[0].value.city + resume.contact[0].value.number,
                Email: resume.contact[1].value,
                age: resume.age,
                gender: resume.gender.name,
                title: resume.title
              }
          );
      } else {
        callback({contact: 'NOT'});
      }

    //}
  }, response, opt_payload);
};


/**
 * @param {Object} path
 * @param {hh.Response} response
 * @param {string=} opt_payload
 */
hh.request = function(path, response, opt_payload) {
  console.log('path блеать', path.path);
  hh.sendRequest(path.path, function(data) {

    var string = JSON.stringify([data]);
    response.ok(string);
  }, response, opt_payload);
};


/**
 * @param {string} path
 * @param {function(!Object)} callback
 * @param {hh.Response} response
 * @param {string=} opt_payload
 */
hh.apiRequest = function(path, callback, response, opt_payload) {
  var thisArray = [];
  var page = 0;

  function send(page) {
    hh.sendRequest(path + '&page=' + page + '&per_page=2', function(data) {
      console.log('data', data);
      console.log(path);
      if (data.items.length === 500 && data.page === 3) {
        thisArray = thisArray.concat(data.items);
        send(++page);
      }
      else {
        thisArray = thisArray.concat(data.items);
        callback(thisArray);
      }
    }, response, opt_payload);
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
  console.log(options.headers);
  var request = https.request(options, function(response) {
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      console.log(path);
      var json = JSON.parse(body);
      if (json.errors) {
        hh.errorHandler(json, serverResponse);
      } else {
        callback(json);
      }
    });
  });
  request.on('error', function(error) {
    serverResponse.error(hh.StatusCode.INTERNAL_SERVER_ERROR,
        'error from hh is' + error);
  });
  request.end();
};
