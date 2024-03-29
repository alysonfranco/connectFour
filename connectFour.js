// Initial references
// Create global variables for the different elements in the document
// The querySelector() method returns the first element that matches a CSS selector
// The getElementById() method returns the element that matches the ID

// Declare constant container set equal to object document, method querySelector, passing as an argument class ".container"
const container = document.querySelector(".container");
// Declare constant playerTurn set equal to object document, method getElementById, passing as an argument id "playerTurn"
const playerTurn = document.getElementById("playerTurn");
// Declare constant message set equal to object document, method getElementById, passing as an argument id "message"
const message = document.getElementById("message");

// Declare variable initialMatrix as a 2d array, 6 rows, 7 columns, initialized to all 0s
let initialMatrix = [];

for (let row = 0; row < 6; row++) {
    initialMatrix[row] = [];
    for (let col = 0; col < 7; col++) {
        initialMatrix[row][col] = 0;
    }
}
// Declare variable currentPlayer to store the current player
let currentPlayer;
// Write function gameOverCheck
function gameOverCheck() {
    console.log("gameOverCheck");
    return false;
}

// Write function winCheck
function winCheck(row, column) {
    console.log("winCheck");
    return false;
}

// Write function setPiece
function setPiece(startCount, colValue) {
    console.log("setPiece");

    // Declare variable rows initialized to object document, method querySelectorAll, passing argument class ".grid-row"
    let rows = document.querySelectorAll(".grid-row");

    // If the element in array initialMatrix at indexes parameters startCount and colValue is NOT equal to 0
    if (initialMatrix[startCount][colValue] != 0) {
        //Declare variable currentRow initialized to array rows, index startCount, method querySelectorAll, passing as an argument class ".grid-box"
        let currentRow = rows[startCount].querySelectorAll(".grid-box");

        // Decrement parameter startCount by 1
        startCount--;

        // Call function setPiece, passing as arguments parameters startCount and colValue
        setPiece(startCount, colValue);
    } else { // Else
        // Declare variable currentRow initialized to array rows, index startCount, method querySelectorAll, passing as an argument class ".grid-box"
        let currentRow = rows[startCount].querySelectorAll(".grid-box");

        // Modify currentRow, index colValue, object classList, method add, passing as arguments "filled" and `player${currentPlayer}`
        currentRow[colValue].classList.add("filled", `player${currentPlayer}`);

        // Update array initialMatrix, indexes startCount and colValue, set equal to currentPlayer
        initialMatrix[startCount][colValue] = currentPlayer;

        // If function call winCheck, passing as arguments parameters startCount and colValue is true
        if (winCheck(startCount, colValue)) {
            // Set object message's innerHTML equal to `Player<span> ${currentPlayer}</span> wins`
            message.innerHTML = `Player<span>${currentPlayer}</span> wins`;
            // Return false
            return false;
        }
    }

    // Call function gameOverCheck
    gameOverCheck();
}

// Write function fillBox
function fillBox(e) {
    console.log("fillBox");
    // Declare variable colValue set equal to function parseInt() of parameter e, object target, function getAttribute, passing as argument "data-value"
    let colValue = parseInt(e.target.getAttribute("data-value"));
    // Call function setPiece, passing arguments 5 (because we have 6 rows, 0 - 5) and variable colValue
    setPiece(5, colValue);
    // Switch the currentPlayer, if currently 1 then 2, if currently 2, then 1
    if (currentPlayer === 1) {
        currentPlayer = 2;
    } else {
        currentPlayer = 1;
    }
    // Set playerTurn's innerHTML to `Player <span>${currentPlayer}'s</span> turn`
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

// Write function createBoard
function createBoard() {
    console.log("createBoard");
    // Iterate through the 2d array initialMatrix
    // Write an outer for loop to iterate through the rows, loop control variable row
    for (let row = 0; row < initialMatrix.length; row++) {
        // Declare variable outerDiv set equal to object document, method createElement, passing "div" as an argument
        let outerDiv = document.createElement("div");
        // Modify outerDiv, object classList, calling method add, passing argument "grid-row"
        outerDiv.classList.add("grid-row");
        // Modify outerDiv calling method setAttribute, passing arguments "data-value" and loop control variable row
        outerDiv.setAttribute("data-value", row);
        // Write an inner for loop to iterate through the columns, loop control variable col
        for (let col = 0; col < initialMatrix[row].length; col++) {
            // Set each element in array initialMatrix to the value of 0
            initialMatrix[row][col] = 0;
            // Declare variable innerDiv set equal to object document, method createElement, passing "div" as an argument
            let innerDiv = document.createElement("div");
            // Modify innerDiv, object classList, method add, passing argument "grid-box"
            innerDiv.classList.add("grid-box");
            // Modify innerDiv, calling method setAttribute, passing arguments "data-value" and loop control variable col
            innerDiv.setAttribute("data-value", col);
            // Modify innerDiv, method addEventListener, passing arguments "click" and (e) => { fillBox(e); }
            innerDiv.addEventListener("click", (e) => {
                fillBox(e);
            });
            // Modify outerDiv, method appendChild, passing argument innerDiv
            outerDiv.appendChild(innerDiv);
        }
        // Modify container. method appendChild, passing argument outerDiv
        container.appendChild(outerDiv);
    }
}

// Write function startGame
function startGame() {
    console.log("startGame");
    // Set currentPlayer to 1, player 1 always goes first
    currentPlayer = 1;
    // Set the container's innerHTML to an empty string
    container.innerHTML = "";
    // Call function createBoard
    createBoard();
    // Set playerTurn's innerHTML to `Player <span>${currentPlayer}'s</span> turn`
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

// For the window.onload event, call function startGame
window.onload = startGame;
