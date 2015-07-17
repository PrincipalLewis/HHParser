function getVacancies() {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:1337/vacancies',
    success: function(msg) {
      var obj = JSON.parse(msg);
      console.log(obj);
      document.getElementById('1').innerHTML = '';
      document.getElementById('1').innerHTML = msg;
    },
    error: function(msg) {
      document.getElementById('body').innerHTML =
          '' + msg.status + ' ' + msg.statusText + '<br>' +
          msg.responseText;
    }
  });
}

function getOneResume() {
  $.ajax({
    type: 'post',
    url: 'http://localhost:1337/resumes',
    data: ''
  });
}


function redirect() {
  var clientId = 'KT12L7PO6LPMCJM6KL606EE97BE7PV4J' +
      'SQLVUK83R8A72M962O18CS3VN4UGGALU';

  window.location.replace('https://hh.ru/oauth/authorize?response_type=' +
      'code&client_id=' + clientId + '&redirect_uri=http://hr.livetex.ru/auth');
}
