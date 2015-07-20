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
    url: 'http://localhost:1337/resumes/c781aa41ff023e525c0039ed1f6a4338784236',
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


function getResumes() {
  $.ajax({
    type: 'post',
    url: 'http://localhost:1337/resumes',
    data: 'U9F5QCBSUAHEH1Q9MQS25M9RPLKQDFUILNTGCP4IPA70OPSFICGDVB6P08CC53KI',
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

function me() {
  $.ajax({
    type: 'post',
    url: 'http://localhost:1337/me',
    data: 'U9F5QCBSUAHEH1Q9MQS25M9RPLKQDFUILNTGCP4IPA70OPSFICGDVB6P08CC53KI',
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
function refreshToken() {
  $.ajax({
    type: 'post',
    url: 'http://localhost:1337/refreshToken',
    data: 'UCVL1BFTB7A6H68B3LGNSQ50FOCRM2S6CRL852G5EAAFEATM3N4F2BLS4V1VN3QH',
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


function redirect() {
  var clientId = 'KT12L7PO6LPMCJM6KL606EE97BE7PV4J' +
      'SQLVUK83R8A72M962O18CS3VN4UGGALU';

  window.location.replace('https://hh.ru/oauth/authorize?response_type=' +
      'code&client_id=' + clientId + '&redirect_uri=http://hr.livetex.ru/auth');
}
