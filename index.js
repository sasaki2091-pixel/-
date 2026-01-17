// ===== 設定 =====
const names = [
  "a氏","b氏","c氏","d氏","e氏",
  "f氏","g氏","h氏","i氏","j氏"
];

const list = document.getElementById("list");
const startBtn = document.getElementById("startBtn");
const overlay = document.getElementById("winnerOverlay");
const winnerName = document.getElementById("winnerName");

// ===== リスト生成（無限スクロール用）=====
for (let i = 0; i < 10; i++) {
  names.forEach(name => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = name;
    list.appendChild(div);
  });
}

let position = 0;
let speed = 300;
let timer = null;

// ===== スタート =====
startBtn.addEventListener("click", start);

function start() {
  clearInterval(timer);
  speed = 100;
  overlay.classList.add("hidden");

  const items = document.querySelectorAll(".item");
  const itemHeight = items[0].offsetHeight;

  // ★ ランダムな開始位置（0〜names.length-1）
  const randomIndex = Math.floor(Math.random() * names.length);
  position = -randomIndex * itemHeight;

  list.style.top = position + "px";

  timer = setInterval(() => {
    position -= speed;
    list.style.top = position + "px";

    if (Math.abs(position) > list.offsetHeight / 2) {
      position = 0;
    }

    if (speed > 10) {
      speed *= 0.985;   // かなり長く回る
    } else if (speed > 1) {
      speed *= 0.993;   // ストップ直前をじっくり
    } else {
      clearInterval(timer);
      decideWinner();
    }
  }, 500);
}



// ===== 当選判定 =====
function decideWinner() {
  const frame = document.querySelector(".frame");
  const frameRect = frame.getBoundingClientRect();
  const lineY = frameRect.top + frameRect.height / 2;

  const items = document.querySelectorAll(".item");

  let closest = null;
  let minDiff = Infinity;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const diff = Math.abs(center - lineY);

    if (diff < minDiff) {
      minDiff = diff;
      closest = item;
    }
  });

  showWinner(closest.textContent);
}

// ===== 当選演出 =====
function showWinner(name) {
  winnerName.textContent = name;
  overlay.classList.remove("hidden");
}
