import prompt from "prompt";

// Start prompt
prompt.start();

// Ask user for ROCK, PAPER, or SCISSORS
prompt.get(["userSelection"], function (err: any, result: any) {
  if (err) {
    console.error("Error:", err);
    return;
  }

  // Convert user input to uppercase safely
  const userSelection = (result.userSelection as string)?.toUpperCase();
  if (!userSelection) {
    console.log("No input provided!");
    return;
  }

  // Generate computer selection
  const random = Math.random();
  let computerSelection = "";

  if (random <= 0.34) {
    computerSelection = "PAPER";
  } else if (random <= 0.67) {
    computerSelection = "SCISSORS";
  } else {
    computerSelection = "ROCK";
  }

  console.log("User Selection:", userSelection);
  console.log("Computer Selection:", computerSelection);

  // Decide who wins
  if (userSelection === computerSelection) {
    console.log("It's a tie!");
  } else if (
    (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (userSelection === "PAPER" && computerSelection === "ROCK") ||
    (userSelection === "SCISSORS" && computerSelection === "PAPER")
  ) {
    console.log("User Wins!");
  } else {
    console.log("Computer Wins!");
  }
});
