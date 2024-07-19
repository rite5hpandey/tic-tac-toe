document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll(".box");
    const gameInfo = document.querySelector(".game-info");
    const startBtn = document.querySelector('.start-btn');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const introScreen = document.querySelector('.intro-screen');
    const ticTacToe = document.querySelector('.tic-tac-toe');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupMessage = document.querySelector('.popup-message');
    const popupBtn = document.querySelector('.popup-btn');

    let currentPlayerSymbol;
    let currentPlayerName;
    let player1Name;
    let player2Name;
    let gameGrid;

    const symbols = ["X", "O"]; // Symbols for the game
    const names = {}; // Associating symbols with player names

    const winningPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function initGame() {
        gameGrid = ["", "", "", "", "", "", "", "", ""];
        
        boxes.forEach((box, index) => {
            box.innerText = "";
            box.style.pointerEvents = "all";
            box.classList = `box box${index + 1}`;
        });

        gameInfo.innerText = `Current Player - ${currentPlayerName}`;
    }

    function swapTurn() {
        currentPlayerSymbol = (currentPlayerSymbol === symbols[0]) ? symbols[1] : symbols[0];
        currentPlayerName = (currentPlayerSymbol === symbols[0]) ? player1Name : player2Name;
        gameInfo.innerText = `Current Player - ${currentPlayerName}`;
    }

    function checkGameOver() {
        let winner = "";

        winningPositions.forEach((position) => {
            if (gameGrid[position[0]] && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]) {
                winner = gameGrid[position[0]];

                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
        });

        if (winner) {
            showPopup(`Winner: ${names[winner]}`);
            return;
        }

        if (gameGrid.every(box => box)) {
            showPopup("Game Tied!");
        }
    }

    function handleClick(index) {
        if (gameGrid[index] === "" && gameInfo.style.display === "block") {
            boxes[index].innerText = currentPlayerSymbol;
            gameGrid[index] = currentPlayerSymbol;
            boxes[index].style.pointerEvents = "none";
            
            swapTurn();
            checkGameOver();
        }
    }

    function showPopup(message) {
        popupMessage.innerText = message;
        popupOverlay.style.display = 'flex';
    }

    function resetToIntro() {
        introScreen.style.display = 'flex';
        ticTacToe.style.display = 'none';
        gameInfo.style.display = 'none';
        popupOverlay.style.display = 'none';
        
        // Reset player inputs
        player1Input.value = "";
        player2Input.value = "";
        
        // Clear game data
        currentPlayerSymbol = null;
        currentPlayerName = null;
        names[symbols[0]] = "";
        names[symbols[1]] = "";
        gameGrid = [];
    }

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            handleClick(index);
        });
    });

    startBtn.addEventListener('click', () => {
        player1Name = player1Input.value.trim();
        player2Name = player2Input.value.trim();
        if (player1Name && player2Name) {
            names[symbols[0]] = player1Name;
            names[symbols[1]] = player2Name;
            currentPlayerSymbol = symbols[0]; // Start with "X"
            currentPlayerName = player1Name;
            gameInfo.innerText = `Current Player - ${currentPlayerName}`;
            introScreen.style.display = 'none';
            ticTacToe.style.display = 'grid';
            gameInfo.style.display = 'block';
            initGame();
        } else {
            alert('Please enter both player names.');
        }
    });

    popupBtn.addEventListener('click', () => {
        resetToIntro();
    });
});











