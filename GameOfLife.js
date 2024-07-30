let cols;
let rows;
let size = 10;
let grid = [];
class GameOfLife {
  constructor(p) {
    this.p = p;
  }
  setup() {
    let gameofLifeCanvas = this.p.createCanvas(400, 400);
    gameofLifeCanvas.parent("gameOfLifeContainer");
    cols = this.p.width / size;
    rows = this.p.height / size;
    // console.log(this.p.random(10));

    for (let i = 0; i < cols; i++) {
      grid[i] = [];
      for (let j = 0; j < rows; j++) {
        grid[i][j] = this.p.floor(this.p.random(2));
      }
    }
  }
  draw() {
    this.p.background(220);
    this.displayGrid();
    let nextGen = [];
    for (let i = 0; i < cols; i++) {
      nextGen[i] = [];
      for (let j = 0; j < rows; j++) {
        // if (i == 0 || i == cols - 1 || j == 0 || j == rows - 1) {
        //   nextGen[i][j] = 1;
        // } else {
        // }
        // FOUR (4) rules
        let n = this.neighboringStates(grid, i, j);
        if (grid[i][j] == 1 && n < 2) {
          // 1. cell dies
          nextGen[i][j] = 0;
        } else if (grid[i][j] == 1 && (n == 2 || n == 3)) {
          // 2. cell lives when neighbor 2 or 3
          nextGen[i][j] = 1;
        } else if (grid[i][j] == 1 && n > 3) {
          // 3. cell dies when neighbor 4 or more
          nextGen[i][j] = 0;
        } else if (grid[i][j] == 0 && n == 3) {
          // 4. dead cell revives when exactly 3 around
          nextGen[i][j] = 1;
        } else {
          nextGen[i][j] = grid[i][j];
        }
      }
    }
    grid = nextGen;
  }
  //essentially just look for neighboring elements within the grid
  neighboringStates(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let xIdx = (x + i + cols) % cols;
        let yIdx = (y + j + rows) % rows;
        sum += grid[xIdx][yIdx];
      }
    }
    sum -= grid[x][y]; //ONLY look at neighbors NOT self
    return sum;
  }
  displayGrid() {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (grid[i][j] == 0) {
          this.p.fill(255);
        } else {
          this.p.fill(0);
        }
        this.p.noStroke();
        this.p.rect(i * size, j * size, size, size);
      }
    }
  }
}
