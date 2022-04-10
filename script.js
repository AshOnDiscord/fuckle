console.log(wordArray);

const keyCodes = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
const keyLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

document.onkeydown = function(e){
  e = e || window.event;
  var key = e.which || e.keyCode;
  for (let i = 0; i < keyCodes.length; i++) {
    if (key == keyCodes[i]) {
      btnPress(keyLetters[i]);
      console.log(keyLetters[i]);
      break;
    } else if (key == 8) {
      deleteLast();
      break;
    } else if (key == 13) {
      enterAnswer();
      break;
    }
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
    notEnough();
  } else {
    console.log("Enough boxes");
    checkIfValid();
  }
}

function notEnough() {
  document.getElementById("notEnough").style.opacity = "1";
  setTimeout(function() {
    document.getElementById("notEnough").style.opacity = "0";
  }, 2000);
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

console.log(randomInt(3));

const correctMessages = ["Great!", "Nice!", "Genius",];

function correct() {
  document.getElementById("correct").getElementsByTagName("div")[0].innerHTML = correctMessages[randomInt(3)];
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
  inList = false;
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

