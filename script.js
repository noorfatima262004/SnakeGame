// Define your variables as before
let direction = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let box = document.querySelector('.box');
let HighS = document.getElementById('HighScore');
let BoxScore = document.getElementById('scoreBox');
let lastScreenPaintTime = 0;
let speed = 9;
let hScoreValue = 0;
let score = 0;
let snakeArray = [{ x: 13, y: 16 }];
let food = { x: 3, y: 10 };
let isPaused = false; // Flag to track if the game is paused
let isSoundOn = false; // Flag to track if the sound is on


document.getElementById("cross").addEventListener('click', () => {
    document.body.classList.add('slide-out');
    setTimeout(() => {
        window.location.href = 'FrontPage.html';
    }, 500); // Duration should match the animation duration in CSS
});

// Rest of your game logic and functions remain the same
function main(currentTime) {
    if (!isPaused) {
        window.requestAnimationFrame(main);
        if ((currentTime - lastScreenPaintTime) / 1000 < 1 / speed) {
            return;
        }
        lastScreenPaintTime = currentTime;
        gameWorking();
    } else {
        return; // Exit main loop if paused
    }
}

function isCollide(snakeArray) {
    for (let i = 1; i < snakeArray.length; i++) {
        // Collide in himself
        if (snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y) {
            return true;
        }
    }
    // Collide with boundary
    if (snakeArray[0].x >= 40 || snakeArray[0].x <= 0 || snakeArray[0].y >= 30 || snakeArray[0].y <= 0) {
        return true;
    }
}

function gameWorking() {
    if (isCollide(snakeArray)) {
        musicSound.pause();
        if (isSoundOn) gameOverSound.play();
        direction = { x: 0, y: 0 };
        alert("Game Over! Play Again");
        snakeArray = [{ x: 13, y: 16 }];
        score = 0;
        if (isSoundOn) musicSound.play();
        return;
    }

    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
        if (isSoundOn) foodSound.play();
        score += 1;
        if (score > hScoreValue) {
            hScoreValue = score;
            localStorage.setItem("hScore", JSON.stringify(hScoreValue));
            HighS.innerHTML = '<img width="70px" height="60px" src="img/hScore.png" alt="" srcset=""> : ' + hScoreValue;
        }
        BoxScore.innerHTML = '<img width="70px" height="60px" src="img/food-removebg-preview.png" alt="" srcset=""> : ' + score;
        snakeArray.unshift({ x: snakeArray[0].x + direction.x, y: snakeArray[0].y + direction.y }); // Snake increment
        moveFood(); // Move food to a new random position
    }

    if (!isPaused) { // Only move the snake if not paused
        for (let i = snakeArray.length - 2; i >= 0; i--) {
            snakeArray[i + 1] = { ...snakeArray[i] };
        }
        snakeArray[0].x += direction.x;
        snakeArray[0].y += direction.y;
    }

    // Display Snake and Food
    box.innerHTML = "";
    snakeArray.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        box.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    box.appendChild(foodElement);
}

function moveFood() {
    food = { x: Math.round(1 + Math.random() * 38), y: Math.round(1 + Math.random() * 23) };
}

function togglePauseResume() {
    isPaused = !isPaused;
    if (isPaused) {
        document.getElementById('pauseIcon').style.display = 'none';
        document.getElementById('resumeIcon').style.display = 'inline';
        pauseAllSounds();
    } else {
        document.getElementById('resumeIcon').style.display = 'none';
        document.getElementById('pauseIcon').style.display = 'inline';
        if (isSoundOn) {
            playAllSounds();
        }
        window.requestAnimationFrame(main); // Resume game loop
    }
}

function toggleSound() {
    isSoundOn = !isSoundOn;
    if (isSoundOn) {
        document.getElementById('soundToggle').classList.replace('fa-volume-xmark', 'fa-volume-high');
        playAllSounds();
    } else {
        document.getElementById('soundToggle').classList.replace('fa-volume-high', 'fa-volume-xmark');
        pauseAllSounds();
    }
}

function playAllSounds() {
    musicSound.play();
}

function pauseAllSounds() {
    musicSound.pause();
    gameOverSound.pause();
    foodSound.pause();
    moveSound.pause();
}



let hScore = localStorage.getItem("hScore");
if (hScore == null) {
    localStorage.setItem("hScore", JSON.stringify(hScoreValue));
} else {
    hScoreValue = JSON.parse(hScore);
    HighS.innerHTML = '<img width="70px" height="60px" src="img/hScore.png" alt="" srcset=""> : ' + hScoreValue;
}

setInterval(moveFood, 5000); // Move food every 5 seconds

function initializeGame() {
    if (isSoundOn) musicSound.play()
    window.requestAnimationFrame(main); // Start the game loop

    // Event listener for key presses
    window.addEventListener('keydown', (e) => {
        // direction = { x: 0, y: 1 };
        if (isSoundOn) moveSound.play();
        switch (e.key) {
            case "ArrowUp":
                direction.x = 0;
                direction.y = -1;
                break;
            case "ArrowDown":
                direction.x = 0;
                direction.y = 1;
                break;
            case "ArrowLeft":
                direction.x = -1;
                direction.y = 0;
                break;
            case "ArrowRight":
                direction.x = 1;
                direction.y = 0;
                break;
            case 'p':
            case 'P':
                togglePauseResume(); // Pause on p press
                break;
            case 'm':
            case 'M':
                toggleSound(); // Pause on M press
                break;
            default:
                break;
        }
    });
}
