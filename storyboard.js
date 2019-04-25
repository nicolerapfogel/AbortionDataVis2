//bindto: to bind

let data = {}; // Global object to hold results from the loadJSON call
let bubbles = []; // Global array to hold all bubble objects

let cnv;

// preload JSON  data
function preload() {
  data = loadJSON('data/bubbles.json');
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("mysketch")
  loadData();
  //button = createButton('See the Map')
  //button.position(windowWidth-300, windowHeight-100)
  //let link = createA('http://nicolerapfogel.github.io/AbortionPolicyMap/', 'Click here to see how these policies impact your state');
  //link.position(windowWidth-300, windowHeight-100);
}

function draw() {
  background(0);
  fill(125);
  textFont('Lato');
  textSize(30);
  text('State-Level US Abortion Policies', windowWidth/2, 50);

  // Display all bubbles
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].rollover(mouseX, mouseY);
  }
}



// Convert saved Bubble data into Bubble Objects
function loadData() {
  let bubbleData = data['bubbles'];
  for (let i = 0; i < bubbleData.length; i++) {
    // Get each object in the array
    let x = bubbleData[i].x;
    let y = bubbleData[i].y;
    let diameter = bubbleData[i].diameter;
    let name = bubbleData[i].name;
    let r = bubbleData[i].r;
    let g = bubbleData[i].g;
    let b = bubbleData[i].b;
    let e = bubbleData[i].e;
    let t = bubbleData[i].Total_States

    // Put object in array
    bubbles.push(new Bubble(x, y, t, diameter, name, r, g, b, e,));
  }
}

// Bubble class
class Bubble {
    constructor(x, y, t, diameter, name, r, g, b, e) {
      this.x = Number(x);
      this.y = Number(y);
      this.diameter = Number(diameter);
      this.name = name;
      this.r = Number(r);
      this.g = Number(g);
      this.b = Number(b);
      this.e = e;
      this.t = t
      this.over = false;
      
      this.new_x = map(this.x, 0, 800, 0, windowWidth-300);
      this.new_y = map(this.y, 0, 800, 100, windowHeight);
    }

  // Check if mouse is over the bubble
  rollover(px, py) {
      var d = dist(px, py, this.new_x, this.new_y);
      if (d < this.diameter) {
        this.over = true;
      } else {
        this.over = false;
  }
}

  // Display the Bubble
  display() {
    stroke(0);
    strokeWeight(0.8);
    fill(this.r, this.g, this.b);
    ellipse(this.new_x, this.new_y, this.diameter, this.diameter);
    
      
;    if (this.over) {
      fill(120, 80);
      noStroke();
      rect(windowWidth-200, 0, 300, 800)
      textAlign(CENTER);
      fill(this.r, this.g, this.b);
      rectMode(CENTER);
      
      textSize(20);
      text(this.name, windowWidth-200, 180, 300, 200);
      textSize(15);
      text(this.t + " states", windowWidth-200, 390, 300, 500);
      text(this.e, windowWidth-200, 590, 300, 800);
    }
  }
}





