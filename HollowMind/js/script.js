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