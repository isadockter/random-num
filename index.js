'use strict';

// vars to be changed w the game logic (when replayed)
// sets an initial answer & empty array to hold all user guesses
let answer = Math.ceil(Math.random() * 100);
let totalGuesses = [];

// CREATING BOARD OF BUTTONS
function createBoard(totalNums) {
    let html = ``;
    // looping thru the total num of buttons
    for (let i = 0; i < totalNums; i++) {
        // creating each button
        html += `<button class='guess-btn' data-num=${i+1}> ${i+1} </button>`
    }
    // adding all of those button to the board
    document.querySelector('.board').insertAdjacentHTML('beforeend', html);
}

// GUESSING THE NUMBER
// takes an event from the number being clicked on
function guessNumber(event) {
    // reseting the error message so it doesn't stay on screen entire time
    document.querySelector('#errorMessage').textContent = '';
    // get the data-num from the btn that was clicked
    let guess = event.target.getAttribute('data-num');
    // if guess = answer, make green AND game is over
    guess = parseInt(guess);
    if (guess == answer) {
        event.target.style.background = 'green';
        event.target.style.cursor = 'auto';
        // option to replay
        document.querySelector('#resetBtn').classList.remove('disabled');
        totalGuesses.push(guess);
        // displaying user progress
        document.querySelector('#userProgress').textContent = `You Won! ${guess} was the correct number`;
    // else if the guess has already been made/already in the totalGuesses array
    // don't add to array/count it as a guess and just move on
    } else if (totalGuesses.includes(guess)) {
        document.querySelector('#errorMessage').textContent = `You already guessed ${guess}! Make a different guess :)`;
    // ELSE = not a correct guess
    } else if (totalGuesses.includes(answer)) {
        document.querySelector('#errorMessage').textContent = `You already won! Click RESET`;
    } else {
        // if its too high, make red
        if (guess > answer) {
            event.target.style.background = 'red';
            event.target.style.cursor = 'auto';
            // displaying user progress
            document.querySelector('#userProgress').textContent = `${guess} is too high, guess a lower number`;
        // if its too low, make yellow
        } else {
            event.target.style.background = 'yellow';
            event.target.style.cursor = 'auto';
            document.querySelector('#userProgress').textContent = `${guess} is too low, guess a higher number`;
        }
        // finally, add that guess into the totalGuesses
        totalGuesses.push(guess);
        console.log(guess, answer);
    }

    // displaying user progress
    // displaying total guess
    document.querySelector('#totalGuess').textContent = `Total Guesses: ${totalGuesses.length}`;
} 

// TRY AGAIN
function tryAgain(event) {
    // make reset btn disabled
    document.querySelector('#resetBtn').classList.add('disabled');   

    // reset inital game vars
    totalGuesses = [];
    answer = Math.ceil(Math.random() * 100);
    document.querySelector('#userProgress').textContent = '';
    document.querySelector('#totalGuess').textContent = '';
    document.querySelector('#errorMessage').textContent = '';

    // clear the board to reset everything
    document.querySelectorAll('.guess-btn').forEach((btn) => {
        btn.style.background = 'rgb(228, 228, 228)';
    });
}


// MAIN
function init() {
    // populate the board w buttons
    createBoard(100);

    // adding an event listener to ALL btns
    document.querySelectorAll('.guess-btn').forEach((btn) => {
        // when a btn is clicked, make a guess
        btn.addEventListener('click', guessNumber);
    });

    // if reset btn is clicked, reset the entire game
    // also reset btn isn't available until the game is over, user can't reset in the middle of a game
    document.querySelector('#resetBtn').addEventListener('click', tryAgain);
}
init();