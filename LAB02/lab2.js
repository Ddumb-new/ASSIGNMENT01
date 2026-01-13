// Importing the prompt package
const prompt = require("prompt");

// To start the prompt system
prompt.start();

// For userng to enter their choice
prompt.get(["userSelection"], function (err, result) {
    
    // To display error message incase it occurs
    if (err) {
        console.log("Error occurred");
        return;
    }

    // Storing user's input and converting it to uppercase
    let userSelection = result.userSelection.toUpperCase();
    // Display user's choice
    console.log("User selected:", userSelection);

    // Generating random number between 0 and 1 for computer's choice
    let randomNumber = Math.random();
    
    // Variable to store computer's choice
    let computerSelection = "";

    // Assign computer choice based on random number range
    if (randomNumber <= 0.34) {
        computerSelection = "PAPER";
    } else if (randomNumber <= 0.67) {
        computerSelection = "SCISSORS";
    } else {
        computerSelection = "ROCK";
    }

    // Displaying computer's choice
    console.log("Computer selected:", computerSelection);

    // For decalrign winner using Rock, scissors and papers
    if (userSelection === computerSelection) {
        console.log("It's a tie");
    } 
    // Conditions where user wins
    else if (
        (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
        (userSelection === "SCISSORS" && computerSelection === "PAPER") ||
        (userSelection === "PAPER" && computerSelection === "ROCK")
    ) {
        console.log("User Wins");
    } else {
        console.log("Computer Wins");
    }
});
