var startX = 0;
var startY = 0;
var wih, 
    numOfBugs,
    numOfStars,
    numOfHearts,
    numOfGems;

//Create random numbers (source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
var randomSpeed = function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var randomHight = function getRandomIntInclusive(min, max){
    return Math.floor(Math.random()* (max - min + 1)) + min;
}

/////////////////Enemies/////////////////
var bugStartX = 0; 
var bugStartY = 0; 


var Enemy = function(x, y, speed, axis) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //initial location
    this.x = x;
    this.y = y;

    //speed
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.    
    //update Enermy location
    var delta = this.speed * dt;
    this.x += delta;

    if(this.x > 500){
        this.reset();
    }
    //check collision with Player
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var enemy1 = new Enemy(0, 68, 100);
var enemy2 = new Enemy(0, 151, 90);
var enemy3 = new Enemy(0, 234, 95);
var enemy4 = new Enemy(0, 317, 70);

var allEnemies = [enemy1, enemy2, enemy3, enemy4];

Enemy.prototype.reset = function(){
    this.x = 0;
    this.y = 70;
    this.speed = randomSpeed(500, 200);

};

/////////////////Player/////////////////

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y){
    //setting the player's initial location
    this.x = x;
    this.y = y;
    // loading the image
    this.sprite = "images/char-boy.png";
};

//var player = new Player (startX, startY);
Player.prototype.update = function(dt){
    //Update Player location
    this.x * dt;
    this.y * dt;
    checkCollisions();
};


Player.prototype.render = function (){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var checkCollisions = function(){
    var Rectangle = function(left, top){
        this.left = left + 35;
        this.top = top + 20;
        this.right = this.left + 65;
        this.bottom = this.top + 62;
    };
    function checkCollision(player, obstacle){

        return! (player.left > obstacle.right ||
        player.right < obstacle.left ||
        player.top > obstacle.bottom ||
        player.bottom < obstacle.top
        );
    }

    ///???
    var playerRectangle = new Rectangle(player.x, player.y);
    // Check collision with enemies
    for (var i = 0; i<allEnemies.length; i++){
        var enemyRectangle = new Rectangle(allEnemies[i].x, allEnemies[i].y);
        if(checkCollision(playerRectangle, enemyRectangle)){
            console.log("hello collision!");
            player.reset();
        }
    }
    if(player.y == -15){
        player.reset();
    }
};  

Player.prototype.handleInput = function(allowedKeys){
    var increaseX = 101;
    var increaseY = 83;

    switch(allowedKeys){
        case "left":
            if (this.x > 0){
                this.x -= increaseX;
            }
            break;

        case "up":
            if (this.y > 0){
                this.y -= increaseY;
            }
            break;

        case "right":
        // need to fix this
            if (this.x < 402){
                this.x += increaseX;
            }
            break;

        case "down":
            if (this.y < 400){
                this.y += increaseY;
            }
            break;
    };  
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(200, 400);

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// check the Player cannot move off screen
// reset handler
