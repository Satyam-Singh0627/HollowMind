/* ==========================================================
    HOLLOWMIND
    effects.js

    Visual Effects Manager
========================================================== */

"use strict";
let effectsInterval = null;
let horrorInterval = null;


function startEffects() {

    stopEffects();

    effectsInterval = setInterval(() => {

        if (!GameState.gameStarted) return;

        randomGlitch();

    }, 6000);

    horrorInterval = setInterval(() => {

        if (!GameState.gameStarted) return;

        randomHorror();

    }, 15000);

}


/* ==========================================================
    DOM REFERENCES
========================================================== */

const glitchOverlay = document.getElementById("glitchOverlay");
const flashOverlay = document.getElementById("flash");
const gameContainer = document.getElementById("gameContainer");

/* ==========================================================
    GLITCH EFFECT
========================================================== */

function glitchEffect(duration = 1200) {

    if (!glitchOverlay) return;

    temporaryClass(glitchOverlay, "glitch", duration);

    setTimeout(() => {

    temporaryClass(glitchOverlay, "glitch", 150);

    }, 120);

    playGlitch();

}

/* ==========================================================
    SCREEN FLASH
========================================================== */

function screenFlash(duration = 250) {

    if (!flashOverlay) return;

    temporaryClass(flashOverlay, "flash", duration);

}

/* ==========================================================
    SCREEN SHAKE
========================================================== */

function shakeScreen(duration = 400) {

    if (!gameContainer) return;

    temporaryClass(gameContainer, "shake", duration);

}

/* ==========================================================
    SCREEN SCRATCH
========================================================== */

function playScratchEffect(){

    const scratch = document.getElementById("scratchOverlay");

    if(!scratch) return;

    scratch.classList.remove("active");

    void scratch.offsetWidth;

    scratch.classList.add("active");

    setTimeout(() => {

        scratch.classList.remove("active");

    },1600);

}

/* ==========================================================
    COMBINED JUMPSCARE
========================================================== */

function jumpScare() {

    glitchEffect(600);

    shakeScreen(700);

    screenFlash(350);

    setTimeout(() => glitchEffect(250), 180);

}
/* ==========================================================
    RANDOM VISUAL GLITCH
========================================================== */

function randomGlitch() {

    if (!GameState.gameStarted) return;

    if (!GameState.canClick) return;

    const chance = randomInt(1, 100);

    if (chance <= 35) {

        glitchEffect();

    }

}

/* ==========================================================
    RANDOM SCREEN SHAKE
========================================================== */

function randomShake() {

    if (!GameState.gameStarted) return;

    if (!GameState.canClick) return;

    const chance = randomInt(1, 100);

    if (chance <= 18) {

        shakeScreen();

    }

}

/* ==========================================================
    RANDOM FLASH
========================================================== */

function randomFlash() {

    if (!GameState.gameStarted) return;

    if (!GameState.canClick) return;

    const chance = randomInt(1, 100);

    if (chance <= 12) {

        screenFlash();

    }

}

/* ==========================================================
    EFFECT LOOP
========================================================== */

setInterval(() => {

    randomGlitch();

    randomShake();

    randomFlash();

}, 7000);

/* ==========================================================
    BOOT GLITCH
========================================================== */

async function bootGlitchSequence() {

    await sleep(180);

    glitchEffect();

    await sleep(180);

    screenFlash();

    await sleep(180);

    glitchEffect();

}

/* ==========================================================
    CAMERA RESTORE EFFECT
========================================================== */

async function cameraRestoreEffect() {

    for (let i = 0; i < 5; i++) {

        glitchEffect();

        await sleep(220);

    }

    screenFlash();

}

/* ==========================================================
    TYPEWRITER EFFECT
========================================================== */

async function typeWriter(element, text, speed = 25) {

    element.textContent = "";

    for (let i = 0; i < text.length; i++) {

        element.textContent += text.charAt(i);

        if (text.charAt(i) !== "\n") {

            playTypingKey();

        }

        await sleep(speed);

    }

}

/* ==========================================================
    BOOT TEXT
========================================================== */

async function playBootText() {

    const boot = document.getElementById("bootText");

    const text =

`Initializing HollowMind...

Loading Recovery Protocol...

Checking Camera Nodes...

Node 01 ............ OK

Node 02 ............ OFFLINE

Node 03 ............ SIGNAL LOST

Node 04 ............ NO RESPONSE

Loading Memory Archive...

Scanning Neural Fragments...

Decrypting Hawkins Laboratory...

Recovering Subject Records...

Searching Last Known Transmission...

Warning...

Unknown Presence Detected...

Attempting Recovery...

Security Override Accepted...

Access Granted...`;

    await typeWriter(boot, text, 20);

}


function stopEffects() {

    if (effectsInterval) {

        clearInterval(effectsInterval);
        effectsInterval = null;

    }

    if (horrorInterval) {

        clearInterval(horrorInterval);
        horrorInterval = null;

    }

}

function triggerBloodEffect() {

    const blood = document.getElementById("bloodOverlay");

    if (!blood) return;

    blood.classList.remove("active");

    void blood.offsetWidth;

    blood.classList.add("active");

}