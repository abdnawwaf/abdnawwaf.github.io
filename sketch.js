var xNoise, yNoise, xStart, yStart, scl, onemorescale;
var xstartNoise, ystartNoise;
var a, b, lastx, lasty;
var fade;
var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.class("joe-bg");
  strokeWeight(1);
  scl = 7;
  noFill();
  xStart = random(10);
  yStart = random(10);
  rectMode(CENTER);
  colorMode(HSB, 360, 255, 255, 255);
  xstartNoise = random(20);
  ystartNoise = random(20);
  lastx = 0;
  lasty = 0;
  fade = 100;
}

function draw() {
  fill(255); // Navy-like dark background to match your webpage
  noStroke();
  rect(0, 0, width * 2, height * 2); // Background clear

  xstartNoise += 0.008;
  ystartNoise += 0.008;

  xStart += noise(xstartNoise) * 0.004 - 0.008;
  yStart += noise(ystartNoise) * 0.004 - 0.008;

  xNoise = xStart;
  yNoise = yStart;

  a = mouseX;
  b = mouseY;

  lastx = lerp(lastx, a, 0.04);
  lasty = lerp(lasty, b, 0.06);

  for (var y = 0; y <= height; y += scl) {
    yNoise += 0.07;
    xNoise = xStart;
    for (var x = 0; x <= width; x += scl) {
      xNoise += 0.07;
      var NoiseVal = noise(xNoise, yNoise);
      var distant = dist(lastx, lasty, x, y);

      if (distant <= fade) {
        drawPointRotate(x, y, NoiseVal, scl);
      }
    }
  }

  fade -= 0.03;
}

function mousePressed() {
  fade = 100;
}

function drawPointRotate(x, y, Noise, Size) {
  push();
  noFill();
  translate(x, y);
  rotate(Noise * radians(360 * 1.15));

  // Custom neon color palette for glowing effect
  let baseHue = map(Noise, 0, 1, 160, 270); // Range for cool neon blues, cyan, and magenta
  let lineColor = color(baseHue, 255, 255); // Full saturation and brightness

  // Add glowing effect by modifying the alpha (transparency) based on Noise value
  lineColor.setAlpha(map(Noise, 0, 1, 50, 120)); // Adjust transparency for more glow
  stroke(lineColor);
  strokeWeight(Noise * 25); // Stroke size depends on Noise value for fluidity

  // Draw the glowing fluid line
  line(0, 0, Noise * (Size + 50), 0);
  stroke(190, 80, Noise * 255, 12); // Faint secondary stroke for extra glow
  strokeWeight(1);
  pop();
}
