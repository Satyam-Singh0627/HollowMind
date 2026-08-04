/* ==========================================================
    HOLLOWMIND
    game.js
    PART 1
========================================================== */

"use strict";

/* ==========================================================
    GAME VARIABLES
========================================================== */

const board = document.getElementById("gameBoard");

/* ==========================================================
    START LEVEL
========================================================== */

async function startLevel() {

    showScreen("gameScreen");

    // START BACKGROUND VIDEO
    const bgVideo = document.getElementById("levelVideo");

    if(bgVideo){

        bgVideo.style.display = "block";

        bgVideo.currentTime = 0;

        bgVideo.play().catch(()=>{});

    }

    loadLevelData();

    updateHUD();

    clearElement(board);

    board.className = "";

    board.classList.add("level" + getCurrentLevel().id);

    createBoard();

    revealCards();

}

/* ==========================================================
    CREATE BOARD
========================================================== */

function createBoard() {

    const cards = generateLevelCards();

    cards.forEach(imageNumber => {

        const card = document.createElement("div");

        card.className = "card flip";

        card.dataset.image = imageNumber;

        const front = document.createElement("div");
        front.className = "card-face card-front";

        const frontImg = document.createElement("img");
        frontImg.src = getImagePath(imageNumber);

        front.appendChild(frontImg);

        const back = document.createElement("div");
        back.className = "card-face card-back";

        const backImg = document.createElement("img");
        backImg.src = getCardBack();

        back.appendChild(backImg);

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener("click", handleCardClick);

        board.appendChild(card);

    });

}

/* ==========================================================
    REVEAL PHASE
========================================================== */

async function revealCards() {

    GameState.canClick = false;

    await sleep(GameState.revealTime * 1000);

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.classList.remove("flip");

    });

    playCardFlip();

    GameState.canClick = true;

    startHeartbeat();

    startTimer();

}

/* ==========================================================
    CARD CLICK
========================================================== */

function handleCardClick(event) {

    if (!GameState.canClick) return;

    if (GameState.lockBoard) return;

    const card = event.currentTarget;

    if (card.classList.contains("flip")) return;

    flipCard(card);

}

/* ==========================================================
    FLIP CARD
========================================================== */

function flipCard(card) {

    playCardFlip();

    card.classList.add("flip");

    if (!GameState.firstCard) {

        GameState.firstCard = card;
        return;

    }

    // Prevent selecting the same card twice
    if (GameState.firstCard === card) {
        return;
    }

    GameState.secondCard = card;

    GameState.lockBoard = true;

    checkMatch();

}

/* ==========================================================
    HOLLOWMIND
    game.js
    PART 2
========================================================== */

/* ==========================================================
    CHECK MATCH
========================================================== */

async function checkMatch() {

    const first = GameState.firstCard;
    const second = GameState.secondCard;

    const firstImage = first.dataset.image;
    const secondImage = second.dataset.image;

    /*
        MATCH FOUND
    */

    if (firstImage === secondImage) {

        playCorrect();

        first.removeEventListener("click", handleCardClick);
        second.removeEventListener("click", handleCardClick);

        GameState.matchedPairs++;

        resetTurn();

        /*
            All pairs matched
        */

        if (GameState.matchedPairs === GameState.totalPairs) {

            await levelCompleted();

        }

        return;
    }

    /*
        WRONG MATCH
    */

    playWrong();

    GameState.lives--;

    updateHUD();

    await sleep(900);

    first.classList.remove("flip");
    second.classList.remove("flip");

    resetTurn();

    /*
        Out of lives
    */

    if (GameState.lives <= 0) {

        loseLevel();

    }

}

/* ==========================================================
    RESET TURN
========================================================== */

function resetTurn() {

    GameState.firstCard = null;

    GameState.secondCard = null;

    GameState.lockBoard = false;

}

/* ==========================================================
    LEVEL COMPLETED
========================================================== */

async function levelCompleted() {

    GameState.canClick = false;

    if (GameState.timerInterval) {
    clearInterval(GameState.timerInterval);
    GameState.timerInterval = null;
    }

    stopTicking();

    stopHeartbeat();

    playSound("behind", 0.9);

    await sleep(1400);

    playLevelUp();

    await sleep(1200);

    await showCameraRestore();

}

/* ==========================================================
    CAMERA RESTORE
========================================================== */

async function showCameraRestore() {

    showScreen("cameraScreen");

    const node = document.getElementById("cameraNumber");

    node.textContent =
        "NODE " + getCurrentLevel().id;

    await sleep(3500);

    nextLevel();

}

/* ==========================================================
    LOSE LEVEL
========================================================== */

function loseLevel() {

    if (GameState.timerInterval) {
    clearInterval(GameState.timerInterval);
    GameState.timerInterval = null;
    }

    stopHeartbeat();

    stopTicking();
    
    GameState.firstCard = null;
    GameState.secondCard = null;
    GameState.lockBoard = false;
    GameState.canClick = false;

    playGameOver();

    showGameOver();

}

/* ==========================================================
    GAME OVER
========================================================== */

function showGameOver() {

    GameState.canClick = false;

    showScreen("gameOverScreen");

}

/* ==========================================================
    WIN SCREEN
========================================================== */

function showWinScreen() {

    if (GameState.timerInterval) {
    clearInterval(GameState.timerInterval);
    GameState.timerInterval = null;
    }

    stopHeartbeat();

    stopTicking();

    showScreen("winScreen");

}

/* ==========================================================
    RESTART
========================================================== */

function restartWholeGame() {

    stopAllSounds();

    clearInterval(GameState.timerInterval);

    resetGame();

    GameState.firstCard = null;
    GameState.secondCard = null;
    GameState.lockBoard = false;
    GameState.canClick = false;

    board.innerHTML = "";
    stopHeartbeat();
    stopTicking();
    showScreen("startScreen");

}

/* ==========================================================
    RANDOM HORROR EVENTS
========================================================== */

setInterval(() => {

    if (!GameState.gameStarted) return;

    if (!GameState.canClick) return;

    /*
        Around 12% chance every 15 seconds
    */

    if (randomInt(1,100) <= 12) {

        playRandomHorror();

        const container =
            document.getElementById("gameContainer");

        temporaryClass(container,"shake",400);

        temporaryClass(
            document.getElementById("glitchOverlay"),
            "glitch",
            300
        );

    }

},15000);

/* ==========================================================
    GAME READY
========================================================== */

GameState.gameStarted = false;