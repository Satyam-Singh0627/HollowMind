/* ==========================================================
    HOLLOWMIND
    utils.js

    Utility Functions
========================================================== */

"use strict";

/* ==========================================
            DOM SELECTORS
========================================== */

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

/* ==========================================
                DELAY
========================================== */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* ==========================================
            RANDOM INTEGER
========================================== */

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ==========================================
        RANDOM ARRAY ELEMENT
========================================== */

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/* ==========================================
        FISHER-YATES SHUFFLE
========================================== */

function shuffle(array) {

    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

/* ==========================================
        TIME FORMATTER
========================================== */

function formatTime(seconds) {

    const min = Math.floor(seconds / 60);

    const sec = seconds % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

}

/* ==========================================
        PRELOAD IMAGES
========================================== */

function preloadImages(images) {

    images.forEach(path => {

        const img = new Image();

        img.src = path;

    });

}

/* ==========================================
        CREATE ELEMENT
========================================== */

function createElement(tag, className = "") {

    const element = document.createElement(tag);

    if (className !== "") {

        element.className = className;

    }

    return element;

}

/* ==========================================
        SHOW SCREEN
========================================== */

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {

        screen.classList.remove("active");

        screen.classList.add("hidden");

    });

    const target = document.getElementById(screenId);

    target.classList.remove("hidden");

    target.classList.add("active");

}

/* ==========================================
        ADD CLASS TEMPORARILY
========================================== */

function temporaryClass(element, className, duration = 400) {

    if (!element) return;

    element.classList.add(className);

    setTimeout(() => {

        element.classList.remove(className);

    }, duration);

}

/* ==========================================
            CLAMP
========================================== */

function clamp(value, min, max) {

    return Math.min(Math.max(value, min), max);

}

/* ==========================================
        REMOVE CHILDREN
========================================== */

function clearElement(element) {

    while (element.firstChild) {

        element.removeChild(element.firstChild);

    }

}

/* ==========================================
        CARD IMAGE PATH
========================================== */

function getImagePath(number) {

    return `image/img${number}.png`;

}

/* ==========================================
        CARD BACK IMAGE
========================================== */

function getCardBack() {

    return "image/card back.png";

}

/* ==========================================
        DEBUG LOGGER
========================================== */

const DEBUG = false;

function log(...args) {

    if (DEBUG) {

        console.log(...args);

    }

}