const TICTACTOE = (function() {
    const playerOne = createPlayer("player one", "o");
    const playerTwo = createPlayer("player two", "x");
    const gameboard = [
        ["","",""],
        ["","",""],
        ["","",""],
    ];

    let turn = 1;
    let winner = "";

    function move(posX, posY) {
        let player;
        if(turn === 1) {
            player = playerOne;
        } else {
            player = playerTwo;
        }
        
        // prvent from marking already marked spot
        if(gameboard[posX][posY]) return;

        mark(player.marker, posX, posY);
        winner = assignWinner(player.marker);
        changeTurn();
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

    function assignWinner(marker ) {
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
                console.log(`Winner: ${marker}`);
            }
        });
    }

    
    function createPlayer(name, marker) {
        return {
            name,
            score: 0,
            marker
        }
    }


    return {
        move
    }
})();