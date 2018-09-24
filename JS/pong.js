let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 5;
let paddle1Y = 250;
let paddle2Y = 250;
let player1Score = 0;
let player2Score = 0;
let showWinScreen = false;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
const WINNING_SCORE = 2;


//mouse action for the paddle
function calculateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
};

//game reset and win message 
function handleMouseClick(evt) {
    if (showWinScreen) {
        player1Score = 0;
        player2Score = 0;
        (showWinScreen = false);
    };
};

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    let framesPerSecond = 30;
    setInterval(function () {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove', function (evt) {
        let mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });
}

//reset the ball if it misses the paddle
function ballReset() {
    if (player1Score >= WINNING_SCORE || 
        player2Score >= WINNING_SCORE) {
               showWinScreen = true;
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

//setting the speed and the direction of the ball 
function moveEverything() {
    //right sight move
    if (showWinScreen) {
        return;
    }

    rightPadMove();

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    //ball bounces vertical and hits the paddle
    //setting the right
    if (ballX < 0) {
        if (ballY > paddle1Y && 
            ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = ballSpeedX;

            let deltaY = ballY 
            -(paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;

        } else {
            player2Score++; //must be BEFORE ballReset()
            ballReset(); //player Score 
        };
    };

    if (ballX > canvas.width) {
        if (ballY > paddle2Y && 
            ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY 
            - paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++; //must be BEFORE ballReset
            ballReset();
        };
    

    // ball bounce horizontial 
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    };
};

//right paddle AI functionality
function rightPadMove() {
    let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y = paddle2Y += 7;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y = paddle2Y -= 7;
    };
};

function drawNet(){

	for(var i=0; i<canvas.height; i+=40){
		colorRect(canvas.width/2-1,i,2,20,'white');
    }
}

function drawEverything() {
    // next line makes the black background
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    if (showWinScreen) {
        canvasContext.fillStyle = "white";

        if (player1Score >= WINNING_SCORE) {
            canvasContext.fillText("Left Player Wins!", 350, 200);
        } else if (player2Score >=  WINNING_SCORE)
        (canvasContext.fillText("Right Player Wins!", 350, 200));
    }
    canvasContext.fillText("click to continue", 350, 500);
    return;
}
drawNet();

// next line is the ball using the function colorCircle
colorCircle(ballX, ballY, 10, 'white');

// next line is the left paddle
colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

// next line is the right paddle
colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, 
    PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

canvasContext.fillText(player1Score, 100, 100);
canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}