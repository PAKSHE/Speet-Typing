const wordEl = document.getElementById('word');
const textEl = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

const btnLevelEl = document.getElementById('level-btn');
const settingsEl = document.getElementById('settings');
const levelFormEl = document.getElementById('level-form');
const levelEl = document.getElementById('level');
const gameOverEl = document.getElementById('game-over');

// Word lists by difficulty
const words = {
    easy: ["ไก่", "แมว", "หมู", "หมา","ปลา","เห็ด","ข้าว"],
    medium: ["ช้าง", "ควาย", "นก", "ปลา","เด็ดดอกฟ้า","ปากตำแย","ไม้ใกล้ฝั่ง"],
    hard: ["กระต่าย", "นกกระจอก", "กระรอก", "จิ้งจก","ชักแม่น้ำทั้งห้า","ม้าดีดกะโหลก","ไก่งามเพราะขนคนงามเพราะแต่ง","สี่ตีนยังรู้พลาด นักปราชญ์ยังรู้พลั้ง"]
};

let randomText;
let score = 0;
let time = 15;
let saveMode;
let level = "medium";

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
    const wordList = words[saveMode] || words['medium'];
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function displayWordToUI() {
    randomText = getRandomWord();
    wordEl.innerHTML = randomText;
}

textEl.addEventListener('input', (e) => {
    const inputText = e.target.value;

    if (inputText === randomText) {
        displayWordToUI();
        time += 2;
        updateScore();
        e.target.value = '';
    }
    console.log(e.target.value);
});

function updateScore() {
    score += 10;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = time;
    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    gameOverEl.innerHTML = `<h1>จบเกม</h1>
        <p>คะแนนของคุณ= ${score} คะแนน</p>
        <button onclick="location.reload()">เล่นอีกครั้ง</button>`;
    gameOverEl.style.display = 'flex';
}

btnLevelEl.addEventListener('click', () => {
    settingsEl.classList.toggle('hide');
});

levelEl.addEventListener('change', (e) => {
    level = e.target.value;
    localStorage.setItem("mode", level);
});

function startGame() {
    saveMode = localStorage.getItem('mode') !== null ? localStorage.getItem('mode') : 'medium';
    levelEl.value = saveMode;

    // Set initial time based on difficulty
    if (saveMode === 'easy') {
        time = 15;
    } else if (saveMode === 'medium') {
        time = 10;
    } else if (saveMode === 'hard') {
        time = 5;
    } else {
        time = 10;
    }
    displayWordToUI();
}

startGame();
displayWordToUI();
textEl.focus();
