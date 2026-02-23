const surpriseText = document.getElementById("surprise");
const celebrateBtn = document.getElementById("celebrate-btn");
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

const wishes = [
  "May this year be your best chapter yet! ✨",
  "Cake today, sparkle forever. 🎂",
  "You deserve all the good things coming your way! 💖",
  "Another year older, brighter, and bolder! 🌟"
];

let confetti = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createConfetti(amount = 180) {
  const colors = ["#ff4fa3", "#ffd166", "#06d6a0", "#4cc9f0", "#8e7dff"];
  confetti = Array.from({ length: amount }, () => ({
    x: random(0, canvas.width),
    y: random(-canvas.height, 0),
    size: random(4, 10),
    speedY: random(1.4, 4),
    speedX: random(-1.5, 1.5),
    rotation: random(0, 360),
    rotationSpeed: random(-6, 6),
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((piece) => {
    piece.x += piece.speedX;
    piece.y += piece.speedY;
    piece.rotation += piece.rotationSpeed;

    if (piece.y > canvas.height + piece.size) {
      piece.y = -piece.size;
      piece.x = random(0, canvas.width);
    }

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate((piece.rotation * Math.PI) / 180);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
    ctx.restore();
  });

  requestAnimationFrame(drawConfetti);
}

function celebrate() {
  const pick = wishes[Math.floor(Math.random() * wishes.length)];
  surpriseText.textContent = pick;
  createConfetti();
}

window.addEventListener("resize", resizeCanvas);
celebrateBtn.addEventListener("click", celebrate);

resizeCanvas();
createConfetti();
drawConfetti();
