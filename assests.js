const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("finalScore");
const gameOverScreen = document.getElementById("gameOverScreen");

const TILE = 20, GRID = 25, SPEED = 120;
let snake, food, direction, nextDirection, score, loop;

function startGame() {
  snake = [{x:5,y:5},{x:4,y:5},{x:3,y:5}];
  direction = nextDirection = "RIGHT";
  score = 0;
  scoreEl.textContent = score;
  gameOverScreen.classList.remove("show");
  spawnFood();
  clearInterval(loop);
  loop = setInterval(update, SPEED);
}

function spawnFood() {
  food = { x: Math.floor(Math.random()*GRID), y: Math.floor(Math.random()*GRID) };
}

function update() {
  direction = nextDirection;
  const head = {...snake[0]};
  if(direction==="UP") head.y--;
  if(direction==="DOWN") head.y++;
  if(direction==="LEFT") head.x--;
  if(direction==="RIGHT") head.x++;

  if(head.x<0||head.y<0||head.x>=GRID||head.y>=GRID||
     snake.some(s=>s.x===head.x&&s.y===head.y)) {
    clearInterval(loop);
    finalScoreEl.textContent = score;
    gameOverScreen.classList.add("show");
    return;
  }

  snake.unshift(head);

  if(head.x===food.x && head.y===food.y) {
    score+=10;
    scoreEl.textContent = score;
    spawnFood();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.fillStyle="#9bbc0f";
  ctx.fillRect(0,0,500,500);
  ctx.fillStyle="#306230";
  ctx.fillRect(food.x*TILE,food.y*TILE,TILE,TILE);
  snake.forEach((s,i)=>{
    ctx.fillStyle=i===0?"#0f380f":"#306230";
    ctx.fillRect(s.x*TILE,s.y*TILE,TILE,TILE);
  });
}

function restartGame() {
  startGame();
}

document.addEventListener("keydown", e=>{
  if(e.key==="ArrowUp"||e.key==="w") direction!=="DOWN"&&(nextDirection="UP");
  if(e.key==="ArrowDown"||e.key==="s") direction!=="UP"&&(nextDirection="DOWN");
  if(e.key==="ArrowLeft"||e.key==="a") direction!=="RIGHT"&&(nextDirection="LEFT");
  if(e.key==="ArrowRight"||e.key==="d") direction!=="LEFT"&&(nextDirection="RIGHT");
});

btnUp.onclick=()=>direction!=="DOWN"&&(nextDirection="UP");
btnDown.onclick=()=>direction!=="UP"&&(nextDirection="DOWN");
btnLeft.onclick=()=>direction!=="RIGHT"&&(nextDirection="LEFT");
btnRight.onclick=()=>direction!=="LEFT"&&(nextDirection="RIGHT");

startGame();
