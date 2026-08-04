/* ==========================================================
    HOLLOWMIND
    ui.js
    PART 1

    User Interface Controller
========================================================== */

"use strict";

/* ==========================================================
    DOM ELEMENTS
========================================================== */

const clickScreen =
    document.getElementById("clickScreen");

const bootScreen =
    document.getElementById("bootScreen");

const warningScreen =
    document.getElementById("warningScreen");

const terminalScreen =
    document.getElementById("terminalScreen");

const instructionScreen =
    document.getElementById("instructionScreen");

const gameScreen =
    document.getElementById("gameScreen");

const cameraScreen =
    document.getElementById("cameraScreen");

const gameOverScreen =
    document.getElementById("gameOverScreen");

const winScreen =
    document.getElementById("winScreen");

/*extra*/
let bootRunning = false;

/* ==========================================================
    BOOT SEQUENCE
========================================================== */

async function startBootSequence() {

    if (bootRunning)
        return;

    bootRunning = true;

    initAudio();

    showScreen("bootScreen");

    playGlitch();

    await sleep(1200);

    await playBootText();

    await sleep(5200);

    showUnauthorizedAccess();

    bootRunning = false;

}
/* ==========================================================
    WARNING SCREEN
========================================================== */

async function showUnauthorizedAccess() {

    showScreen("warningScreen");

    playAlarm();

    jumpScare();

    await sleep(4500);

    openRecoveryTerminal();

}

/* ==========================================================
    RECOVERY TERMINAL
========================================================== */

function openRecoveryTerminal() {

    showScreen("terminalScreen");

}

/* ==========================================================
    ENTER KEY
========================================================== */

document.addEventListener("keydown", async (event) => {

    if (event.key !== "Enter")
        return;

    if (!terminalScreen.classList.contains("active"))
        return;

    playGlitch();

    jumpScare();

    await sleep(1200);

    showInstructions();

});

/* ==========================================================
    SHOW INSTRUCTIONS
========================================================== */

function showInstructions() {

    showScreen("instructionScreen");

}

/* ==========================================================
    HOLLOWMIND
    ui.js
    PART 2

    UI Events & Navigation
========================================================== */

"use strict";

/* ==========================================================
    BUTTONS
========================================================== */

const startMissionButton =
    document.getElementById("startMission");

const restartButton =
    document.getElementById("restartGame");

const replayButton =
    document.getElementById("replayGame");

const closeInstructionsButton =
    document.getElementById("closeInstructions");

/* ==========================================================
    START GAME
========================================================== */

async function beginMission() {

    if (GameState.gameStarted)
        return;

    GameState.gameStarted = true;

    await fadeToScreen("gameScreen");

    await sleep(300);

    startLevel();

}
/* ==========================================================
    CLOSE INSTRUCTIONS
========================================================== */

if (closeInstructionsButton) {

    closeInstructionsButton.addEventListener("click", () => {

        showScreen("terminalScreen");

    });

}

/* ==========================================================
    BEGIN BUTTON
========================================================== */

if (startMissionButton) {

    startMissionButton.addEventListener("click", () => {

        beginMission();

    });

}

/* ==========================================================
    GAME OVER RESTART
========================================================== */

if (restartButton) {

    restartButton.addEventListener("click", () => {

    stopAllSounds();

    GameState.gameStarted = false;

    resetGame();

    beginMission();

    });

}

/* ==========================================================
    WIN REPLAY
========================================================== */

if (replayButton) {

    replayButton.addEventListener("click", () => {

    stopAllSounds();

    GameState.gameStarted = false;

    resetGame();

    beginMission();

    });

}

/* ==========================================================
    CAMERA RESTORE TRANSITION
========================================================== */

async function cameraRestoreTransition(nodeNumber) {

    showScreen("cameraScreen");

    const node =
        document.getElementById("cameraNumber");

    node.textContent =
        "NODE " + nodeNumber;

    if (typeof cameraRestoreEffect === "function") {
    await cameraRestoreEffect();
    }

    await sleep(3500);

}

/* ==========================================================
    SCREEN HELPERS
========================================================== */

function fadeToScreen(screenId) {

    const container =
        document.getElementById("gameContainer");

    temporaryClass(container, "fadeOut", 450);

    setTimeout(() => {

        showScreen(screenId);

        temporaryClass(container, "fadeIn", 450);

    }, 450);

}

/* ==========================================================
    GAME OVER UI
========================================================== */

function displayGameOver() {

    fadeToScreen("gameOverScreen");

}

/* ==========================================================
    WIN UI
========================================================== */

function displayMissionComplete() {

    fadeToScreen("winScreen");

}

/* ==========================================================
    ESC KEY

    Close instructions
========================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape")
        return;

    if (!instructionScreen.classList.contains("active"))
        return;

    showScreen("terminalScreen");

});

/* ==========================================================
    CLICK TO START
========================================================== */

clickScreen.addEventListener("click", () => {

    if (GameState.gameStarted)
        return;

    startBootSequence();

});

/* ==========================================================
    UI READY
========================================================== */

console.log("UI Loaded Successfully");