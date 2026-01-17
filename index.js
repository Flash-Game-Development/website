let mouseX = 50;
let c, ctx;
let gameState = "MAINMENU";

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
}