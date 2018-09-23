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
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

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

}

window.onload = function () {
    console.log('Hello World!');
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    let framesPerSecond = 30;
    setInterval(function () {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);
    canvas.addEventListener('mousemove', function (evt) {
        let mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });
}
//reset the ball if it misses the paddle
function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}
//right paddle AI functionality
function rightPadMove() {
    let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y = paddle2Y += 7;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y = paddle2Y -= 7;
    };
};

//setting the speed and the direction of the ball 
function moveEverything() {
    //right sight move
    rightPadMove();

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    //ball bounces vertical and hits the paddle
    //setting the right

    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = ballSpeedX;
            let deltaY = ballY
            -(paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        } else {
            ballReset();
            //player Score 
            player2Score ++;
        };
    };
    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;  
            let deltaY = ballY
            -(paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;      
    } else {
        ballReset();
        player1Score ++;
    }
}
    // ball bounce horizontial 
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}


function drawEverything() {
    //this is the background screen 
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    //this is the left paddle           
    colorRect(0, paddle1Y, PADDLE_THICKNESS, 100, 'white');
    //this is the right paddle
    colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    //this is the ball          
    colorCircle(ballX, ballY, 10, 'yellow');

    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width -100, 100);

}

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height, );
}