const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class GameObject {
  constructor(x, y, width, height, img, fruitX) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.speedX = 0;
    this.speedY = 2;
    this.fruitX = fruitX;
  }
  // updates the position of the fruits which are objects of GameObject class 
  //called inside the update invoked inside the "update()"" method inside the Game class
  //(requestAnimationFrame)
  updatePosition() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  // generate new images with updated position of the fruit objects invoked in the updateRainItems 
  //inside the forEach for every fruit
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
 
}



class Game {
  constructor() {
    this.fruits = [];
    this.frames = 0;
    this.score = 0;
    this.animationId;
    // address list of the images for the rain of fruits which is used to randomly generate new 
    //fruits used as the source for the fruitImage.src =""
    this.fruitList = [ 
      {name: "strawberry", path: "./images/strawberry.png"}, 
      {name: "apple", path: "./images/apple.png",},      
      {name: "banana", path:"./images/banana.png"},
      {name: "blackberry", path: "./images/blackberry.png"},
      {name: "cherry", path: "./images/cherry.png"},
      {name: "grape", path: "./images/grape.png"},
      {name: "kiwi", path: "./images/kiwi.png"},
      {name: "lemon", path: "./images/lemon.png"},
      {name: "orange", path: "./images/orange.png"},
      {name: "pear", path: "./images/pear.png"},
      {name: "watermelon", path: "./images/watermelon.png"},
      {name: "pineapple", path: "./images/pineapple.png"},
    ];
  }

  removeFruit = (x, y) => {
    this.fruits.forEach((fruit, index, current) => {
      // console.log(`fruit x: ${fruit.x}, fruit y: ${fruit.x}`);
      // console.log(`mouse x: ${x}, mouse y: ${x}`);
      if (
        parseInt(x) >= parseInt(fruit.x)&&
        parseInt(x) <= parseInt(fruit.x + 100)&&
        parseInt(y) >= parseInt(fruit.y )&&
        parseInt(y) <= parseInt(fruit.y + 100)
        ) {
        current.splice(index, 1);
        console.log(fruit.fruitX);
      }
    });
  };

  updateRainItems = () => {
    this.frames++;

    ctx.fillStyle = "PaleTurquoise";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const bgImg = new Image();
    bgImg.src = "/fun-rain/images/background-fruits.png";
    const background = new GameObject(-50, -240, 1000, 320, bgImg);
    background.draw();

    const bottomBgImg = new Image();
    bottomBgImg.src = "/fun-rain/images/background-flowers.png";
    const bottomBackground = new GameObject(0, 400, 900, 350, bottomBgImg);
    bottomBackground.draw();

    this.fruits.forEach((fruit) => {
      fruit.updatePosition();
      fruit.draw();
    });

    const fruitImage = new Image();
    let randomFruit = Math.floor(Math.random() * this.fruitList.length);

    fruitImage.src = this.fruitList[randomFruit].path;

    if (this.frames % 30 === 0) {
      const originY = 10;

      const maxX = canvas.width;
      const randomX = Math.floor(Math.random() * (maxX - 20));
      const fruit = new GameObject(randomX, originY, 80, 80, fruitImage, this.fruitList[randomFruit].name);

      this.fruits.push(fruit);
      this.score += 5;
    }
  };

  clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  updateGame = () => {
    
    // this.removeFruit(this.fruit.x, this.fruit.y)
    this.clear();
    // this.updateScore();
    this.updateRainItems();
    this.animationId = requestAnimationFrame(this.updateGame);
    // this.checkGameCompleted();
  };
}

window.onload = () => {
  const game = new Game();
  document.getElementById("start-button").onclick = () => {
    game.updateGame();
  };

  function removeFruitCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // console.log("x: " + x + " y: " + y)
    // console.log(rect);
    game.removeFruit(x, y);
  }

  const canvas = document.querySelector("canvas");
  canvas.addEventListener("click", function (e) {
    removeFruitCursorPosition(canvas, e);
  });
};
