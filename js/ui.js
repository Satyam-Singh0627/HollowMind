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
    GameState.gameStarted = false; 

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

    showScreen("operatorScreen");

});

/* ==========================================================
    SHOW INSTRUCTIONS
========================================================== */

function showInstructions() {

    showScreen("instructionScreen");

}

/* ==========================================================
    OPERATOR LOGIN
========================================================== */

let operatorName = "";

let previousScreen = "";

function submitOperatorName() {

    const input = document.getElementById("operatorName");

    operatorName = input.value.trim();

    if(operatorName==="")
    {
        input.focus();
        return;
    }

    localStorage.setItem("operatorName",operatorName);

    const display = document.getElementById("operatorDisplay");

if(display){

    display.textContent = operatorName.toUpperCase();

}

    showInstructions();

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

const newOperatorGameOver =
    document.getElementById("newOperatorGameOver");

const newOperatorWin =
    document.getElementById("newOperatorWin");

const closeInstructionsButton =
    document.getElementById("closeInstructions");

const operatorInput =
    document.getElementById("operatorName");

const operatorSubmit =
    document.getElementById("operatorSubmit");

const leaderboardWin =
document.getElementById("leaderboardWin");

const leaderboardGameOver =
document.getElementById("leaderboardGameOver");

const closeLeaderboard =
document.getElementById("closeLeaderboard");

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
    OPERATOR SUBMIT
========================================================== */

if(operatorSubmit){

    operatorSubmit.addEventListener("click",submitOperatorName);

}

if(operatorInput){

    operatorInput.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"){

            submitOperatorName();

        }

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

function fadeToScreen(screenId){

    const container =
        document.getElementById("gameContainer");

    container.classList.add("fadeOut");

    setTimeout(()=>{

        showScreen(screenId);

        container.classList.remove("fadeOut");

        container.classList.add("fadeIn");

        setTimeout(()=>{

            container.classList.remove("fadeIn");

        },500);

    },500);

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


    startBootSequence();

});

/* ==========================================================
    NEW OPERATOR
========================================================== */
/* ==========================================================
    NEW OPERATOR
========================================================== */

function newOperator(){

    stopAllSounds();

    clearInterval(GameState.timerInterval);

    resetGame();

    GameState.gameStarted = false;

    bootRunning = false;

    localStorage.removeItem("operatorName");

    document.getElementById("operatorName").value = "";

    document.getElementById("operatorDisplay").textContent = "UNKNOWN";

    showScreen("clickScreen");

}

if(newOperatorGameOver){

    newOperatorGameOver.addEventListener("click", newOperator);

}

if(newOperatorWin){

    newOperatorWin.addEventListener("click", newOperator);

}

/* ==========================================================
    UI READY
========================================================== */

console.log("UI Loaded Successfully");

function formatLeaderboardTime(seconds){

    const m = Math.floor(seconds/60);

    const s = seconds%60;

    return String(m).padStart(2,"0")+":"+
           String(s).padStart(2,"0");

}

if(leaderboardWin){

    leaderboardWin.addEventListener("click",()=>{

        previousScreen = "winScreen";

        loadLeaderboard();

        showScreen("leaderboardScreen");

    });

}

if(leaderboardGameOver){

    leaderboardGameOver.addEventListener("click",()=>{

        previousScreen = "gameOverScreen";

        loadLeaderboard();

        showScreen("leaderboardScreen");

    });

}

if(closeLeaderboard){

    closeLeaderboard.addEventListener("click",()=>{

        showScreen(previousScreen);

    });

}

function loadLeaderboard(){

    const leaderboard =
        JSON.parse(localStorage.getItem("leaderboard")) || [];

    const body =
        document.getElementById("leaderboardBody");

    body.innerHTML = "";

    leaderboard.forEach((player,index)=>{

        body.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${player.operator}</td>

            <td>${player.level}/4</td>

            <td>${player.lives}/12</td>

            <td>${formatLeaderboardTime(player.time)}</td>

            <td>${player.status}</td>

        </tr>

        `;

    });

}

function saveLeaderboard(status, lives = GameState.savedLives){

    let leaderboard =
    JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({

        operator:
        localStorage.getItem("operatorName") || "UNKNOWN",

        lives: lives,

        time: GameState.totalPlayTime,

        level: GameState.completedLevels,

        status: status

    });

    leaderboard.sort((a,b)=>{

        if(b.level != a.level)
            return b.level-a.level;

        if(b.lives != a.lives)
            return b.lives-a.lives;

        return a.time-b.time;

    });

    // Remove this line if you want to keep ALL players
    // leaderboard.splice(10);

    localStorage.setItem(
        "leaderboard",
        JSON.stringify(leaderboard)
    );

}