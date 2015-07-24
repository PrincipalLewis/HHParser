function getResumes() {
  var position = '&text=' + document.getElementById('text').value +
                 '&text.logic=all&text.field=title&text.period=all_time' +
      '&text=' + document.getElementById('text').value + '&text.logic=all&text.field=experience_position&text.period=last_three_years';

  var url = document.getElementById('text1').value.trim();
  url = url.replace(/,/gi, '%20');
  url = '&text=' + url + '&text.logic=any&text.field=everywhere&text.period=all_time';
  console.log(url);
  $.ajax({
    type: 'post',
    url: 'http://localhost:1337/resumes?area=2' + position + url,

    data: localStorage.getItem('access_token'),
    success: function(msg) {
      var obj = JSON.parse(msg);
      console.log(obj);
      document.getElementById('test').innerHTML = '';
      document.getElementById('test').innerHTML = msg;
    },
    error: function(msg) {
      document.getElementById('body').innerHTML =
          '' + msg.status + ' ' + msg.statusText + '<br>' +
          msg.responseText;
    }
  });
}
function getMyResumes() {
  $.ajax({
    type: 'post',
    url: 'http://localhost:1337/resumes/c781aa41ff023e525c0039ed1f6a4338784236',

    success: function(msg) {
      var obj = JSON.parse(msg);
      console.log(obj);
      document.getElementById('test').innerHTML = '';
      document.getElementById('test').innerHTML = msg;
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
    data: localStorage.getItem('access_token'),
    //data: '123123',
    success: function(msg) {
      document.getElementById('test').innerHTML = '';
      document.getElementById('test').innerHTML = msg;
    },
    error: function(msg) {
      //console.log(msg.responseText);
      if (msg.responseText === 'token_expired') {
        refreshToken();
      }
      if (msg.responseText === 'bad_authorization') {
        console.log('xuy');
      }
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
      document.getElementById('test').innerHTML = '';
      document.getElementById('test').innerHTML = msg;
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

function saveData() {
  var data = document.getElementById('test').innerHTML;
  console.log(data);
  $.ajax({
    type: 'post',
    url: 'http://localhost:1337/saveData',
    data: data,
    success: function() {
      document.getElementById('test').innerHTML = '';
      document.getElementById('test').innerHTML = 'Данные сохранены';
    },
    error: function(msg) {
      document.getElementById('body').innerHTML =
          '' + msg.status + ' ' + msg.statusText + '<br>' +
          msg.responseText;
    }
  });
}


function downloadFile() {
  //location.href = 'message.txt';
  document.getElementById('test').innerHTML = '';
  //document.getElementById('test').innerHTML +=

}


function deleteLocalStorage() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('expires_in');
  localStorage.removeItem('refresh_token');
}


function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ','

      line += array[i][index];
    }

    str += line + '\r\n';
  }

  return str;
}

function convert() {
  var resume = document.getElementById('test').innerHTML;
  resume = JSON.parse(resume);
  resume = resume[0];
  var bla =
      [
        {
          fio: resume.last_name + ' ' + resume.first_name + ' ' +
              resume.middle_name,
          phone: resume.contact[0].value.country +
              resume.contact[0].value.city + resume.contact[0].value.number
        },
        {
          fio: resume.last_name + ' ' + resume.first_name + ' ' +
              resume.middle_name,
          phone: resume.contact[0].value.country +
              resume.contact[0].value.city + resume.contact[0].value.number
        }
      ];
  //console.log(bla);
  //var a = convertToCSV(bla);
  document.getElementById('test').innerHTML = '';
  document.getElementById('test').innerHTML += JSON.stringify(bla);
}


function myAreas() {
  $.ajax({
    type: 'post',
    url: 'http://localhost:1337/areas/2',
    success: function(msg) {
      document.getElementById('test').innerHTML = '';
      document.getElementById('test').innerHTML = msg;
    },
    error: function(msg) {
      document.getElementById('body').innerHTML =
        '' + msg.status + ' ' + msg.statusText + '<br>' +
        msg.responseText;
    }
  });
}

