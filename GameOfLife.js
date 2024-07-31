class GameOfLife {
  constructor(p) {
    this.p = p;
    this.cols = 0;
    this.rows = 0;
    this.size = 4;
    this.grid = [];
    this.ranGrid = this.ranGrid.bind(this);
    this.resetGrid = this.resetGrid.bind(this);
    this.playGrid = this.playGrid.bind(this);
    this.play = false;
    this.hueVal = 0;
    // this.mouseDragged = this.mouseDragged.bind(this);
  }
  setup() {
    let gameofLifeCanvas = this.p.createCanvas(400, 400);
    gameofLifeCanvas.parent("gameOfLifeContainer");

    this.p.colorMode(this.p.HSB, 255);
    this.p.background(220);
    this.cols = this.p.width / this.size;
    this.rows = this.p.height / this.size;
    // console.log(this.p.random(10));

    let playButton = this.p.createButton("play");
    playButton.parent("gameOfLifeContainer");
    playButton.style("padding", "2px 10px");
    playButton.mousePressed(() => this.playGrid());

    let resetButton = this.p.createButton("reset");
    resetButton.parent("gameOfLifeContainer");
    resetButton.style("padding", "2px 10px");
    resetButton.mousePressed(this.resetGrid);

    let ranButton = this.p.createButton("random");
    ranButton.parent("gameOfLifeContainer");
    ranButton.style("padding", "2px 10px");
    ranButton.mousePressed(this.ranGrid);

    for (let i = 0; i < this.cols; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = this.p.floor(this.p.random(2));
      }
    }
  }
  draw() {
    if (this.play) {
      this.displayGrid();
      let nextGen = [];
      for (let i = 0; i < this.cols; i++) {
        nextGen[i] = [];
        for (let j = 0; j < this.rows; j++) {
          // if (i == 0 || i == cols - 1 || j == 0 || j == rows - 1) {
          //   nextGen[i][j] = 1;
          // } else {
          // }
          // FOUR (4) rules
          let n = this.neighboringStates(this.grid, i, j);
          if (this.grid[i][j] == 1 && n < 2) {
            // 1. cell dies
            nextGen[i][j] = 0;
          } else if (this.grid[i][j] == 1 && (n == 2 || n == 3)) {
            // 2. cell lives when neighbor 2 or 3
            nextGen[i][j] = 1;
          } else if (this.grid[i][j] == 1 && n > 3) {
            // 3. cell dies when neighbor 4 or more
            nextGen[i][j] = 0;
          } else if (this.grid[i][j] == 0 && n == 3) {
            // 4. dead cell revives when exactly 3 around
            nextGen[i][j] = 1;
          } else {
            nextGen[i][j] = this.grid[i][j];
          }
        }
      }
      this.grid = nextGen;
    }
  }
  //essentially just look for neighboring elements within the grid
  neighboringStates(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let xIdx = (x + i + this.cols) % this.cols;
        let yIdx = (y + j + this.rows) % this.rows;
        sum += this.grid[xIdx][yIdx];
      }
    }
    sum -= this.grid[x][y]; //ONLY look at neighbors NOT self
    return sum;
  }
  displayGrid() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (this.grid[i][j] == 0) {
          if (this.play) {
            this.p.fill(255);
          } else {
            this.p.fill(120);
          }
        } else {
          this.p.fill(this.hueVal,255,255);
        }
        this.p.noStroke();
        this.p.rect(i * this.size, j * this.size, this.size, this.size);
      }
    }
  }
  resetGrid() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = 0;
      }
    }
    // this.displayGrid();
  }
  ranGrid() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = this.p.floor(this.p.random(2));
      }
    }
  }
  mouseDragged() {
    let margin = 2;
    let x = this.p.floor(this.p.mouseX / this.size);
    let y = this.p.floor(this.p.mouseY / this.size);

    for (let i = -margin; i < margin; i++) {
      for (let j = -margin; j < margin; j++) {
        this.grid[x + i][y + j] = 1;
        this.displayGrid();
      }
    }
    this.hueVal += 2;
    if (this.hueVal > 255) {
      this.hueVal = 0;
    }
  }
  playGrid() {
    this.play = !this.play;
    this.displayGrid();
  }
}
