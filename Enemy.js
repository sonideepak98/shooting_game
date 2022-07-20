export default class Enemy {
  constructor(x, y, enemyBulletController, health) {
    this.x = x;
    this.y = y;

    this.health = health;
    this.enemyBulletController = enemyBulletController;
    this.width = 30;
    this.height = 30;
    this.speed = 4;

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  draw(ctx) {
    this.move();
    ctx.fillStyle = this.color;

    ctx.fillRect(this.x, this.y, this.width, this.height);
    //Draw Text
    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.fillText(
      this.health,
      this.x + this.width / 11,
      this.y + this.height / 1.5
    );
    this.shoot();
  }

  shoot() {
    if (this.shootPressed) {
      const speed = 5;
      const delay = 7;
      //random number from zero to 5
      const damage = Math.floor(Math.random() * (6 - 0) + 0);
      const bulletX = this.x + this.width / 2;
      const bulletY = this.y;
      this.enemyBulletController.shoot(bulletX, bulletY, speed, damage, delay);
    }
  }

  takeDamage(damage) {
    this.health -= damage;
  }

  // enemy move ---
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
    if (e.code === "KeyW") {
      this.upPressed = true;
    }
    if (e.code === "KeyX") {
      this.downPressed = true;
    }
    if (e.code === "KeyA") {
      this.leftPressed = true;
    }
    if (e.code === "KeyD") {
      this.rightPressed = true;
    }
    if (e.code === "KeyS") {
      this.shootPressed = true;
    }
  };

  keyup = (e) => {
    if (e.code === "KeyW") {
      this.upPressed = false;
    }
    if (e.code === "KeyX") {
      this.downPressed = false;
    }
    if (e.code === "KeyA") {
      this.leftPressed = false;
    }
    if (e.code === "KeyD") {
      this.rightPressed = false;
    }
    if (e.code === "KeyS") {
      this.shootPressed = false;
    }
  };
}
