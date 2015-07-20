var search = window.location.search;
var code = search.split('=');

if (code[0] === '?code') {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:1337/code',
    data: code[1],
    success: function(msg) {
      console.log(msg);
      var obj = JSON.parse(msg);
      document.getElementById('1').innerHTML = '';
      document.getElementById('1').innerHTML = msg;
      window.location.replace('http://hr.livetex.ru');
    },
    error: function(msg) {
      document.getElementById('body').innerHTML =
          '' + msg.status + ' ' + msg.statusText + '<br>' +
          msg.responseText;
    }
  });
}
