new p5((p) => {
  let offset = 0;
  let repeat = 50;
  let marginY = 40;
  let marginX = 40;
  let spacingY;
  let g = 0;
  let b = 10;
  let r = 40;
  p.setup = () => {
    p.createCanvas(400, 400);
    spacingY = (p.height - marginY * 2) / (repeat - 1);
  };
  p.draw = () => {
    p.background(r, g, b);
    offset = 0;

    p.stroke(255);
    p.strokeWeight(1.5);
    p.noFill();
    for (let i = 0; i < repeat; i++) {
      p.beginShape();
      for (let j = marginX; j < p.width - marginX; j++) {
        let distanceFromCenter = p.abs(j - p.width / 2);
        let r = p.width / 2 - distanceFromCenter - p.width / 4;
        let range;

        if (r > 0) {
          range = r / 2;
        } else {
          range = 0;
        }

        let n = p.noise(offset);
        y = marginY + i * spacingY + n * range * -1;
        p.vertex(j, y);
        offset += 0.05;
      }
      p.endShape();
    }
    g = (g + 0.5) % 30;
    b = (b + 0.3) % 35;
    r = (r + 0.1) % 40;
  };
}, "1DNoiseContainer");

new p5((p) => {
  let slimeMolds;
  let slimemolds = [];
  let num = 1000;
  p.setup = function () {
    p.createCanvas(400, 400);
    p.angleMode(p.DEGREES);
    for (let i = 0; i < num; i++) {
      slimemolds[i] = new SlimeMold(p);
      slimemolds[i].initialize();
    }
    // slimeMold = new SlimeMold(p);
  };

  p.draw = function () {
    p.background(0, 5);
    p.loadPixels();
    for (let i = 0; i < num; i++) {
      slimemolds[i].update();
      slimemolds[i].display();
    }
  };
}, "slimeMoldsContainer");

new p5((p) => {
  let canvasW = 400;
  let canvasH = 400;
  let size = 50;
  let cols = canvasW / size;
  let rows = canvasH / size;
  let simpleShapes = [];

  p.setup = () => {
    let shapeCanvas = p.createCanvas(canvasW, canvasH);
    shapeCanvas.parent("simpleShapeContainer");
    p.background(220);
    p.rectMode(p.CENTER);
    p.angleMode(p.DEGREES);
    for (let i = 0; i < cols; i++) {
      simpleShapes[i] = [];
      for (let j = 0; j < rows; j++) {
        simpleShapes[i][j] = new SimpleShape(p, i * size, j * size, size);
      }
    }
  };
  p.draw = () => {
    p.background(10);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        simpleShapes[i][j].move();
        simpleShapes[i][j].draw();
      }
    }
    // let simpleShape = new SimpleShape(p, 0, 200, size);
    // simpleShape.move();
    // simpleShape.draw();
  };
});

new p5((p) => {
  let gameOfLife = new GameOfLife(p);
  // p.playGrid = function () {
  //   p.play = !p.play;
  // };
  p.setup = () => {
    gameOfLife.setup();
  };
  p.draw = function () {
    gameOfLife.draw();
  };
  p.mouseDragged = () => {
    gameOfLife.mouseDragged();
    return false;
  };
});

new p5((p) => {
  let font;
  let points = [];
  let r = 8;
  let angle = 0;

  p.preload = () => {
    // Load the font file directly
    font = p.loadFont(
      "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceSansPro-Semibold.otf"
    );
  };
  p.setup = () => {
    let ttpFontContainerCanvas = p.createCanvas(400, 400);
    ttpFontContainerCanvas.parent("ttpFontContainer");
    points = font.textToPoints("A", 100, 300, 300, {
      sampleFactor: 0.1,
    });
    p.angleMode(p.DEGREES);
  };
  p.draw = () => {
    p.background(220);
    for (let i = 0; i < points.length; i++) {
      // if (points[i].alpha == 180) {
      //   p.fill(255, 0, 0);
      // } else {
      //   p.fill(255);
      // }
      p.ellipse(points[i].x + r * p.sin(angle + i * 10), points[i].y, 10, 10);
    }
    angle += 5;
  };
});
