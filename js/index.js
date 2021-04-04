const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class GameObject {
  constructor(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.speedX = 0;
    this.speedY = 1;
  }

  updatePosition() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

class Game {
  constructor() {
    this.fruits = [];
    this.fruitList = [];
    this.frames = 0;
    this.score = 0;
    this.animationId;
  }

  start = () => {
    this.updateGame();
  };

  updateRainItems = () => {
    this.frames++;

    for (let i = 0; i < this.fruits.length; i++) {
      this.fruits[i].updatePosition();
      this.fruits[i].draw();
    }

    if (this.frames % 80 === 0) {
      const originY = 15;

      const minX = 20;
      const maxX = canvas.width;
      const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      



      
      
      const fruitImage = new Image();
      fruitImage.src = "/fun-rain/images/strawberry.png";
      const fruit = new GameObject(randomX, originY, 50, 50, fruitImage);

      this.fruits.push(fruit);
      this.score += 5;
    }
  };

    updateScore() {
    ctx.font = "30px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${this.score}`, 80, 40);
    }

    clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    updateGame = () => {

    this.clear();
    this.updateScore();
    this.updateRainItems();
    this.animationId = requestAnimationFrame(this.updateGame);
    // this.checkGameOver();
    };
}

function startGame() {
  const game = new Game();
  game.start();
  
  const bgImg = new Image();
  bgImg.src = "/fun-rain/images/background-flowers.png";
  const background = new GameObject(0, 0, canvas.width, canvas.height, bgImg)
  background.draw();  

  document.addEventListener("keydown", (event) => {
  });
  
}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};
