const TICTACTOE = (function() {
    const playerOne = createPlayer("player one", "o");
    const playerTwo = createPlayer("player two", "x");
    let gameboard = [
        [null,null,null],
        [null,null,null],
        [null,null,null],
    ];

    let turn = 1;
    let isGameOver = false;

    function move(posX, posY) {
        if(isGameOver) return false;
        // prvent from marking already marked spot
        if(gameboard[posX][posY] !== null) {
            return false;
        };
        
        
        let player;
        if(turn === 1) {
            player = playerOne;
        } else {
            player = playerTwo;
        }
        
        mark(player.marker, posX, posY);
        isGameOver = checkForWinner(player.marker);
        if(isGameOver) {
           alert(`Winner: ${getCurrentPlayer().name}`);
            return false;
        }

        changeTurn();

        return true;
    }

    function getCurrentPlayer() {
        if(turn === 1) return playerOne;
        return playerTwo;
    }

    // PRIVATE FUNCTIONS
    function changeTurn() {
        if(turn === 1) {
            turn = 2;
        } else {
            turn = 1;
        }
    }

    function mark(marker, posX, posY) {
        gameboard[posX][posY] = marker;
    }

    function checkForWinner(marker) {
        let winner = false;
        const winningPositions = [
            ["00","01","02"],
            ["10","11","12"],
            ["20","21","22"],
            ["00","11","22"],
            ["02","11","20"],
            ["00","10","20"],
            ["01","11","21"],
            ["02","12","22"],
        ]

        winningPositions.forEach((pos) => {
            const a1 = pos[0][0];
            const a2 = pos[0][1];
            const b1 = pos[1][0];
            const b2 = pos[1][1];
            const c1 = pos[2][0];
            const c2 = pos[2][1];
            if(gameboard[a1][a2] === marker && gameboard[b1][b2] === marker && gameboard[c1][c2] === marker) {
                winner = true;
            }   
        });
         return winner;
    }

    
    function createPlayer(name, marker) {
        return {
            name,
            score: 0,
            marker
        }
    }

    function reset() {
        gameboard = [
            [null,null,null],
            [null,null,null],
            [null,null,null],
        ];
        turn = 1;
    }


    return {
        move, getCurrentPlayer
    }
})();

const GAME = (function() {
    const board = document.querySelector(".board");


    board.addEventListener("click", (e) => {
        if(e.target.className !== "square") return;
        const square = e.target;
        const x = square.dataset.posX;
        const y = square.dataset.posY;
        const currentPlayer = TICTACTOE.getCurrentPlayer();
        const moveSuccessfully = TICTACTOE.move(x, y);
        if(moveSuccessfully) {
            markSquare(currentPlayer.marker,square);
        }
    })


    // TOOLS
    function markSquare(marker, square) {
        square.innerText = marker;
    }


})()