console.log(wordArray);

document.onkeydown = function(e){
  e = e || window.event;
  var key = e.which || e.keyCode;
  switch (key) {
    case 65:
      btnPress("a");
      break;
    case 66:
      btnPress("b");
      break;
    case 67:
      btnPress("c");
      break;
    case 68:
      btnPress("d");
      break;
    case 69:
      btnPress("e");
      break;
    case 70:
      btnPress("f");
      break;
    case 71:
      btnPress("g");
      break;
    case 72:
      btnPress("h");
      break;
    case 73:
      btnPress("i");
      break;
    case 74:
      btnPress("j");
      break;
    case 75:
      btnPress("k");
      break;
    case 76:
      btnPress("l");
      break;
    case 77:
      btnPress("m");
      break;
    case 78:
      btnPress("n");
      break;
    case 79:
      btnPress("o");
      break;
    case 80:
      btnPress("p");
      break;
    case 81:
      btnPress("q");
      break;
    case 82:
      btnPress("r");
      break;
    case 83:
      btnPress("s");
      break;
    case 84:
      btnPress("t");
      break;
    case 85:
      btnPress("u");
      break;
    case 86:
      btnPress("v");
      break;
    case 87:
      btnPress("w");
      break;
    case 88:
      btnPress("x");
      break;
    case 89:
      btnPress("y");
      break;
    case 90:
      btnPress("z");
      break;
    case 13:
      enterAnswer();
      break;
    case 8:
      deleteLast();
      break;
    default:
      break;
  }
};

function btnPress(btn) {
  console.log(btn);
  freeBox = document.getElementsByClassName('currentRow')[0].getElementsByClassName('emptyBox')[0];
  freeBox.innerHTML = btn.toUpperCase();
  freeBox.classList.remove('emptyBox');
  freeBox.classList.add('fullBox');
}

function deleteLast() {
  boxes = document.getElementsByClassName('currentRow')[0].getElementsByClassName('fullBox').length;
  deletedBox = document.getElementsByClassName('currentRow')[0].getElementsByClassName('fullBox')[boxes - 1];
  deletedBox.innerHTML = "";
  deletedBox.classList.remove('fullBox');
  deletedBox.classList.add('emptyBox');
}

function enterAnswer() {
  console.log("enter");
  currentRow = document.getElementById('grid').getElementsByClassName('currentRow')[0];
  if (currentRow.getElementsByClassName('fullBox').length < 5) {
    console.log("Not enough boxes");
    alert("Not enough boxes");
    notEnough();
  } else {
    console.log("Enough boxes");
    alert("Enough boxes");
    checkIfValid();
  }
}

function notEnough() {
  document.getElementById("notEnough").style.opacity = "1";
  setTimeout(function() {
    document.getElementById("notEnough").style.opacity = "0";
  }, 2000);
}

function correct() {
  document.getElementById("correct").style.opacity = "1";
  setTimeout(function() {
    document.getElementById("correct").style.opacity = "0";
  }, 2000);
}

function invalid() {
  document.getElementById("invalid").style.opacity = "1";
  setTimeout(function() {
    document.getElementById("invalid").style.opacity = "0";
  }, 2000);
}

let somewhereElse = false;

answer = ['F', 'U', 'R', 'R', 'Y'];
fullAnswer = 'FURRY';


function checkIfValid() {
  boxes = document.getElementsByClassName('currentRow')[0].getElementsByClassName('fullBox');
  fullGuess = boxes[0].innerHTML + boxes[1].innerHTML + boxes[2].innerHTML + boxes[3].innerHTML + boxes[4].innerHTML;
  console.log(fullGuess);
  for (let l = 0; l < wordArray.length; l++) {
    if (fullGuess.toLowerCase() == wordArray[l]) {
      console.log("valid");
      checkAnswer();
      inList = true;
      break;
    } else {
      console.log("invalid");
    }
  }
  if (inList == false) {
    invalid();
  }
}

function checkAnswer() {
  currentRow = document.getElementById('grid').getElementsByClassName('currentRow')[0];
  for (i = 0; i < 5; i++) {
    if (currentRow.getElementsByClassName('fullBox')[i].innerHTML == answer[i]) {
      console.log("Correct");
      currentRow.getElementsByClassName('fullBox')[i].style.backgroundColor = "#6aaa64";
      currentRow.getElementsByClassName('fullBox')[i].style.color = "#ffffff";
    } else {
      somewhereElse = false;
      for (j = 0; j < 5; j++) {
        if (currentRow.getElementsByClassName('fullBox')[i].innerHTML == answer[j]) {
          console.log("Some where else");
          currentRow.getElementsByClassName('fullBox')[i].style.backgroundColor = "#c9b458";
          currentRow.getElementsByClassName('fullBox')[i].style.color = "#ffffff";
          somewhereElse = true;
        }
        if (somewhereElse == false) {
          console.log("Wrong");
          currentRow.getElementsByClassName('fullBox')[i].style.backgroundColor = "#86888a";
          currentRow.getElementsByClassName('fullBox')[i].style.color = "#ffffff";
        }
      }
    }
  }
  boxes = document.getElementsByClassName('currentRow')[0].getElementsByClassName('fullBox');
  fullGuess = boxes[0].innerHTML + boxes[1].innerHTML + boxes[2].innerHTML + boxes[3].innerHTML + boxes[4].innerHTML;
  console.log(fullGuess);
  if (fullGuess == fullAnswer) {
    correct();
  }
  swapRow();
}

function swapRow () {
  currentRow = document.getElementById('grid').getElementsByClassName('currentRow')[0]
  currentRow.classList.remove('currentRow');
  currentRow.classList.add('pastRow');
  futureRow = document.getElementById('grid').getElementsByClassName('futureRow')[0];
  futureRow.classList.remove('futureRow');
  futureRow.classList.add('currentRow');
}

