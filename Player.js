export default class Player {
  constructor(x, y, bulletController, health) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.bulletController = bulletController;
    this.width = 30;
    this.height = 30;
    this.speed = 4;

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  draw(ctx) {
    this.move();

    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // health ---
    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.fillText(
      this.health,
      this.x + this.width / 10,
      this.y + this.height / 1.5
    );

    this.shoot();
  }

  shoot() {
    if (this.shootPressed) {
      const speed = 5;
      const delay = 7;
      // random number from 0 to 5
      const damage = Math.floor(Math.random() * (6 - 0) + 0);
      const bulletX = this.x + this.width / 2;
      const bulletY = this.y;
      this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
    }
  }
  takeDamage(damage) {
    this.health -= damage;
  }

  move() {
    if (this.downPressed) {
      if (this.y < 530 - this.height) {
        this.y += this.speed;
      }
    }
    if (this.upPressed) {
      if (this.y > 0) {
        this.y -= this.speed;
      }
    }
    if (this.leftPressed) {
      if (this.x > 0) {
        this.x -= this.speed;
      }
    }

    if (this.rightPressed) {
      if (this.x < 450 - this.width) {
        this.x += this.speed;
      }
    }
  }

  keydown = (e) => {
    if (e.code === "ArrowUp") {
      this.upPressed = true;
    }
    if (e.code === "ArrowDown") {
      this.downPressed = true;
    }
    if (e.code === "ArrowLeft") {
      this.leftPressed = true;
    }
    if (e.code === "ArrowRight") {
      this.rightPressed = true;
    }
    if (e.code === "Space") {
      this.shootPressed = true;
    }
  };

  keyup = (e) => {
    if (e.code === "ArrowUp") {
      this.upPressed = false;
    }
    if (e.code === "ArrowDown") {
      this.downPressed = false;
    }
    if (e.code === "ArrowLeft") {
      this.leftPressed = false;
    }
    if (e.code === "ArrowRight") {
      this.rightPressed = false;
    }
    if (e.code === "Space") {
      this.shootPressed = false;
    }
  };
}
