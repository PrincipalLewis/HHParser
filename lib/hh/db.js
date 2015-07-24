

/**
 * @param {Object} data
 */
hh.writeToDb = function(data) {
  console.log(data);
};


/**
 * @param {hh.Response} response
 * @param {string} data
 */
hh.saveData = function(response, data) {
  //var obj = JSON.parse(data);
  var csvData = convertToCSV(data);
  console.log(csvData);
  fs.writeFile('message.txt', csvData, function(err) {
    if (err) {
      response.error(500, 'Данные не сохранены');
    } else {response.ok()}

  });

};

function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ',';

      line += array[i][index];
    }

    str += line + '\r\n';
  }

  return str;
}