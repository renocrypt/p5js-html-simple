new p5((p) => {
  let canvasW = 600;
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
  p.setup = () => {
    gameOfLife.setup();
  };
  p.draw = function () {
    // gameOfLife.draw();
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
      p.ellipse(points[i].x + r * p.sin(angle + i*10), points[i].y , 10, 10);
    }
    angle += 5;
  };
});
