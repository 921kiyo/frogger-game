
var allEnemies,
    lives,
    score,
    enemyRectangle,
    randomItem,
    text,
    Items;

//Create random speed and height (source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

//Render superclass

//var Character = function() {
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//};
/////////////////Enemies/////////////////

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //initial location
    this.x = 0;
    this.y = this.randomHeight();
    //speed
    this.speed = this.randomNum(500, 100);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.randomHeight = function() {
    var randomN = Math.floor(Math.random() * 4);
    return [68, 151, 234, 317][randomN];
};

Enemy.prototype.randomNum = function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

    if (this.x > 500) {
        this.reset();
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


function updateAllEnemies() {
    var numberOfBugs = 4;
    allEnemies = [];
    for (i = 0; i < numberOfBugs; i++) {
        allEnemies.push(new Enemy());
    }
}
updateAllEnemies();

/////////////////collective items/////////////////

//Randomly select an item to be shown on the screen
randomItem = function() {
    var num = Math.floor(Math.random() * 3);
    return ["images/Star.png", "images/Gem Blue.png", "images/Heart.png"][num];
};

//show the randomly selected collective item on the screen
Items = function() {
    this.x = this.collectColumn();
    this.y = this.collectHeight();
    this.sprite = randomItem();
};

Items.prototype.collectHeight = function() {
    var num = Math.floor(Math.random() * 4);
    return [68, 151, 234, 317][num];
};

Items.prototype.collectColumn = function() {
    var num = Math.floor(Math.random() * 4);
    return [-2, 91, 200, 301, 402][num];
};

Items.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var items = new Items();

/////////////////Victim/////////////////
// Will try this part another time for update.
/*
var VictimColumn = function (n){
    var n =  Math.floor(Math.random()* 4);
    return [-2,91,200,301, 402][n];
};

var Victim = function(){
    this.x = VictimColumn();
    this.y = -15;
    this.sprite = "images/char-pink-girl.png";
};

Victim.prototype.update = function(dt){
    this.x * dt;
    this.y * dt;
};

Victim.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var victim = new Victim();

*/
/////////////////Player/////////////////

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    //setting the player's initial location
    this.x = x;
    this.y = y;
    // loading the image
    this.sprite = "images/char-boy.png";
};

//var player = new Player (startX, startY);
Player.prototype.update = function(dt) {
    //Update Player location
    this.checkCollisions();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.checkCollisions = function() {
    var Rectangle = function(left, top) {
        this.left = left + 35;
        this.top = top + 20;
        this.right = this.left + 65;
        this.bottom = this.top + 62;
    };

    function checkCollide(player, obstacle) {
        return !(player.left > obstacle.right ||
            player.right < obstacle.left ||
            player.top > obstacle.bottom ||
            player.bottom < obstacle.top
        );
    }

    var playerRectangle = new Rectangle(this.x, this.y);
    // Check collision with enemies
    for (i = 0; i < allEnemies.length; i++) {
        enemyRectangle = new Rectangle(allEnemies[i].x, allEnemies[i].y);
        if (checkCollide(playerRectangle, enemyRectangle)) {
            player.reset();
        }
    }
    /*
    var victimRectangle = new Rectangle(victim.x, victim.y);
    if(checkCollision(playerRectangle, victimRectangle)){
        console.log("victim!");
    }
    */
    var itemsRectangle = new Rectangle(items.x, items.y);
    if (checkCollide(playerRectangle, itemsRectangle)) {
        //Enemy.prototype.reset();
        if (items.sprite == "images/Heart.png") {
            lives += 1;
            document.getElementById("livesleft").innerHTML = lives.toString();
            items.reset();

        } else if (items.sprite == "images/Star.png") {
            items.reset();
            score += 100;
            document.getElementById("score").innerHTML = score.toString();
        } else if (items.sprite == "images/Gem Blue.png") {
            items.reset();
            score += 10;
            document.getElementById("score").innerHTML = score.toString();
        } else {
            console.log("fail");
        }
    }
};

Player.prototype.handleInput = function(allowedKeys) {
    var INCREASEX = 101;
    var INCREASEY = 83;

    switch (allowedKeys) {
        case "left":
            if (this.x > 0) {
                this.x -= INCREASEX;
            }
            break;

        case "up":
            if (this.y > 0) {
                this.y -= INCREASEY;
            }
            break;

        case "right":
            if (this.x < 402) {
                this.x += INCREASEX;
            }
            break;

        case "down":
            if (this.y < 400) {
                this.y += INCREASEY;
            }
            break;
    }
};

// Now instantiate your objects.
// Place the player object in a variable called player

var player = new Player(200, 400);


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

