var test = [['h','e','-','l','o'],['w','o','r','l','d']];
var solution = [];
var x;
var y;
var minutes;
var seconds;
var interval;
var redraw;
var shouldTime;

/* Handle arrow keys */
window.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38: //up arrow
      if (__legalSpace(x - 1, y)) {
        __unhighlight(x,y);
        x -= 1; 
        __highlight(x, y);
      }
      break;
    case 37: //left arrow
      if (__legalSpace(x, y - 1)) {
        __unhighlight(x,y);
        y -= 1; 
        __highlight(x, y);      
      }
      break;
    case 40: //down arrow
      if (__legalSpace(x + 1, y)) {
        __unhighlight(x,y);
        x += 1; 
        __highlight(x, y);
      }
      break;
    case 39: //right arrow
      if (__legalSpace(x, y + 1)) {
        __unhighlight(x,y);
        y += 1; 
        __highlight(x, y);
      }
      break;
  }
  //window.alert(x + ',' + y);

}

/* Creates a new game board (should only be called once) */
function start () {
  for (var i = 0; i < test.length; i++) {
    var tr = "<tr>";
    for (var j = 0; j < test[i].length; j++) {
      tr += '<td id="td' + i + j + '"><p id="' + i + j + '"></p></td>'; 
    }
    tr += '</tr>';
    $('#table').append(tr);
    solution.push([]);
  }
  for (var i = 0; i < test.length; i++) {
    for (var j = 0; j < test[i].length; j++) {
      if (test[i][j] === '-') {
        $('#td' + i + j).css({ 'background-color': '#000' });
        solution[i][j] = '-';
      }
    }
  }
  x = 0;
  y = 0;
  minutes = 0;
  seconds = 0;

  shouldTime = true;
  
  timer();

  __highlight();
  $('#start').hide();
  $('form[name="character"]').show();
  $('#hint').show();
  $('#restart').show();
}

/* Clears all cells of the game board */
function restart() {

  // Look at other functions to get started

  // This is just to get you started
  $('input').each(function () {
    $(this).removeAttr('disabled');
  });

  for (var i = 0; i < test.length; i++) {
    for (var j = 0; j < test[i].length; j++) {
      if (__legalSpace(j, i)) {
        $('#' + i + j).text("");
      } 
    }
  }

  minutes = 0;
  seconds = 0;
}

function checkComplete() {
  if (solution.length !== test.length) {
    return false;
  }
  for (var i = 0; i < solution.length; i++) {
    if (solution[i].length !== test[i].length) {
      return false;
    }
    for (var j = 0; j < solution[i].length; j++) {
      if (!__checkSpace(i, j)) {
        return false;
      }
    }
  } 
  return true;
}

function hint() {
  clearTimeout(redraw);
  for (var i = 0; i < solution.length; i++) {
    for (var j = 0; j < solution[i].length; j++) {
      // fix this
      if (test[i][j] === $('#' + i + j).val()) {
        $('#td' + i + j).css({ "background-color" : "#f48d8d" });
      }
      // and this
      else if (test[i][j] !== $('#' + i + j).val()) {
        $('#td' + i + j).css({ "background-color" : "#fff" });
      }
    }
    if (solution[i].length < test[i].length) {
      for (var j = solution[i].length; j < test[i].length; j++) {
        // and this
        if (false) {
          $('#td' + i + j).css({ "background-color" : "#f48d8d" });
        }
      }
    }
  }
  if (solution.length < test.length) {
    for (var i = solution.length; i < test.length; i++) {
      for (var j = 0; j < test[i].length; j++) {
        // and this
        if (false) {
          $('#td' + i + j).css({ "background-color" : "#f48d8d" });
        }
      }
    }
  }
  redraw = setTimeout(function () {
    for (var i = 0; i < test.length; i++) {
      for (var j = 0; j < test[i].length; j++) {
        // and this
        if (true) {
          $('#td' + i + j).css({ "background-color" : "#fff" });
        }
      }
    }
    __highlight();
  }, 3000);
}

function timer() {
  if (shouldTime) {
    __updateTime;
    setInterval(__updateTime, 1000); 
  }
}

function insertChar(character) {
  if (character == undefined) {
    character = $('#characterInput').val();
  }
  if (character === " " || isNaN(character)) {
    $('#' + y + x).text($('#' + y + x).text().replace(/./g, ''));
    $('#characterInput').val('');

    // Two lines here should do it
    $('#' + x.toString() + y.toString()).text(character);

    if (checkComplete()) {
      shouldTime = false;
      $('input').each(function () {
        $(this).attr('disabled', 'true');
      });
    }
  }
  return false;
}

function __unhighlight() {
  clearTimeout(redraw);
  for (var i = 0; i < test.length; i++) {
    for (var j = 0; j < test[i].length; j++) {
      if (__legalSpace(i,j)) {
        $("#td" + i + j).css({ "background-color": "#fff" });
      }
    }
  }
}

function __highlight() {
  $("#td" + x + y).css({ "background-color": "#e6e6e6" });
}

function __legalSpace(i,j) {
  if (i < 0 || i >= test.length) {
    return false;
  }
  if (j < 0 || j >= test[i].length) {
    return false;
  }
  if (test[i][j] === '-') {
    return false;
  }
  return true;
}

function __updateTime() {
  seconds = seconds + 1;
  if (seconds == 60) {
    minutes += 1;
    seconds = 0;
  }
  $('#time').text(minutes + ':' + ('0' + seconds).slice(-2));
}

function __checkSpace(i, j) {
  if (solution[i][j] && test[i][j].toUpperCase() === solution[i][j].toUpperCase()) {
    return true;
  }
  return false;
}
