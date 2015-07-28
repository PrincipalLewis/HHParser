/**
 * @param {Object} path
 * @param {hh.Response} response
 * @param {string=} opt_payload
 */
hh.api = function(path, response, opt_payload) {
  var thisArray = [];
  var count = 0;
  hh.apiRequest(path.path, function(array) {
    //console.log(array.length);
    for (var i in array) {
      //setTimeout(function() {
      hh.handler(path.pathname + '/' + array[i].id, response, opt_payload,
          function(resume) {
            //console.log(count);
            count += 1;
            //console.log(resume);
            thisArray.push(resume);
            if (count === array.length) {
              hh.saveData(response, thisArray);
              var string = JSON.stringify(thisArray);
              response.ok(string);
            }
          });
      //}, 33);

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
    //console.log(resume);
    //console.log(resume.contact);
    if (resume.contact[1]) {
      if (resume.contact[1].type.id === 'email') {
        var email = resume.contact[1].value;
      } else {
        email = resume.contact[2].value;
      }
    }

    if (resume.contact[0] && resume.gender) {
      var obj =
          {
            fio: resume.last_name + ' ' + resume.first_name + ' ' +
            resume.middle_name,
            title: resume.title,
            phone: resume.contact[0].value.country +
            resume.contact[0].value.city + resume.contact[0].value.number,
            email: email,
            age: resume.age,
            gender: resume.gender.name
          };
    } else if (!resume.contact[0] && resume.gender) {
      obj = {
        fio: resume.last_name + ' ' + resume.first_name + ' ' +
            resume.middle_name,
        title: resume.title,
        phone: 'Телефона нет',
        email: email,
        age: resume.age,
        gender: resume.gender.name
      };
    } else if (!resume.gender && resume.contact[0]) {
      obj = {
        fio: resume.last_name + ' ' + resume.first_name + ' ' +
            resume.middle_name,
        title: resume.title,
        phone: 'Телефона нет',
        email: email,
        age: resume.age,
        gender: 'Не указан пол'
      };
    } else if (!resume.gender && !resume.contact[0]) {
      obj = {
        fio: resume.last_name + ' ' + resume.first_name + ' ' +
            resume.middle_name,
        title: resume.title,
        phone: 'Телефона нет',
        email: email,
        age: resume.age,
        gender: 'Не указан пол'
      };
    }
    callback(obj);
    //}
  }, response, opt_payload);
};


/**
 * @param {Object} path
 * @param {hh.Response} response
 * @param {string=} opt_payload
 */
hh.request = function(path, response, opt_payload) {
  //console.log('path', path.path);
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
    hh.sendRequest(path + '&page=' + page + '&per_page=100', function(data) {
      //console.log('data', data);
      //console.log(path);
      if (data.found === 0) {
        response.error(404, 'По запросу ничего не найдено.');
      }
      if (data.items.length === 100 && data.page !== 4) {
        thisArray = thisArray.concat(data.items);
        send(++page);
      }
      else {
        thisArray = thisArray.concat(data.items);
        //console.log(thisArray.length);
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
  //console.log(options.headers);
  var request = https.request(options, function(response) {
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      //console.log(path);
      var json = JSON.parse(body);
      //console.log(json);
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
