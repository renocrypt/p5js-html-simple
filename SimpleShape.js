
const distMouse = 100;

class SimpleShape {
  constructor(p, x, y, size) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.size = size
    this.angle = 0;
  }
  move() {
    let distance;
    if (this.p.pmouseX - this.p.mouseX != 0 || this.p.pmouseY - this.p.mouseY) {
      distance = this.p.dist(this.p.mouseX, this.p.mouseY, this.x, this.y);
      // console.log(distance, distMouse)
    }
    if (distance < distMouse) {
      this.angle += 2;
    }
  }
  // setup() {
  //   let canvas = this.p.createCanvas(CanvasWidth, CanvasHeight);
  //   canvas.parent("simpleShapeContainer");
  //   this.p.rectMode(this.p.CENTER)
  //   this.p.angleMode(this.p.DEGREES);
  // }
  draw() {
    // this.p.background(220);
    this.p.noFill();
    this.p.push()
    this.p.translate(this.x, this.y);
    this.p.rotate(this.angle);
    
    this.p.rect(0,0, this.size, this.size);
    this.p.pop()
  }
}
