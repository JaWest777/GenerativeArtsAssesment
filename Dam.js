let code = '1234';        // The correct code to unlock the safe
let enteredCode = '';     // Code entered by the user
let buttons = [];         // Array to hold button objects
let message = '';         // Message to display the result

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  
  // Create buttons for digits 0-9
  let digits = '0123456789';
  let buttonSize = 50;
  let startX = width / 2 - buttonSize * 1.5;
  let startY = height / 2 - buttonSize * 2;
  
  for (let i = 0; i < digits.length; i++) {
    let x = startX + (i % 3) * buttonSize;
    let y = startY + floor(i / 3) * buttonSize;
    buttons.push(new Button(x, y, buttonSize, digits[i]));
  }
}

function draw() {
  background(220);
  drawSafe();
  drawButtons();
  displayEnteredCode();
}

function drawSafe() {
  // Draw the safe box
  fill(150);
  rect(width / 2 - 100, height / 2 - 150, 200, 200, 10);
  // Draw the unlock message
  fill(0);
  textSize(24);
  text(message, width / 2, height / 2 + 100);
}

function drawButtons() {
  for (let button of buttons) {
    button.show();
  }
}

function displayEnteredCode() {
  // Display the entered code
  fill(0);
  textSize(32);
  text(enteredCode, width / 2, height / 2 - 100);
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
    message = 'Safe Unlocked!';
  } else {
    message = 'Incorrect Code!';
  }
  enteredCode = '';  // Reset the entered code
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
    return mx > this.x && mx < this.x + this.size && my > this.y && my < this.y + this.size;
  }
}
