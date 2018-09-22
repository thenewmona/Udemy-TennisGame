let canvas;
        let canvasContext;
        let ballX = 50;
        let ballY = 50;
        let ballSpeedX = 10;
        let ballSpeedY = 5;
        let paddleY = 250;
        // let paddle2Y = 250;
        const PADDLE_HEIGHT = 100;

        //mouse action for the paddle
        function calculateMousePos(evt) {
            let rect = canvas.getBoundingClientRect();
            let root = document.documentElement;
            let mouseX = evt.clientX - rect.left - root.scrollLeft;
            let mouseY = evt.clientY - rect.top - root.scrollTop;
            return {//object literal 
                x:mouseX,
                y:mouseY
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
            canvas.addEventListener('mousemove', function (evt){
                let mousePos = calculateMousePos(evt);
                paddleY = mousePos.Y;
            });
        }

        //setting the speed and the direction of the ball 
        function moveEverything() {
            ballX = ballX + ballSpeedX;
            ballY = ballY + ballSpeedY;

            //ball bounces vertical 
            if (ballX < 0) {
                ballSpeedX = -ballSpeedX;
            }
            if (ballX > canvas.width) {
                ballSpeedX = -ballSpeedX;
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
            colorRect(0, paddleY, 10, 100, 'white');
            //this is the ball          
            colorCircle(ballX, ballY, 10, 'blue');
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