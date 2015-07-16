


/**
 *
 * @param {http.IncomingMessage} response
 * @constructor
 */
hh.Response = function(response) {
  this.__httpResponse = response;
  this.__HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain' };
};


/**
 * @param {string} data
 */
hh.Response.prototype.ok = function(data) {

  this.__httpResponse.writeHead(hh.StatusCode.OK, this.__HEADERS);

  this.__httpResponse.end(data);
};


/**
 * @param {number} code
 * @param {string} message
 */
hh.Response.prototype.error = function(code, message) {
  this.__httpResponse.writeHead(code, this.__HEADERS);

  this.__httpResponse.end(message);
};
