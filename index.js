let c, ctx;
let gameState = "MAINMENU";
let mouseX = 50;

let ballX = 50;
let ballY = 150;
let ballDX = 1;
let ballDY = 1;

let brickInit = false;
let bricks = [];



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
        case "WIN":
            drawGameWin();
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

    if(!brickInit) initBricks();
    
    ctx.beginPath();
    ctx.rect(mouseX - 25, 275, 50, 15);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    let anyBrickLeft = false;
    bricks.forEach(brick => {
        
        if(brick.visible){
            anyBrickLeft = true;

            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.width, brick.height);
            ctx.fillStyle = "lightblue";
            ctx.fill();
            ctx.closePath();

             if(ballX > brick.x && ballX < brick.x + brick.width && ballY < brick.y + brick.height){
                brick.visible = 0;
                ballDY *= -1;
            }
        }
    });

    if(!anyBrickLeft){
        gameState = "WIN";
        gameReset();
    }

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
        if(Math.random() > .5){
            ballDX = 0.5 + Math.random() * 2;
        } else {
            ballDX = -0.5 - Math.random() * 2;
        }
        ballDY = 0.5 + Math.random() * 2;
        ballDY *= -1;
    }

    // check for hit top
    if(ballY < 5){
        ballDY *= -1;
    }

    ctx.beginPath();
    ctx.arc(ballX, ballY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

}

function drawGameOver(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("You lost, press q to restart", 10, 50);
}

function drawGameWin(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("You win! Nice! Press q to restart", 10, 50);
}

function gameReset(){
    ballX = 50;
    ballY = 150;
    ballDX = 1;
    ballDY = 1;
    bricks = [];
    brickInit = false;
}

function initBricks(){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 3; j++){
            bricks.push({x: i * 45 + 10, y: 10 + (j * 20), width: 40, height: 15, visible: 1});
        }
    }
    brickInit = true;
}