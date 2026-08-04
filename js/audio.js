/* ==========================================================
    HOLLOWMIND
    audio.js

    Audio Manager
========================================================== */

"use strict";

/* ==========================================================
    AUDIO LIBRARY
========================================================== */

const AudioManager = {

    sounds: {},

    initialized: false,

     voice: null

};

let wrongVoiceTimeout = null;

/* ==========================================================
    AUDIO FILES
========================================================== */

const AUDIO_FILES = {

    alarm: "audio/alarm.wav",

    breath: "audio/breath.mp3",

    cardFlip: "audio/card flip.mp3",

    correct: "audio/correct.mp3",

    wrong: "audio/wrong.mp3",

    glitch: "audio/glitch.mp3",

    heartbeat: "audio/heartbeat.mp3",

    ticking: "audio/ticking timer.mp3",

    levelUp: "audio/level up.mp3",

    gameOver: "audio/game over.mp3",

    scream: "audio/girl screaming.mp3",

    seeYou: "audio/i see you.mp3",

    coming: "audio/i am coming for you.mp3",

    behind: "audio/don't look behind you.mp3",

    whisper1: "audio/creepy whispher 1.mp3",

    whisper2: "audio/creepy whispher 2.mp3",

    whisper3: "audio/creepy whispher 3.mp3",

    key1: "audio/key1.mp3",

    key2: "audio/key2.mp3",

    key3: "audio/key3.mp3",

    key4: "audio/key4.mp3",

    key5: "audio/key5.mp3"

};

/* ==========================================================
    PRELOAD
========================================================== */

function initAudio() {

    if (AudioManager.initialized) return;

    Object.entries(AUDIO_FILES).forEach(([name, path]) => {

        const audio = new Audio(path);

        audio.preload = "auto";

        AudioManager.sounds[name] = audio;

    });

    AudioManager.initialized = true;

}

/* ==========================================================
    PLAY
========================================================== */

function playSound(name, volume = 1) {

    const source = AudioManager.sounds[name];

    if (!source) return;

    const audio = source.cloneNode();

    audio.volume = volume;

    audio.play().catch(() => {});
}

function playVoice(name, volume = 1){

    if(AudioManager.voice){

    AudioManager.voice.pause();

    AudioManager.voice.currentTime = 0;

    AudioManager.voice = null;

     }

    const source = AudioManager.sounds[name];

    if(!source) return;

    const audio = source.cloneNode();

    audio.volume = volume;

    AudioManager.voice = audio;

    audio.onended = () => {

    if (AudioManager.voice === audio) {

        AudioManager.voice = null;

    }

};

    audio.play().catch(()=>{});

}

/* ==========================================================
    LOOP
========================================================== */

function playLoop(name, volume = 1) {

    const audio = AudioManager.sounds[name];

    if (!audio) return;

    audio.pause();

    audio.currentTime = 0;

    audio.loop = true;

    audio.volume = volume;

    audio.play().catch(() => {});

}

/* ==========================================================
    STOP
========================================================== */

function stopSound(name) {

    const audio = AudioManager.sounds[name];

    if (!audio) return;

    audio.pause();

    audio.currentTime = 0;

    audio.loop = false;

}

/* ==========================================================
    STOP ALL
========================================================== */

function stopAllSounds() {

    Object.values(AudioManager.sounds).forEach(audio => {

        audio.pause();

        audio.currentTime = 0;

        audio.loop = false;

    });

    if(AudioManager.voice){

    AudioManager.voice.pause();

    AudioManager.voice.currentTime = 0;

    AudioManager.voice = null;

   }

clearTimeout(wrongVoiceTimeout);

}

/* ==========================================================
    RANDOM KEYBOARD SOUND
========================================================== */

function playTypingKey() {

    const keys = [

        "key1",

        "key2",

        "key3",

        "key4",

        "key5"

    ];

    playSound(randomItem(keys), 0.6);

}

/* ==========================================================
    RANDOM WHISPER
========================================================== */

function playRandomWhisper() {

    const whispers = [

        "whisper1",

        "whisper2",

        "whisper3",

        "seeYou",

        "coming",

    ];

    playVoice(randomItem(whispers),0.95);

}

/* ==========================================================
    HEARTBEAT
========================================================== */

function startHeartbeat() {

    stopHeartbeat();

    let volume = 0.25;

    if (typeof GameState !== "undefined" &&
        typeof GameState.heartbeatVolume === "number") {

        volume = GameState.heartbeatVolume;

    }

    playLoop("heartbeat", volume);

}
/* ==========================================================
    STOP HEARTBEAT
========================================================== */

function stopHeartbeat(){

    stopSound("heartbeat");

}

/* ==========================================================
    LOW TIME
========================================================== */

function playTicking(){

    playLoop("ticking",0.45);

}

function stopTicking(){

    stopSound("ticking");

}

/* ==========================================================
    GAME EVENTS
========================================================== */

function playCorrect(){

    playSound("correct",0.45);

}

function playWrong(){

    playSound("wrong",0.8);

    clearTimeout(wrongVoiceTimeout);

    wrongVoiceTimeout = setTimeout(() => {

        playVoice("coming",0.85);

    },300);

}

function playCardFlip(){

    playSound("cardFlip",0.7);

}

function playAlarm(){

    playSound("alarm",0.85);

}

function playGlitch(){

    playSound("glitch",0.7);

}

function playLevelUp(){

    stopTicking();

    playSound("levelUp",0.7);

}

function playGameOver(){

    stopAllSounds();

    playVoice("scream",0.9);

    
    setTimeout(() => {

    if(GameState.gameStarted){

        playSound("gameOver",0.9);

    }

  },2500);

}


/* ==========================================================
    RANDOM HORROR EVENT

    Called occasionally during gameplay.
========================================================== */

function playRandomHorror(){

    const chance = randomInt(1,100);

    if(chance <= 60){

        playRandomWhisper();

    }

    else{

        playVoice("breath",0.7);

    }

}