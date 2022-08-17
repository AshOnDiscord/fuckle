import words from "./words.js";

const randomWord = () => {
  while (true) {
    // random number between 0 and 25
    const randomIndex = Math.floor(Math.random() * 26);
    // number to letter
    const letter = String.fromCharCode(97 + randomIndex);
    const array = words[letter];
    // random number between 0 and array length
    const randomIndex2 = Math.floor(Math.random() * array.length);

    if (array[randomIndex2]) {
      return array[randomIndex2];
    }
  }
};

const recursiveFunction = function (arr, x, start, end) {
  // Base Condition
  if (start > end) return false;

  // Find the middle index
  let mid = Math.floor((start + end) / 2);

  // Compare mid with given key x
  if (arr[mid] === x) return arr[mid];

  // If element at mid is greater than x,
  // search in the left half of mid
  if (arr[mid] > x) return recursiveFunction(arr, x, start, mid - 1);
  // If element at mid is smaller than x,
  // search in the right half of mid
  else return recursiveFunction(arr, x, mid + 1, end);
};

const checkValid = (word) => {
  if (word.length !== 5) {
    return null;
  }
  if (word.charAt(0) === "x") {
    return false;
  }
  const array = words[word.charAt(0)];
  console.log(array);

  return recursiveFunction(array, word, 0, array.length - 1);
};

const answer = randomWord();
// console.log(answer);
let currentRow = 0;

const handle = (e) => {
  e.preventDefault();
  const word = document.querySelector("input");
  const result = checkValid(word.value.toLowerCase());
  if (result === null) {
    document.querySelector("#short").classList.remove("hide");
    document.querySelector("#short").classList.add("show");
    return;
  }
  if (result === false) {
    document.querySelector("#invalid").classList.remove("hide");
    document.querySelector("#invalid").classList.add("show");
    return;
  }

  const answerArray = answer.split("");
  const wordArray = word.value.split("");
  const resultArray = [];
  for (let i = 0; i < wordArray.length; i++) {
    if (answerArray[i] === wordArray[i]) {
      resultArray[i] = 2;
      answerArray[i] = "";
    }
  }
  for (let i = 0; i < wordArray.length; i++) {
    if (answerArray.includes(wordArray[i])) {
      resultArray[i] = 1;
      answerArray[answerArray.indexOf(wordArray[i])] = "";
    }
  }
  const currentRowEl = document.querySelectorAll(".row")[currentRow];
  const boxes = currentRowEl.querySelectorAll(".square");

  // console.log(wordArray);

  for (let i = 0; i < 5; i++) {
    if (resultArray[i] === 2) {
      boxes[i].classList.add("correct");
    } else if (resultArray[i]) {
      boxes[i].classList.add("somewhere");
    } else {
      boxes[i].classList.add("wrong");
    }
  }
  word.value = "";
  currentRow++;
  if (result === answer) {
    document.querySelector("#won").classList.remove("hide");
    document.querySelector("#won").classList.add("show");

    document.querySelector("form").removeEventListener("click", handle);
    document.querySelector("input").removeEventListener("keyup", inputHandle);
    document.querySelector("input").disabled = true;
    document.querySelector("form button").disabled = true;
    document
      .querySelector("form")
      .addEventListener("click", (e) => e.preventDefault());
  }
  // console.log(currentRow);
  if (currentRow > 5) {
    document.querySelector("#lost").classList.remove("hide");
    document.querySelector("#lost").classList.add("show");
    document.querySelector("#theWord").innerHTML = answer;
  }
};

document.querySelector("form").addEventListener("submit", handle);

const inputHandle = (e) => {
  if (e.currentTarget.value.length > 5) {
    e.currentTarget.value = e.currentTarget.value.slice(0, 5);
    const currentRowEl = document.querySelectorAll(".row")[currentRow];
    currentRowEl.classList.remove("shake");
    setTimeout(() => {
      currentRowEl.classList.add("shake");
    }, 0);
  }
  e.currentTarget.value = e.currentTarget.value.toLowerCase();

  const currentRowEl = document.querySelectorAll(".row")[currentRow];
  const boxes = currentRowEl.querySelectorAll(".square");
  boxes.forEach((box, index) => {
    // console.log(box.innerHTML, e.currentTarget.value.charAt(index));
    if (
      box.innerHTML !== e.currentTarget.value.charAt(index) &&
      e.currentTarget.value.charAt(index)
    ) {
      box.classList.remove("scaley");
      setTimeout(() => {
        box.classList.add("scaley");
      }, 0);
    }
    box.innerHTML = e.currentTarget.value.charAt(index);
  });
};

document.querySelector("input").addEventListener("keyup", inputHandle);

document.querySelectorAll("#lost button").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelector("#lost").classList.remove("show");
    document.querySelector("#lost").classList.add("hide");
  })
);

document.querySelectorAll("#won button").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelector("#won").classList.remove("show");
    document.querySelector("#won").classList.add("hide");
  })
);

document.querySelectorAll("#invalid button").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelector("#invalid").classList.remove("show");
    document.querySelector("#invalid").classList.add("hide");
  })
);

document.querySelectorAll("#short button").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelector("#short").classList.remove("show");
    document.querySelector("#short").classList.add("hide");
  })
);
