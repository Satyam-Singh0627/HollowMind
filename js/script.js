/* ==========================================================
    HOLLOWMIND
    script.js

    Main Entry Point
========================================================== */

"use strict";

window.addEventListener("DOMContentLoaded", () => {

    console.log("HollowMind Initializing...");

    // Start on the click screen
    if (typeof showScreen === "function") {
        showScreen("clickScreen");
    }

    // Audio unlock after first click
    document.addEventListener("click", () => {
        if (typeof initAudio === "function") {
            initAudio();
        }
    }, { once: true });

    console.log("Initialization Complete");

});
/* ==========================================
   STATUS TEXT CHANGER
========================================== */

const STATUS_MESSAGES = [

    "MONITORING...",

    "SCANNING...",

    "TRACKING...",

    "SIGNAL STABLE",

    "ENTITY DETECTED",

    "SIGNAL LOST"

];

setInterval(() => {

    if (!GameState.gameStarted) return;

    const status = document.getElementById("statusText");

    if (!status) return;

    status.textContent =
        STATUS_MESSAGES[
            randomInt(0, STATUS_MESSAGES.length - 1)
        ];

}, 8000);