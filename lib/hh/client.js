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
    data: localStorage.getItem('access_token'),
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
  console.log(localStorage.getItem('access_token'));
  console.log(localStorage.getItem('expires_in'));
  console.log(localStorage.getItem('refresh_token'));
  $.ajax({
    type: 'post',
    url: 'http://localhost:1337/me',
    data: localStorage.getItem('access_token'),
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
    data: localStorage.getItem('refresh_token'),
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


function getLocalStorage() {
  console.log(localStorage.getItem('access_token'));
  console.log(localStorage.getItem('expires_in'));
  console.log(localStorage.getItem('refresh_token'));
}
var count = 1;
function addForm() {
  for (var i = 1; i <= count; i++) {
/*    document.getElementById('text' + i).innerHTML;*/
  }
  document.getElementById('form').innerHTML +=
      '<div class="form-group">' +
      '<label class="sr-only" for="text' + count + '">Text</label>' +
      '<input type="text" class="form-control" id="text' + count++ + '"' +
      ' placeholder="Параметр поиска">' +
      '</div>';
}
