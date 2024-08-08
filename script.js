"use strict";

let secretNumber = Math.round(Math.random() * 20) + 1;
let scoreValue = 10;
let highScore = 0;

//Audio file
const loose = document.getElementById("loose");
const win = document.getElementById("win");

//Initial score declaration
document.querySelector(".score-value").textContent = scoreValue;
document.querySelector(".high-score-value").textContent = highScore;

//Set value by className
function revealValue(className, value) {
  document.querySelector(`.${className}`).value = `${value}`;
}

//Set message by className
function displayMessage(className, message) {
  document.querySelector(`.${className}`).textContent = `${message}`;
}
//Game over
function handleZeroScore() {
    document.querySelector(".btn-container").style.display = "none";
    displayMessage("result", "Ooops! you lost the game");
    displayMessage("score-value", 0);
    textFlickerEffect("result", "#ff036a");
    loose.play();
  }

//Flickering text effect
function textFlickerEffect(className, textColor) {
  let element = document.querySelector(`.${className}`);
  if (element) {
    element.style.color = `${textColor}`;
    element.classList.add("flicker");
  } else {
    console.error("No element passed...");
  }
}

document.querySelector(".btn--check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess-number").value);

  if (!guess) {
    displayMessage("result", "Oops no number");
  } else if (guess === secretNumber) {
    document.querySelector(".btn-container").style.display = "none";
    displayMessage("result", "Correct guess!");
    revealValue("to-find-number", secretNumber);
    textFlickerEffect("result", "#94d82d");
    if (highScore < scoreValue) {
      highScore = scoreValue;
      displayMessage("high-score-value", highScore);
    }
    win.play();
  } else if (guess !== secretNumber) {
    if (scoreValue > 1 && guess > secretNumber) {
      displayMessage("result", "Too high...");
      scoreValue--;
      displayMessage("score-value", scoreValue);
    } else if (scoreValue > 1 && guess < secretNumber) {
      displayMessage("result", "Too low...");
      scoreValue--;
      displayMessage("score-value", scoreValue);
    } else {
      handleZeroScore();
    }
  } else {
    displayMessage("result", "Start guessing...");
  }
});

document.querySelector(".btn--play").addEventListener("click", function () {
  win.pause();
  win.currentTime = 0;
  loose.pause();
  loose.currentTime = 0;
  scoreValue = 10;
  document.querySelector(".btn-container").style.display = "flex";
  secretNumber = Math.round(Math.random() * 20) + 1;
  document.querySelector(".result").style.color = "#fff";
  document.querySelector(".result").classList.remove("flicker");
  displayMessage("result", "Start guessing...");
  displayMessage("score-value", scoreValue);
  revealValue("to-find-number", "?");
  revealValue("guess-number", "");
});

document.querySelector(".btn--reset").addEventListener("click", function () {
  revealValue("guess-number", "");
  document.querySelector(".guess-number").focus();
});
