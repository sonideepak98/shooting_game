import Player from "./Player.js";
import Enemy from "./Enemy.js";
import BulletController from "./BulletController.js";
import EnemyBulletController from "./EnemyBulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 450;
canvas.height = 530;

const bulletController = new BulletController(canvas);
const enemyBulletController = new EnemyBulletController(canvas);

const player = new Player(
  canvas.width / 2.2,
  canvas.height / 1.3,
  bulletController,
  100
);

const enemy = new Enemy(50, 20, enemyBulletController, 100);

var pScore = 0;
var eScore = 0;
var gameRound = 0;
alert(` Are you Ready!! 
        press ok - to start the Game`);
function gameLoop() {
  setCommonStyle();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bulletController.draw(ctx);
  enemyBulletController.draw(ctx);
  player.draw(ctx);

  enemy.draw(ctx);

  // player 1 winning condition ---
  if (bulletController.collideWith(enemy)) {
    if (enemy.health <= 0) {
      pScore += 1;
      gameRound += 1;

      alert(`
      Game ${gameRound}
      Player1: WON ${pScore}
      Player2: ${eScore}
      `);

      if (gameRound >= 3 && eScore === 0) {
        if (
          confirm(`
        Game ${gameRound}
        Player1: WON ${pScore}
        Player2: WON ${eScore}
        ------------------
        Player1 WON!!
        `) == true
        ) {
          document.location.reload();
        }
      }

      if (gameRound === 4 && pScore === 3 && eScore <= 1) {
        if (
          confirm(`
        Game ${gameRound}
        Player1: WON ${pScore}
        Player2: WON ${eScore}
        -------------------
        Player1 WON !
        `) == true
        ) {
          document.location.reload();
        }
      }
      if (pScore === 5) {
        if (
          confirm(`
        Game ${gameRound}
        Player1: WON ${pScore}
        Player2: WON ${eScore}
        ------------------
        Player1 WON!!
        `) == true
        ) {
          document.location.reload();
        }
      }

      enemy.health = 100;
    }
  }

  // player2 winning condition
  if (enemyBulletController.collideWith(player)) {
    if (player.health <= 0) {
      eScore += 1;
      gameRound += 1;

      alert(`
     Game ${gameRound}
     Player1: WON ${pScore}
     Player2: WON ${eScore}
     `);

      // Game winning condition ---

      if (gameRound >= 3 && pScore === 0) {
        if (
          confirm(`
        Game ${gameRound}
        Player1: ${pScore}
        Player2: ${eScore}
        ------------------
        Player2 WON!!
        `) == true
        ) {
          document.location.reload();
        }
      }
      if (gameRound === 4 && pScore === 1 && eScore === 3) {
        if (
          confirm(`
        Game ${gameRound}
        Player1: ${pScore}
        Player2: ${eScore}
        ------------------
        Player2 WON!!
        `) == true
        ) {
          document.location.reload();
        }
      }

      if (eScore === 5) {
        if (
          confirm(`
        Game ${gameRound}
        Player1: ${pScore}
        Player2: ${eScore}
        ------------------
        Player2 WON!!
        `) == true
        ) {
          document.location.reload();
        }
      }

      player.health = 100;
    }
  }
}

function setCommonStyle() {
  ctx.shadowColor = "#d53";
  ctx.shadowBlur = 10;
  ctx.lineJoin = "bevel";
  ctx.lineWidth = 5;
}

setInterval(gameLoop, 1000 / 60);
