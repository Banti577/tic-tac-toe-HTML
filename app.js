let turnValue = ""; //By default x will start
let buttons = document.querySelectorAll(".cell");

const disabledBoxes = () => {
  for (let button of buttons) {
    button.style.pointerEvents = "none";
  }
};

if (turnValue === "") {
  disabledBoxes();
}

const setStartingPlayer = () => {
  let turn = document.querySelector("#turn");
  turnValue = turn.value;
  if (turnValue !== "") {
    console.log("i camwe gere");
    for (let button of buttons) {
      button.style.pointerEvents = "auto";
    }
    document.getElementsByClassName(
      "turn-selector-container"
    )[0].style.display = "none";
  }

  let display = (document.getElementsByClassName(
    "display"
  )[0].innerText = `Player ${turnValue}'s turn`);
};

const winnerPattern = [
  [0, 1, 2], // Top row
  [0, 3, 6], // Middle row
  [0, 4, 8], // Bottom row
  [1, 4, 7], // Left column
  [2, 5, 8], // Middle column
  [2, 4, 6], // Right column
  [3, 4, 5], // Diagonal from top-left to bottom-right
  [6, 7, 8], // Diagonal from top-right to bottom-left
];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.innerText = turnValue;
    turnValue = turnValue === "x" ? "o" : "x";

    // Update display for the next player's turn

    button.style.pointerEvents = "none";
    checkWinner();
  });
});

const showDraw = () => {
  let result = document.querySelector(".result");
  result.innerText = "It's a Draw!";
  disabledBoxes();
};

const checkWinner = () => {
  for (let pattern of winnerPattern) {
    // console.log(pattern[0],pattern[1], pattern[2])
    // console.log(buttons[pattern[0]])

    let pat1value = buttons[pattern[0]].innerText;
    let pat2value = buttons[pattern[1]].innerText;
    let pat3value = buttons[pattern[2]].innerText;

    if (pat1value != "" && pat2value != "" && pat3value != "") {
      if (pat1value === pat2value && pat2value === pat3value) {
        // console.log("got winner", pat1value);

        showWinner(pat1value);
        return true;
      }
    }
  }
  let isDraw = [...buttons].every((button) => button.innerText !== "");
  if (isDraw) {
    showDraw();
  }
};

const showWinner = (winner) => {
  let result = document.querySelector(".result");

  result.innerText = `Congratulations! Winner is ${winner}`;
  disabledBoxes();
};

const startNewGame = () => {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerText = "";
    // cell.style.pointerEvents = "auto"; // Re-enable clicks
  });

  // Reset turn selection
  turnValue = ""; // No player selected initially

  // Show turn selection dropdown again
  document.getElementsByClassName("turn-selector-container")[0].style.display =
    "flex";

  // Clear result display
  document.querySelector(".result").innerText = "";

  // Update UI message
  document.querySelector(".display").innerText = "Select Player first";
  startNewGame();
};

const resetGame = () => {
  startNewGame();
};
