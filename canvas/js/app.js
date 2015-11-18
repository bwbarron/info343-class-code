/* script file for the Canvas demo */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var canvas = document.getElementById("game-canvas");
    var context = canvas.getContext("2d");

    var gameState;

    function newGameState() {
        return {
            ball: {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                width: 10,
                height: 10,
                vectorX: 1,
                vectorY: 1,
                velocity: 10
            },
            paddle: {
                x: 20,
                y: 0,
                width: 10,
                height: canvas.height / 6
            },
            lastTimestamp: performance.now()
        };
    }

    function render() {
        // clear entire canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // render ball
        var ball = gameState.ball;
        context.beginPath();
        context.arc(
            ball.x + (ball.width / 2),
            ball.y + (ball.height / 2),
            ball.width / 2,
            0,
            2 * Math.PI
        );
        context.fill();

        // render paddle
        var paddle = gameState.paddle;
        context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    }

    // advance animation by one step
    function step() {
        var ball = gameState.ball;
        ball.x += ball.vectorX * ball.velocity;
        ball.y += ball.vectorY * ball.velocity;

        // bounce if hit right wall
        if (ball.x + ball.width >= canvas.width) {
            ball.vectorX = -ball.vectorX;
        }
        // bounce if hit top or bottom wall
        if (ball.y <= 0 || ball.y + ball.height >= canvas.height) {
            ball.vectorY = -ball.vectorY;
        }
        // bounce if hit paddle
        var paddle = gameState.paddle;
        if (ball.x < paddle.x + paddle.width) {
            if (ball.y + ball.height >= paddle.y && ball.y <= paddle.y + paddle.height) {
                ball.vectorX = -ball.vectorX;
            } else {
                // game over
                context.font = "20px Helvetica";
                var gameOverMsg = "Game Over";
                var metrics = context.measureText(gameOverMsg);
                context.fillText(
                    gameOverMsg,
                    (canvas.width - metrics.width) / 2,
                    (canvas.height - 20) / 2
                );

                return false;
            }
        }
        return true;
    }

    function animate(timestamp) {
        render();
        var continueGame = true;
        if (timestamp - gameState.lastTimestamp > 16) {
            continueGame = step();
            gameState.lastTimestamp = timestamp;
        }
        if (continueGame) {
            requestAnimationFrame(animate);
        }
    }

    document.addEventListener("mousemove", function (evt) {
        var canvasY = evt.clientY - canvas.offsetTop;
        var paddle = gameState.paddle;
        paddle.y = canvasY - (paddle.height / 2);
    });

    gameState = newGameState();

    // ask browser to animate as quickly as possible
    requestAnimationFrame(animate);

});
