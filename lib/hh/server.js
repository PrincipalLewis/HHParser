/**
 * @namespace
 */
var hh = {};


/**
 * точка входа
 */
hh.init = function() {
  hh.startServer(hh.router);
};


/**
 * @param {string} path
 * @param {string} payload
 * @param {hh.Response} response
 */
hh.router = function(path, payload, response) {
  console.log(path);
  switch (path) {
    case '/vacancies':
      hh.api(path, response);
      break;
    case '/resumes/c781aa41ff023e525c0039ed1f6a4338784236':
      hh.request(path, response, payload);
      break;
    case '/resumes':
      //console.log(path);
      hh.api(path, response, payload);
      break;
    case '/me':
      hh.request(path, response, payload);
      break;
    case '/code':
      hh.getToken(response, payload);
      break;
    case '/refreshToken':
      hh.refreshToken(response, payload);
      break;
    default: response.error(hh.StatusCode.NOT_FOUND, 'Page not found');
  }
};


/**
 * Server
 * @param {function(string, string, hh.Response)} requestHandler
 */
hh.startServer = function(requestHandler) {
  var server = new http.Server();
  server.addListener('request', function(request, response) {
    var data = '';
    var newResponse = new hh.Response(response);

    request.on('data', function(chunk) {
      data += chunk;
    });

    request.on('end', function() {
      var path = url.parse(request.url);
      console.log(path);
      requestHandler(path.pathname, data, newResponse);
    });
  });

  server.listen(1337, '127.0.0.1');
};
