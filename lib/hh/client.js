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
      document.getElementById('1').innerHTML = '';
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
  })
}
