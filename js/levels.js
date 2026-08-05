/* ==========================================================
    HOLLOWMIND
    levels.js

    Game Level Configuration
========================================================== */

"use strict";

/* ==========================================================
    LEVEL DATA

    pairs  = number of unique images
    reveal = seconds cards stay face-up
    timer  = gameplay countdown
========================================================== */

const LEVELS = [

    {
        id: 1,

        name: "LEVEL 1",

        pairs: 3,

        reveal: 6,

        timer: 30,

        hearts: 3,

        heartbeatVolume: 0.25,

        images: [
            1,
            2,
            3
        ]
    },

    {
        id: 2,

        name: "LEVEL 2",

        pairs: 5,

        reveal: 8,

        timer: 60,

        hearts: 3,

        heartbeatVolume: 0.40,

        images: [
            1,
            2,
            3,
            4,
            5
        ]
    },

    {
        id: 3,

        name: "LEVEL 3",

        pairs: 8,

        reveal: 12,

        timer: 120,

        hearts: 3,

        heartbeatVolume: 0.55,

        images: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
        ]
    },

    {
        id: 4,

        name: "LEVEL 4",

        pairs: 12,

        reveal: 18,

        timer: 120,

        hearts: 3,

        heartbeatVolume: 0.80,

        images: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12
        ]
    }

];

/* ==========================================================
    GAME STATE
========================================================== */

const GameState = {

    currentLevel: 0,

    lives: 3,

    timer: 0,

    revealTime: 0,

    heartbeatVolume: 0,

    matchedPairs: 0,

    totalPairs: 0,

    canClick: false,

    firstCard: null,

    secondCard: null,

    lockBoard: false,

    timerInterval: null,

    gameStarted: false,

    correctMatches: 0,
    
    wrongMatches: 0, 
    
    completedLevels:0,

    savedLives:0,

    totalPlayTime: 0

    

};

/* ==========================================================
    GET CURRENT LEVEL
========================================================== */

function getCurrentLevel() {

    return LEVELS[GameState.currentLevel];

}

/* ==========================================================
    RESET CURRENT LEVEL
========================================================== */

function loadLevelData() {

    const level = getCurrentLevel();

    GameState.lives = level.hearts;

    GameState.timer = level.timer;

    GameState.revealTime = level.reveal;

    GameState.heartbeatVolume = level.heartbeatVolume;

    GameState.totalPairs = level.pairs;

    GameState.matchedPairs = 0;

    GameState.firstCard = null;

    GameState.secondCard = null;

    GameState.lockBoard = false;

    GameState.canClick = false;

}

/* ==========================================================
    UPDATE HUD
========================================================== */

function updateHUD() {

    const level = getCurrentLevel();

    document.getElementById("lifeCount").textContent =
        GameState.lives;

    document.getElementById("cameraLevel").textContent =
        "0" + level.id;

    document.getElementById("timeValue").textContent =
        formatTime(GameState.timer);

    // ===========================
    // THREAT LEVEL
    // ===========================

    const threat = document.getElementById("threatLevel");

    switch(level.id){

        case 1:

            threat.textContent = "LOW";
            threat.style.color = "#00ff66";
            threat.style.textShadow = "0 0 12px #00ff66";
            break;

        case 2:

            threat.textContent = "MODERATE";
            threat.style.color = "#ffd700";
            threat.style.textShadow = "0 0 12px #ffd700";
            break;

        case 3:

            threat.textContent = "HIGH";
            threat.style.color = "#ff8800";
            threat.style.textShadow = "0 0 12px #ff8800";
            break;

        case 4:

            threat.textContent = "EXTREME";
            threat.style.color = "#ff2222";
            threat.style.textShadow = "0 0 18px red";
            break;

    }

}

/* ==========================================================
    NEXT LEVEL
========================================================== */

function nextLevel() {

    clearInterval(GameState.timerInterval);

    GameState.completedLevels++;

    GameState.currentLevel++;

    if (GameState.currentLevel >= LEVELS.length) {

        if (typeof showWinScreen === "function") {

            showWinScreen();

        }

        return;

    }

    if (typeof startLevel === "function") {

        startLevel();

    }

}

/* ==========================================================
    RESTART GAME
========================================================== */

function resetGame() {

    clearInterval(GameState.timerInterval);

    GameState.currentLevel = 0;

    GameState.gameStarted = false;

    GameState.savedLives=0;

    GameState.totalPlayTime = 0;

    GameState.completedLevels = 0;
    
    GameState.correctMatches = 0;

    GameState.wrongMatches = 0;

    loadLevelData();

}

/* ==========================================================
    START COUNTDOWN
========================================================== */

function startTimer() {

    clearInterval(GameState.timerInterval);

    GameState.timerInterval = setInterval(() => {

        GameState.timer--;

        GameState.totalPlayTime++;

        updateHUD();

        /*
            Start ticking sound
            when 10 seconds remain.
        */

        if (GameState.timer === 10) {

            if (typeof playTicking === "function") {

                playTicking();

            }

        }

        /*
            Time Over
        */

        if (GameState.timer <= 0) {

            clearInterval(GameState.timerInterval);

            if (typeof loseLevel === "function") {

                loseLevel();

            }

        }

    }, 1000);

}

/* ==========================================================
    LEVEL IMAGE ARRAY

    Example:

    [1,2,3]
    becomes

    [1,2,3,1,2,3]

========================================================== */

function generateLevelCards() {

    const level = getCurrentLevel();

    const cards = [];

    level.images.forEach(image => {

        cards.push(image);

        cards.push(image);

    });

    return shuffle(cards);

}