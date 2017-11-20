let answer = document.getElementById("answer");
let attempt = document.getElementById("attempt");
let results = document.getElementById("results");

let correctPosition = `<span class="glyphicon glyphicon-ok"></span>`;
let inAnswer = `<span class="glyphicon glyphicon-transfer"></span>`;
let notInAnswer = `<span class="glyphicon glyphicon-remove"></span>`;

function guess() {
  let input = document.getElementById("user-guess");
  //add functionality to guess function here
  if (answer.value === "" && attempt.value === "") {
    setHiddenFields();
  }
  if (validateInput(input.value)) {
    attempt.value = Number(attempt.value) + 1;
  } else {
    return false;
  }
  if (getResults(input.value)) {
    setMessage("You Win! :)");
    showAnswer(true);
    showReplay();
  } else if (attempt.value >= 10) {
    setMessage("You Lose! :(");
    showAnswer(false);
    showReplay();
  } else {
    setMessage("Incorrect, try again.");
  }
}

//implement new functions here
function setHiddenFields() {
  answer.value = Math.floor(Math.random() * 1000);
  answer.value = "0".repeat(4 - answer.value.length) + answer.value;
  attempt.value = 0;
}

function setMessage(value) {
  message.textContent = value;
}

function validateInput(value) {
  if (value.length !== 4) {
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
  }
  return true;
}

function getResults(value) {
  const valuesAsGlyphs = value
    .split("")
    .map((digit, i) => {
      if (digit === answer.value[i]) {
        return correctPosition;
      }
      if (answer.value.includes(digit)) {
        return inAnswer;
      }
      return notInAnswer;
    })
    .join("");
  results.innerHTML =
    results.innerHTML +
    `<div class="row"><span class="col-md-6">${value}</span><span class="col-md-6">${valuesAsGlyphs}</span></div>`;
  return value === answer.value;
}

function showAnswer(isWinner) {
  const code = document.getElementById("code");
  code.textContent = answer.value;
  code.classList.add(isWinner ? "success" : "failure");
}

function showReplay() {
  document.getElementById("guessing-div").style.display = "none";
  document.getElementById("replay-div").style.display = "block";
}
