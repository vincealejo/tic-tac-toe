const TIC_TAC_TOE = (() => {
    let board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]
    const players = { one: null, two: null };
    let playerInTurn = null;

    function setPlayers(playerOne, playerTwo) {
        players.one = playerOne;
        players.two = playerTwo;
        playerInTurn = players.one;
    }

    function move(x, y) {
        if(board[x][y] !== null) return "invalid move";
        board[x][y] = playerInTurn.marker;
        const result = check();
        changeTurn();

        return result;
    }

    function createPlayer(name, marker) {
        return { name, marker }
    }

    function getPlayerInTurn() {
        return playerInTurn;
    }

    function changeTurn() {
        if(playerInTurn.marker === "o") {
            playerInTurn = players.two;
        }else {
            playerInTurn = players.one;
        }
    }

    function check() {
        const result = {isGameOver: false, winner: null};
        const combos = [
            ["00", "01", "02"],
            ["10", "11", "12"],
            ["20", "21", "22"],
            ["00", "10", "20"],
            ["01", "11", "21"],
            ["02", "12", "22"],
            ["00", "11", "22"],
            ["02", "11", "20"],
        ];
        
        let markedCount = 0;
        board.forEach((row) => {
            row.forEach((sqr) => {
                if(sqr !== null) {
                    markedCount++;
                }
            })
        })

        for (let i = 0; i < combos.length; i++) {
            const a1 = combos[i][0][0];
            const a2 = combos[i][0][1];
            const b1 = combos[i][1][0];
            const b2 = combos[i][1][1];
            const c1 = combos[i][2][0];
            const c2 = combos[i][2][1];            
            const squareOne = board[a1][a2];
            const squareTwo = board[b1][b2];
            const squareThree = board[c1][c2];
            
            if(squareOne === playerInTurn.marker && squareTwo === playerInTurn.marker && squareThree === playerInTurn.marker) {
                result.isGameOver = true;
                result.winner = playerInTurn;
            }

        }

        if(markedCount === 9 && result.winner === null) {
            result.isGameOver = true;
            result.winner = "draw";
        }


    
        return result;
    }

    function reset() {
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                board[i][j] = null;
            }
        }
        playerInTurn = players.one;

    }

    return {
        createPlayer, setPlayers, move, getPlayerInTurn, reset
    }
})();

(function game() {
    const menuModal = document.querySelector(".menu-modal");
    const boardEl = document.querySelector(".board");
    const playerOneNameInput = document.querySelector("#player-one-name");
    const playerTwoNameInput = document.querySelector("#player-two-name");
    const startButton = document.querySelector(".start-button");
    const gameOverScreen = document.querySelector(".gameover-screen");
    const playAgainButton = document.querySelector(".play-again-button");

    let playerOne;
    let playerTwo;
    let isGameover = false;

    startButton.addEventListener("click", (e) => {
        e.preventDefault();
        let pOneName = playerOneNameInput.value;
        let pTwoName = playerTwoNameInput.value;
        
        // default names if the user didn't input names
        if(pOneName === "") pOneName = "Player One";
        if(pTwoName === "") pTwoName = "Player Two";

        playerOne = TIC_TAC_TOE.createPlayer(pOneName, "o");
        playerTwo = TIC_TAC_TOE.createPlayer(pTwoName, "x");
        TIC_TAC_TOE.setPlayers(playerOne, playerTwo);
        switchScreen(menuModal, boardEl);
    })

    boardEl.addEventListener("click", (e) => {
        if(e.target.classList.contains("square")) {
            if(isGameover) return;

            const x = e.target.dataset.posX;
            const y = e.target.dataset.posY;

            const playerInTurn = TIC_TAC_TOE.getPlayerInTurn();
            const res = TIC_TAC_TOE.move(x, y);

            if(res === "invalid move") return;
            markSquare(e.target, playerInTurn.marker);

            if(res.isGameOver) {
                showWinner(res.winner); 
                isGameover = true;
            }
        }
    })

    playAgainButton.addEventListener("click", () => {
        TIC_TAC_TOE.reset();
        isGameover = false;
        resetSquares();
        switchScreen(gameOverScreen, boardEl);
    })


    // tools
    function switchScreen(current, target) {
        if(current !== "") {
            current.classList.add("hidden");
        }
        target.classList.remove("hidden");
    }

    function setColor(marker) {
        if(marker === "o") {
            return "#3f3fdf";
        } else {
            return "#df3f87";
        };
    }

    function showWinner(player) {
        const winnerName = document.querySelector(".winner-name");
        switchScreen("", gameOverScreen);
        // if player.name is undefined it means the game is draw
        if(player.name === undefined) {
            winnerName.innerText = player.toUpperCase() + "!!";
        } else {
            winnerName.innerText = player.name + " Wins!!";
        }
    }

    function markSquare(square, marker) {
        square.style.color = setColor(marker);
        square.style.borderColor = setColor(marker);
        square.innerText = marker;
    }

    function resetSquares() {
        [...boardEl.childNodes[1].children].forEach((square, idx) => {
            square.innerText = "";
            square.style.border = "2px solid #333";
        })
    }

})()
