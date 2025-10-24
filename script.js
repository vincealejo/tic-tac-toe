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
        if(board[x][y] !== null) return;
        board[x][y] = playerInTurn.marker;
        const result = check();
        changeTurn();

        return result;
    }

    function createPlayer(name, marker) {
        return { name, marker }
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

        return result;
    }


    return {
        createPlayer, setPlayers, move
    }
})();

(function game() {
    const menuModal = document.querySelector(".menu-modal");
    const playerOneNameInput = document.querySelector("#player-one-name");
    const playerTwoNameInput = document.querySelector("#player-two-name");
    const startButton = document.querySelector(".start-button");

    let playerOne;
    let playerTwo;

    startButton.addEventListener("click", (e) => {
        e.preventDefault();
        const pOneName = playerOneNameInput.value;
        const pTwoName = playerTwoNameInput.value;
        playerOne = TIC_TAC_TOE.createPlayer(pOneName, "o");
        playerTwo = TIC_TAC_TOE.createPlayer(pTwoName, "x");
        console.log(playerOne, playerTwo);
        menuModal.classList.add("hidden")
    })
    
    playerOne = TIC_TAC_TOE.createPlayer("one", "o");
    playerTwo = TIC_TAC_TOE.createPlayer("two", "x");

    TIC_TAC_TOE.setPlayers(playerOne, playerTwo);
    TIC_TAC_TOE.move(1, 0);
    TIC_TAC_TOE.move(0, 0);
    TIC_TAC_TOE.move(2, 0);
    TIC_TAC_TOE.move(1, 1);
    TIC_TAC_TOE.move(1, 2);
    const res = TIC_TAC_TOE.move(2, 2);
    console.log(res);
})()
