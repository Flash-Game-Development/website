let c, ctx;
let gameState = "MAINMENU";
let mouseX = 50;

let ballX = 50;
let ballY = 150;
let ballDX = 1;
let ballDY = 1;

window.onload = function() {
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");

    c.addEventListener('mousemove', function(event) {
        let rect = c.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
    });
    
    drawLoop();
};

window.addEventListener('keydown', function(event) {
    if(event.key === 'p' || event.key === 'P'){
        gameState = "GAME";
    }
    if(event.key === 'q' || event.key === 'Q'){
        gameState = "MAINMENU";
        gameReset();
    }
});

function drawLoop(){

    ctx.clearRect(0, 0, c.width, c.height);

    switch (gameState) {
        case "MAINMENU":
            drawMainMenu();
            break;
        case "GAME":
            drawGame();
            break;
        case "GAMEOVER":
            drawGameOver();
            break;

    }

    requestAnimationFrame(drawLoop);
}

function drawMainMenu(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Breakout!", 10, 50);
    ctx.fillText("Press 'p' to play!", 10, 75);
    ctx.fillText("Press 'q' to quit", 10, 100);

}

function drawGame(){
    
    ctx.beginPath();
    ctx.rect(mouseX - 25, 275, 50, 15);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ballX += ballDX;
    ballY += ballDY;

    // check for hit bottom
    if(ballY > 320){
        gameState = "GAMEOVER";
    }

    // check for hit sides
    if(ballX > 475 || ballX < 5){
        ballDX *= -1;
    }

    // check for hit platform
    if(ballX > mouseX - 25 && ballX < mouseX + 25 && ballY > 270){
        ballDY *= -1;
    }

    // check for hit top
    if(ballY < 5){
        ballDY *= -1;
    }

    ctx.arc(ballX, ballY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

}

function drawGameOver(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("You lost, press q to restart", 10, 50);
}

function gameReset(){
    ballX = 50;
    ballY = 150;
    ballDX = 1;
    ballDY = 1;
}