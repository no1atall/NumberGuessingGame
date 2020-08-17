// Game Values
let min = 1,
  max = 100,
  winningNum = rand(max),
  guessesRemaining = 7,
  guesses = [];

//UI
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessedNums = document.querySelector("#guessed-nums"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  hint = document.querySelector("#hint"),
  guessesLeft = document.querySelector("#guesses-remaining");

//Assign Ui
minNum.textContent = min;
maxNum.textContent = max;
guessedNums.textContent = guesses;

//Play Again event listener
game.addEventListener("mousedown", function (e) {
  if (
    e.target.className === "massive ui violet button center aligned play-again"
  ) {
    window.location.reload();
  }
});

//listen for button press
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //   guessList(guess);

  //Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
    guessList(guess);
  }
});

//add value to our guess list
function guessList(guessnum) {
  if (guesses.includes(guessnum)) {
    hint.classList.remove("violet");
    guessInput.value = "";
    setMessage(
      `You have already guessed ${guessnum}! Try another number.`,
      "red"
    );
  } else {
    guesses.push(guessnum);
    guessesRemaining -= 1;
    guessesLeft.textContent = guessesRemaining;

    // Check if the nubmer is correct
    if (guessnum === winningNum) {
      guessedNums.textContent = guesses;

      gameOver(true, `You have guessed the number!`);
    } else if (guessnum < winningNum) {
      guessedNums.textContent = guesses;
      guessInput.value = "";
      if (guessesRemaining === 0) {
        //Game Over
        gameOver(
          false,
          `O on! You ran out of guesses and lost! The correct number was ${winningNum}.`
        );
      } else {
        // Another Guess
        setMessage(`Your guess is UNDER the correct number!`, "violet");
      }
    } else if (guessnum > winningNum) {
      guessedNums.textContent = guesses;
      guessInput.value = "";
      if (guessesRemaining === 0) {
        //Game Over
        gameOver(
          false,
          `O on! You ran out of guesses and lost! The correct number was ${winningNum}.`
        );
      } else {
        // Another Guess
        setMessage(`Your guess is OVER the correct number!`, "violet");
      }
    }
  }
}

// Generate random num
function rand(max) {
  let num = Math.floor(Math.random() * max + 1);
  return num;
}

//Set Message
function setMessage(msg, color) {
  hint.textContent = msg;
  hint.classList.add(color);
}

//Game Over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  guessInput.disabled = true;
  hint.classList.remove("violet");

  setMessage(msg, color);

  guessBtn.textContent = "Play Again";
  guessBtn.className += " play-again";
}
