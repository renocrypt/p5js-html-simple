class SlimeMold {
  constructor(p) {
    this.p = p;
    this.r = 0.5;

    this.heading = this.p.random(360);
    this.vx = p.cos(this.heading);
    this.vy = p.sin(this.heading);
  }

  initialize() {
    this.x = this.p.random(this.p.width);
    this.y = this.p.random(this.p.height);
    this.rightSensorPosition = this.p.createVector(0, 0);
    this.leftSensorPosition = this.p.createVector(0, 0);
    this.frontSensorPosition = this.p.createVector(0, 0);
    this.rotAngle = 30;
    this.sensorAngle = 30;
    this.sensorDistance = 5;
    this.d = this.p.pixelDensity();
  }

  update() {
    this.vx = this.p.cos(this.heading);
    this.vy = this.p.sin(this.heading);
    this.x = (this.x + this.vx + this.p.width) % this.p.width;
    this.y = (this.y + this.vy + this.p.height) % this.p.height;
    //Polar to Cartesian
    this.getSensorPosition(
      this.rightSensorPosition,
      this.heading + this.sensorAngle
    );
    this.getSensorPosition(
      this.leftSensorPosition,
      this.heading - this.sensorAngle
    );
    this.getSensorPosition(this.frontSensorPosition, this.heading);
    // this.rightSensorPosition.x =
    //   this.x +
    //   this.sensorDistance * this.p.cos(this.heading + this.sensorAngle);
    // this.rightSensorPosition.y =
    //   this.y +
    //   this.sensorDistance * this.p.sin(this.heading + this.sensorAngle);

    //     this.leftSensorPosition.x =
    //       this.x +
    //       this.sensorDistance * this.p.cos(this.heading - this.sensorAngle);
    //     this.leftSensorPosition.y =
    //       this.y +
    //       this.sensorDistance * this.p.sin(this.heading - this.sensorAngle);

    //     this.frontSensorPosition.x =
    //       this.x + this.sensorDistance * this.p.cos(this.heading);
    //     this.frontSensorPosition.y =
    //       this.y + this.sensorDistance * this.p.sin(this.heading);

    let index, l, r, f;
    index =
      4 *
        (this.d * this.p.floor(this.rightSensorPosition.y)) *
        (this.d * this.p.width) +
      4 * (this.d * this.p.floor(this.rightSensorPosition.x));
    r = this.p.pixels[index];
    index =
      4 *
        (this.d * this.p.floor(this.leftSensorPosition.y)) *
        (this.d * this.p.width) +
      4 * (this.d * this.p.floor(this.leftSensorPosition.x));
    l = this.p.pixels[index];
    index =
      4 *
        (this.d * this.p.floor(this.frontSensorPosition.y)) *
        (this.d * this.p.width) +
      4 * (this.d * this.p.floor(this.frontSensorPosition.x));
    f = this.p.pixels[index];

    //conditions on which dir to take
    if (f > l && f > r) {
      this.heading += 0;
    } else if (f < l && f < r) {
      if (this.p.random(1) < 0.5) {
        this.heading += this.rotAngle;
      }
    } else if (l > r) {
      this.heading += -this.rotAngle;
    } else if (r > l) {
      this.heading += this.rotAngle;
    }
  }

  display() {
    this.p.noStroke(255);
    this.p.fill(255);
    this.p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
    // this.p.line(
    //   this.x,
    //   this.y,
    //   this.x + this.r * 3 * this.vx,
    //   this.y + this.r * 3 * this.vy
    // );
    // this.p.push();
    // this.p.stroke(250, 0, 0);
    // this.p.ellipse(
    //   this.rightSensorPosition.x,
    //   this.rightSensorPosition.y,
    //   this.r * 2,
    //   this.r * 2
    // );
    // this.p.ellipse(
    //   this.leftSensorPosition.x,
    //   this.leftSensorPosition.y,
    //   this.r * 2,
    //   this.r * 2
    // );
    // this.p.ellipse(
    //   this.frontSensorPosition.x,
    //   this.frontSensorPosition.y,
    //   this.r * 2,
    //   this.r * 2
    // );
    // this.p.pop();
  }
  getSensorPosition(sensor, angle) {
    sensor.x =
      (this.x + this.sensorDistance * this.p.cos(angle) + this.p.width) %
      this.p.width;
    sensor.y =
      (this.y + this.sensorDistance * this.p.sin(angle) + this.p.height) %
      this.p.height;
  }
}
