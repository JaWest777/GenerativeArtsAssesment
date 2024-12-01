let Riddle;
let r;
let circle1 = 0;
let circle2 = 0;
let rect1 = 70;
var screen = 0;
let yoff = 0.0;
let isHovering = false;

/////Styling/////////

let fontSize = 20; //Defult font size
let opacity = 0;
let textX;
let textY;
let colors = [];

///Escape Setup///////

let code = "8419"; // code to unlock the lock
let enteredCode = ""; // Code entered by the user
let buttons = []; // Array to hold button objects
let message = ""; // Message to display the result
let confetti = []; // Confetti

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  let digits = "123456789";
  let buttonSize = 150;
  let startX = width / 2 - buttonSize * 1.5; //ButtonSetups
  let startY = height / 2 - buttonSize * 2;

  for (let i = 0; i < digits.length; i++) {
    let x = startX + (i % 3) * buttonSize;
    let y = startY + floor(i / 3) * buttonSize;
    buttons.push(new Button(x, y, buttonSize, digits[i])); //ButtonSizes
  }
  for (let i = 0; i < 100; i++) {
    confetti.push(new Confetti()); //Confetti Movement
  }
}

function preload() {
  newFont = loadFont("JMH Typewriter.ttf");
  Riddle = loadImage("background.png");
  message = loadSound("Magn.mp3");
}

function draw() {
  //Menu Screens
  print(mouseX, mouseY);
  if (screen == 0) {
    menuScreen();
  }
  if (screen == 1) {
    gameScreen();
  }
  if (screen == 2) {
    riddleScreen();
  }
  if (screen == 3) {
    QuestionScreen();
  }
  if (screen == 5) {
    CorrectScreen();
  }
  if (screen == 6) {
    VictoryScreen();
  }
  if (screen == 4) {
    CorrectNumberScreen();
  }
}
///////////////MENU SCREEN ////////////////////
function menuScreen() {
  rect(0, 0, 800, 700, 5);
  strokeWeight(1);
  fill("#D40527");
  rect(300, 500, 200, 60, 5);
  textFont(newFont);
  textSize(22);
  fill("#EBB365");
  text("Press to Start", 320, 540);

  fill("#D40527");
  beginShape();

  let xoff = 0;

  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 800, 300); //Loading Animation

    vertex(x, y);

    xoff += 0.05;
  }
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  eye(100);

  if (
    mouseX >= 300 &&
    mouseX <= 500 &&
    mouseY >= 500 &&
    mouseY <= 560 &&
    mouseIsPressed == true
  ) {
    screen = 1;
  }
}

///////////////MENU SCREEN END ////////////////////

///////////////FUNCTIONS START ////////////////////

function checkOverRadio() {
  // Check if the mouse is over the hover area
  let hover = mouseX > 50 && mouseX < 125 && mouseY > 80 && mouseY < 530;

  // Play or stop the sound based on the hover state
  hover
    ? isHovering || (message.loop(), (isHovering = true))
    : isHovering && (message.stop(), (isHovering = false));
}

function Flashlight() {
  background(0);
  if (mouseIsPressed) {
    push();
    blendMode(LIGHTEST);
    fill(255);
    ellipse(mouseX, mouseY, 250, 250); //Flashlight Effect
    pop();
  } else {
    blendMode(DARKEST);
  }
  image(Riddle, 0, 0, width, height);
}

function eye() {
  fill("#D40527"); //Eye Structure
  strokeWeight(25);
  translate(width / 2, height / 4);
  beginShape();
  vertex(-320, 0);
  bezierVertex(-120, -200, 120, -200, 320, 0);
  bezierVertex(120, 200, -120, 200, -320, 0);
  endShape();

  fill(255);
  ellipse(0, 0, 450, 300);
  fill("#D40527");
  ellipse(0, 0, 350, 300);
  fill(255);
  ellipse(0, 0, 150, 300);
  fill(255);
  ellipse(0, 0, 50, 50);
  noFill();
  ellipse(0, 0, 150, 300);
}

function loading() {
  let cir1 = radians(circle1);
  let cir2 = radians(circle2);

  let x1 = width / 2 + rect1 * cos(cir1);
  let x2 = width / 2 + rect1 * cos(cir2);

  let y1 = height / 2 + rect1 * sin(cir1);
  let y2 = height / 2 + rect1 * sin(cir2); //Loading Animation

  fill(255);
  fill("red");
  rect(330, 130, 140, 140);

  fill("#EBB365");
  ellipse(x1, height * 0.25 - 120, rect1, rect1);
  ellipse(x2, height * 0.25 + 120, rect1, rect1);

  fill("#EBB365");
  ellipse(width * 0.5 - 120, y1 - 250, rect1, rect1);
  ellipse(width * 0.5 + 120, y2 - 250, rect1, rect1);

  circle1 += 2;
  circle2 += 3;
}

///////////////GAME SCREEN ////////////////////

function gameScreen() {
  background("yellow");
  fill("red");
  rect(0, 0, 800, 800, 5);
  fill("#EBB365");

  textSize(40);
  text("Level - Big Brothers Hideout", 80, 500);
  textSize(20);
  text("Click and Hold to use the Flashlight to discover clues", 100, 560);
  text("Your Mission is to Decrypt the code and escape big brother.", 70, 440);
  textSize(40);
  text("REMEMBER HE IS ALWAYS WATCHING", 30, 720);
  strokeWeight(5);
  rect(290, 590, 200, 60, 5);
  textSize(20);
  fill("#D40527");
  text("Press to Start", 315, 625);
  loading();
  if (
    mouseX >= 290 &&
    mouseX <= 490 &&
    mouseY >= 590 &&
    mouseY <= 650 &&
    mouseIsPressed == true
  ) {
    screen = 2;
  }
}

///////////////RIDDLE SCREEN  ////////////////////

function riddleScreen() {
  //background(Riddle);
  Flashlight();

  stroke(10);

  fill("#6f7275");
  rect(280, 25, 220, 100, 5);
  fill("#D40527");
  stroke(5);
  textSize(60);
  text("Guess", 305, 100);
  r = createVector(250, 0);
  //rect(50, 430, 80, 100, 5);
  if (mouseX > 50 && mouseX < 130 && mouseY > 430 && mouseY < 530) {
    //Guess Button
    fill(240, 20, 140);
  } else {
    fill(128);
  }

  checkOverRadio();

  function splashScreen() {
    fill("red");
    rect(400, 400, 200, 200);
  }
  if (
    mouseX >= 280 &&
    mouseX <= 500 &&
    mouseY >= 20 &&
    mouseY <= 120 &&
    mouseIsPressed == true
  ) {
    screen = 3;
  }
}

///////////////RIDDLE END  ////////////////////

///////////////QUESTION SCREEN ////////////////////
function QuestionScreen() {
  blendMode(BLEND);
  background("yellow");
  fill("red");
  rect(0, 0, 800, 800, 5);
  fill("#EBB365");

  textSize(60);
  //text("QUESTION TIME", 200, 80);
  textSize(20);

  text(
    "Which of these three phrases did you discover within the secret room?.",
    12,
    140
  );
  textSize(40);
  text("REMEMBER HE IS ALWAYS WATCHING", 30, 720);
  strokeWeight(5);
  rect(250, 590, 300, 60, 5);
  textSize(20);
  fill(150);
  text("Press to Restart", 310, 625);

  // Creates an array of colors for the text
  for (let i = 0; i < 10; i++) {
    colors.push(color(random(255), random(255), random(255)));
  }
  fontSize += 0.5;
  opacity += 2;
  fill(colors[frameCount % colors.length]);
  textSize(fontSize);
  textStyle(BOLD);
  text("Question Time!", 50, 80);
  // Reset the animation
  if (opacity > 255) {
    opacity = 0;
    fontSize = 32;
  }

  textSize(50);
  fill(150);

  text("Wicked  Witch 221", 150, 250);

  textSize(50);
  fill(150);
  text("Magnificant Marvel 101", 100, 400);

  textSize(50);
  fill(150);
  text("Elegant Eagle 330", 150, 550);

  if (
    mouseX >= 100 &&
    mouseX <= 700 &&
    mouseY >= 350 &&
    mouseY <= 400 &&
    mouseIsPressed == true
  ) {
    screen = 4;
  }
  if (
    mouseX >= 250 &&
    mouseX <= 550 &&
    mouseY >= 600 &&
    mouseY <= 650 &&
    mouseIsPressed == true
  ) {
    screen = 0;
  }
   if (
    mouseX >= 140 &&
    mouseX <= 600 &&
    mouseY >= 200 &&
    mouseY <= 250 &&
    mouseIsPressed == true
  ) {
    screen = 0;
  }
   if (
    mouseX >= 140 &&
    mouseX <= 600 &&
    mouseY >= 500 &&
    mouseY <= 550 &&
    mouseIsPressed == true
  ) {
    screen = 0;
  }
}
//////////Escape Functions//////////////////
////////////////////////////////////////
///////////////////////////////////////

function drawLock() {
  textSize(30);
  fill(0);
  text("Enter the Correct Code to Escape", 150, 680);
  // Draw the Code box
  fill(150);
  rect(width / 4 - 100, height / 4 - 150, 600, 600, 30);
  // Draw the unlock message
  fill(0);
  textSize(50);
  text(message, 100, 760);
}

function drawButtons() {
  for (let button of buttons) {
    button.show();
  }
}

function displayEnteredCode() {
  // Display the entered code
  strokeWeight(2);
  fill(0);
  textSize(32);
  text(enteredCode, width / 2, 600);
}

function mousePressed() {
  for (let button of buttons) {
    if (button.isClicked(mouseX, mouseY)) {
      enteredCode += button.label;
      // Check if the code is complete
      if (enteredCode.length === code.length) {
        checkCode();
      }
    }
  }
}

function checkCode() {
  if (enteredCode === code) {
    message = "Click Here to Escape!";
  } else {
    message = "You Are Trapped!";
  }
  enteredCode = ""; // Reset the entered code
}

class Button {
  constructor(x, y, size, label) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.label = label;
  }

  show() {
    fill(200);
    rect(this.x, this.y, this.size, this.size, 5);
    fill(0);
    textSize(24);
    text(this.label, this.x + this.size / 2, this.y + this.size / 2);
  }

  isClicked(mx, my) {
    return (
      mx > this.x &&
      mx < this.x + this.size &&
      my > this.y &&
      my < this.y + this.size
    );
  }
}

/////////////End of Escape Functions//////////////////////

function CorrectScreen() {
  background("#D40527"); // Black background

  drawLock();
  drawButtons();
  displayEnteredCode();

  if (
    mouseX >= 100 &&
    mouseX <= 700 &&
    mouseY >= 700 &&
    mouseY <= 800 &&
    mouseIsPressed == true
  ) {
    screen = 6;
  }
}

function VictoryScreen() {
  background("#D40527");
  for (let i = 0; i < confetti.length; i++) {
    confetti[i].display();
    confetti[i].move();
  }

  // Display victory message
  fill(0);
  textSize(60);
  textAlign(CENTER, CENTER);
  text("Congratulations!", width / 2, height / 2 - 50);
  textSize(24);
  text("You've Escaped Big Brother!", width / 2, height / 2 + 20);

  text("This Isn't Over!!!", 120, 750);
}
class Confetti {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(5, 15);
    this.color = color(random(255), random(255), random(255));
    this.speed = random(1, 3);
  }

  display() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }

  move() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }
}

function CorrectNumberScreen() {
  background("#D40527");
  fill(255); // White text color
  textSize(48);
  text("Congratulations!", 200, height / 2 - 50);

  textSize(24);
  text("Quick he is Watching.", 270, height / 2 + 20);
  text("Use this Keycode to Escape!", 240, height / 2 + 50);
  textSize(100);
  text("8419", 300, height / 2 + 200);
  rect(310, height / 2 + 250, 200, 70, 5);
  textSize(40);
  noStroke();
  fill("#D40527");
  text("Escape!", 340, height / 2 + 300);
  fill("#D40527");

  if (
    mouseX >= 300 &&
    mouseX <= 500 &&
    mouseY >= 650 &&
    mouseY <= 750 &&
    mouseIsPressed == true
  ) {
    screen = 5;
  }
}
