// Game Constants & Variables
let direction = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let box = document.querySelector('.box')
let LastScreenPaintTime = 0;
let spead = 5;
let hScoreValue = 0
let score = 0;
let snakeArray = [
    { x: 13, y: 16 }
]
let food = { x: 3, y: 10 }

// functions of game

function main(currentTime) {
    musicSound.play()
    window.requestAnimationFrame(main)
    if ((currentTime - LastScreenPaintTime) / 1000 < 1 / spead) {
        return;
    }
    LastScreenPaintTime = currentTime;
    gameWorking();
}

function isCollide(snakeArray) {
    for (let i = 1; i < snakeArray.length; i++) {
        // collide in himself
        if (snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y) {
            return true
        }
    }
    // coolide with boundry
    if (snakeArray[0].x >= 40 || snakeArray[0].x <= 0 || snakeArray[0].y >= 40 || snakeArray[0].y <= 0) {
        return true
    }
}
function gameWorking() {
    // 2 parts

    // Part 1
    // Updating Snake Array And Food 

    // Snake Array Collide
    if (isCollide(snakeArray)) {
        musicSound.pause()
        gameOverSound.play()
        direction = { x: 0, y: 0 }
        alert("Game Over! Play Again")
        snakeArray = [{ x: 13, y: 16 }]
        score = 0;
        musicSound.play()
    }

    //Food Array
    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
        foodSound.play()
        score += 1
        if (score > hScoreValue) {
            hScoreValue = score
            localStorage.setItem("hScore", JSON.stringify(hScoreValue))
            HighScore.innerHTML = "High Score : " + hScoreValue
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArray.unshift({ x: snakeArray[0].x + direction.x, y: snakeArray[0].y + direction.y })     // snake increament
        food = { x: Math.round(1 + Math.random() * 20), y: Math.round(1 + Math.random() * 18) }
    }

    // Snake Array Move
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] }
    }
    snakeArray[0].x += direction.x
    snakeArray[0].y += direction.y

    // Part 2
    // Display Snake And Food

    //Display Snake
    box.innerHTML = ""
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            console.log("0", index)
            snakeElement.classList.add('head')
        }
        else {
            console.log("else", index)
            console.log(snakeArray)
            snakeElement.classList.add('snake')
        }
        box.appendChild(snakeElement)
    });

    // Display Food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    box.appendChild(foodElement)
}


// High Score Value
let hScore = localStorage.getItem("hScore")
if (hScore == null) {
    localStorage.setItem("hScore", JSON.stringify(hScoreValue))
}
else {
    hScoreValue = JSON.parse(hScore)
    HighScore.innerHTML = "High Score : " + hScoreValue
}

// main logic of game
window.requestAnimationFrame(main);  // it renders (Supply /display/show) the frame after time very speadly better then intervals and time out
window.addEventListener('keydown', (e) => {
    direction = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }


}
)