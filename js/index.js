const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sideFruit = document.getElementById("current-fruit");
// creates all the sound objects
const backgroundMusic = new Audio();
backgroundMusic.src = "./sounds/background.mp3";
backgroundMusic.volume = 0.01;
const pop = new Audio();
pop.src = "./sounds/pop.wav";
pop.volume = 0.3;
const disagreeSound = new Audio();
disagreeSound.src = "./sounds/disagree.mp3";
disagreeSound.volume = 0.1;
const sounds = new Audio();
sounds.volume = 0.05;
const sound = new Audio();
sound.volume = 0.1;
const goodJobSounds = new Audio();
goodJobSounds.volume = 0.05;
let yaySoundCheering = new Audio();
yaySoundCheering.src = "./sounds/kids-cheering.mp3";
yaySoundCheering.volume = 0.05;

class GameObject {
  constructor(x, y, width, height, img, fruitName) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.speedX = 0;
    this.speedY = 1.5;
    this.fruitName = fruitName;
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
// address list of the images for the rain of fruits which is used to randomly generate new
//fruits used as the source for the fruitImage.src =""

//sound adresses to call the fruit to click on matching with the fruit clicked on
//If clicked on correct fruit, fruit disapears and next fruit is called
class Game {
  constructor() {
    this.fruits = [];
    this.frames = 0;
    this.animationId;
    this.count = 0;
    this.fruitList = [
      { name: "strawberry", path: "./images/strawberry.png" },
      { name: "apple", path: "./images/apple.png" },
      { name: "banana", path: "./images/banana.png" },
      { name: "blackberry", path: "./images/blackberry.png" },
      { name: "cherry", path: "./images/cherry.png" },
      { name: "grapes", path: "./images/grapes.png" },
      { name: "kiwi", path: "./images/kiwi.png" },
      { name: "lemon", path: "./images/lemon.png" },
      { name: "orange", path: "./images/orange.png" },
      { name: "pear", path: "./images/pear.png" },
      { name: "watermelon", path: "./images/watermelon.png" },
      { name: "pineapple", path: "./images/pineapple.png" },
    ];
    this.soundList = [
      { name: "strawberry", path: "./sounds/strawberry.mp3" },
      { name: "apple", path: "./sounds/apple.mp3" },
      { name: "banana", path: "./sounds/banana.mp3" },
      { name: "blackberry", path: "./sounds/blackberry.mp3" },
      { name: "cherry", path: "./sounds/cherry.mp3" },
      { name: "grapes", path: "./sounds/grapes.mp3" },
      { name: "kiwi", path: "./sounds/kiwi.mp3" },
      { name: "lemon", path: "./sounds/lemon.mp3" },
      { name: "orange", path: "./sounds/orange.mp3" },
      { name: "pear", path: "./sounds/pear.mp3" },
      { name: "watermelon", path: "./sounds/watermelon.mp3" },
      { name: "pineapple", path: "./sounds/pineapple.mp3" },
    ];
    this.yaySounds = [
      "./sounds/victory.mp3",
      "./sounds/good_job.mp3",
      "./sounds/yes.mp3",
    ];
  }
  //method to splice called fruit if clicked on correctly

  removeFruit = (x, y) => {
    sounds.src = this.soundList[this.count].path;
    let soundName = this.soundList[this.count].name;
    sounds.play();
    //random audio for 3 the "good job" sounds played everytime correct fruit is clicked on
    let randomYay = Math.floor(Math.random() * this.yaySounds.length);
    goodJobSounds.src = this.yaySounds[randomYay];
    
    //loop to check if click is the same pixel as the called fruit, if so, fruit is spliced
    this.fruits.forEach((fruit, index) => {
      if (
        parseInt(x) >= parseInt(fruit.x) &&
        parseInt(x) <= parseInt(fruit.x + 80) &&
        parseInt(y) >= parseInt(fruit.y) &&
        parseInt(y) <= parseInt(fruit.y + 80)
      ) {
        if (soundName == fruit.fruitName) { // checks if the called fruit is the same as the clicked fruit
          this.fruits.splice(index, 1);
          this.count++;
          goodJobSounds.play();
        } else {
          disagreeSound.play();
        }
      }
    });
  };
  // This is the most most important block in which all the fruits are randomly drawn and positions are updated
  // And background images are drawn as well as the time frames for generation of new fruits and display of fruit 
  // to be clicked to the left of the canvas
  updateRainItems = () => {
    this.frames++;
    ctx.fillStyle = "PaleTurquoise";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // sets the blue background color for the sky

    const bgImg = new Image();  // draws the top background image(cloud of fruits)
    bgImg.src = "./images/fruits-background.png";
    const background = new GameObject(0, -20, 900, 580, bgImg);
    background.draw();

    const bottomBgImg = new Image(); // draws the bottom background image(field/flowers)
    bottomBgImg.src = "./images/background-flowers.png";
    const bottomBackground = new GameObject(0, 340, 900, 450, bottomBgImg);
    bottomBackground.draw();

    let randomFruit = Math.floor(Math.random() * this.fruitList.length); // genrates rando index number for new fruit
    const fruitImage = new Image();
    fruitImage.src = this.fruitList[randomFruit].path; //sets the src to a random index number from fruit list

    this.fruits.forEach((fruit) => { //updates the position of all the fruits on the screen
      fruit.updatePosition();
      fruit.draw();
    });

    if (this.frames % 340 === 0) { //
      sound.src = this.soundList[this.count].path;
      sound.play();
      
    }

    if (this.frames % 40 === 0) { // sets time frame for the side fruit display
      sideFruit.src = this.fruitList[this.count].path;
    }

    if (this.frames % 20 === 0) { // sets time frame for the number of fruits generated per second
      const originY = 0;

      const maxX = canvas.width;
      const randomX = Math.floor(Math.random() * (maxX - 60));
      const fruit = new GameObject( // produces the fruit object which is pushed to the fruits array
        randomX,
        originY,
        80,
        80,
        fruitImage,
        this.fruitList[randomFruit].name
      );

      this.fruits.push(fruit);
    }
  };

  checkGameCompleted = () => {
    if (this.count == 12) {
      yaySoundCheering.play(); //plays a YAY sound when game completed
      ctx.fillStyle = "purple";
      ctx.font = "60px Verdana";
      ctx.fillText("CONGRATULATIONS!", 130, 300);

      cancelAnimationFrame(this.animationId); // when game is completed animation is interrupted
    }
  };

  clear = () => { // clears the canvas at give time frame to prepare for next cycle of drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  updateGame = () => { // gathers all parts which need to be updated at set time frame and invoked with the game object
    this.clear();
    this.updateRainItems();
    this.animationId = requestAnimationFrame(this.updateGame);
    this.checkGameCompleted();
  };
}

window.onload = () => { // makes sure everything is loaded when page opens
  const game = new Game(); // game object is created
  document.getElementById("start-button").onclick = () => { 
    game.updateGame(); // updated method is invoked 
    backgroundMusic.play();
  };

  function removeFruitCursorPosition(canvas, event) { // gets the mouse coordinates to match with the fruit pxel coordinates
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    game.removeFruit(x, y);  // inokes the remove fruit method using the given coordinates
  }

  canvas.addEventListener("click", function (e) { /// checks for click and inokes the removeFruit function
    removeFruitCursorPosition(canvas, e);
    pop.play(); // plays a pop sound at every click
  });
};

function enableMute() { // mutes and unmutes all sounds 
  backgroundMusic.muted = true;
  disagreeSound.muted = true;
  pop.muted = true;
  sounds.muted = true;
  sound.muted = true;
  goodJobSounds.muted = true; 
  yaySoundCheering.muted = true;
}

function disableMute() {
  backgroundMusic.muted = false;
  disagreeSound.mutes = false;
  pop.muted = false;
  sounds.muted = false;
  sound.muted = false;
  goodJobSounds.muted = false;
  yaySoundCheering.muted = false;
}
