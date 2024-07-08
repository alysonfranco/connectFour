import React from 'react';
import './ConnectFour.css';

class ConnectFour extends React.Component {
    // constructor
    constructor(props) {
        super(props);
        // state object 
        this.state = {
            initialMatrix: [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ],
            currentPlayer: 1,
        };
    }

    // fillbox function
    fillbox = (e) => {
        let colValue = parseInt(e.target.getAttribute('data-value'));

        this.setPiece(5, colValue);

        this.setState({
            currentPlayer: this.state.currentPlayer === 1 ? 2 : 1
        });
    }

    // setPiece function
    setPiece = (startCount, colValue) => {
        const initialMatrix = this.state.initialMatrix;

        let row = document.querySelectorAll(".grid-row");

        try {

            if (initialMatrix[startCount][colValue] !== 0) {
                startCount--;
                this.setPiece(startCount, colValue);
            } else {
                let currentRow = row[startCount].querySelectorAll(".grid-box");
                currentRow[colValue].classList.add("filled", `player${this.state.currentPlayer}`);

                initialMatrix[startCount][colValue] = this.state.currentPlayer;

                if (this.winCheck()) {
                    alert("Player " + this.state.currentPlayer + " wins!");
                    return true;
                }
            }
        } catch (e) {
            alert("Column is full, select again");
            this.gameOverCheck();
        }

    }

    //winCheck function
    winCheck = () => {
        if (this.checkHorizontal()) {
            return true;
        }

        if (this.checkVertical()) {
            return true;
        }

        if (this.checkPositiveDiagonal()) {
            return true;
        }

        if (this.checkNegativeDiagonal()) {
            return true;
        }

        // else return false
        return false;
    }

    //functions that chekc for a win in every direction

    // checkHorizontal function
    checkHorizontal = () => {
        const initialMatrix = this.state.initialMatrix;
        // Write a nest for loop to iterate through the columns and rows
        for (let row = 0; row < initialMatrix.length; row++) {
            for (let col = 0; col < initialMatrix[row].length - 3; col++) {
                // if the currentPlayer has four discs in a row horizontally, return true
                if (initialMatrix[row][col] === this.state.currentPlayer && initialMatrix[row][col + 1] === this.state.currentPlayer && initialMatrix[row][col + 2] === this.state.currentPlayer && initialMatrix[row][col + 3] === this.state.currentPlayer) {
                    return true;
                }
            }
        }
        // return false
        return false;
    }

    // checkVertical function
    checkVertical = () => {
        const initialMatrix = this.state.initialMatrix;
        // Write a nest for loop to iterate through the columns and rows
        for (let col = 0; col < initialMatrix[0].length; col++) {
            for (let row = 0; row < initialMatrix.length - 3; row++) {
                // if the currentPlayer has four discs in a row vertically, return true
                if (initialMatrix[row][col] === this.state.currentPlayer && initialMatrix[row + 1][col] === this.state.currentPlayer && initialMatrix[row + 2][col] === this.state.currentPlayer && initialMatrix[row + 3][col] === this.state.currentPlayer) {
                    return true;
                }
            }
        }
        // return false
        return false;
    }

    // chekcNegativeDiagonal function
    checkNegativeDiagonal = () => {
        const initialMatrix = this.state.initialMatrix;
        // Write a nest for loop to iterate through the rows and columns
        for (let row = 0; row < initialMatrix.length - 3; row++) {
            for (let col = 0; col < initialMatrix[row].length - 3; col++) {
                // if the currentPlayer has four discs in a row diagonally, bottom left to top right, return true
                if (initialMatrix[row][col] === this.state.currentPlayer && initialMatrix[row + 1][col + 1] === this.state.currentPlayer && initialMatrix[row + 2][col + 2] === this.state.currentPlayer && initialMatrix[row + 3][col + 3] === this.state.currentPlayer) {
                    return true;
                }
            }
        }
        // return false
        return false;
    }

    //checkPositiveDiagonal function
    checkPositiveDiagonal = () => {
        const initialMatrix = this.state.initialMatrix;
        // Write a nest for loop to iterate through the rows and columns
        for (let row = 0; row < initialMatrix.length - 3; row++) {
            for (let col = 3; col < initialMatrix[row].length; col++) {
                // if the currentPlayer has four discs in a row diagonally, bottom right to top left, return true
                if (initialMatrix[row][col] === this.state.currentPlayer && initialMatrix[row + 1][col - 1] === this.state.currentPlayer && initialMatrix[row + 2][col - 2] === this.state.currentPlayer && initialMatrix[row + 3][col - 3] === this.state.currentPlayer) {
                    return true;
                }
            }
        }
        // return false
        return false;
    }

    //gameOverCheck function
    gameOverCheck = () => {
        let count = 0;
        const initialMatrix = this.state.initialMatrix;

        for (let innerArray of initialMatrix) {
            // If object innerArray, function every(val => (val) != 0))
            if (innerArray.every(val => (val) !== 0)) {
                // increment variable count by 1
                count++;
            } else {
                // return false
                return false;
            }
        }

        // If variable count is equal to 6
        if (count === 6) {
            alert("Game Over");
            // return false
            return false;
        }
    }

    //render function
    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="grid-row">
                        <div className="grid-box" data-value="0" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="1" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="2" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="3" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="4" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="5" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="6" onClick={this.fillbox}></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-box" data-value="0" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="1" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="2" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="3" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="4" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="5" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="6" onClick={this.fillbox}></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-box" data-value="0" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="1" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="2" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="3" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="4" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="5" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="6" onClick={this.fillbox}></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-box" data-value="0" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="1" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="2" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="3" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="4" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="5" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="6" onClick={this.fillbox}></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-box" data-value="0" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="1" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="2" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="3" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="4" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="5" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="6" onClick={this.fillbox}></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-box" data-value="0" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="1" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="2" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="3" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="4" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="5" onClick={this.fillbox}></div>
                        <div className="grid-box" data-value="6" onClick={this.fillbox}></div>
                    </div>
                </div>
                <div id="information">
                    <div className="player-wrappers">
                        <p>Player 1</p>
                        <div className="player1"></div>
                    </div>
                    <div className="player-wrappers">
                        <p>Player 2</p>
                        <div className="player2"></div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ConnectFour;