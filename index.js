alert("JSチェック");

const names = [
  "a氏","b氏","c氏","d氏","e氏",
  "f氏","g氏","h氏","i氏","j氏"
];

const list = document.getElementById("list");

// 無限スクロール用生成
for (let i = 0; i < 10; i++) {
  names.forEach(name => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = name;
    list.appendChild(div);
  });
}

let position = 0;
let speed = 30;
let timer;

function start() {
  clearInterval(timer);
  speed = 30;

  document.getElementById("winnerOverlay").classList.add("hidden");

  timer = setInterval(() => {
    position -= speed;
    list.style.top = position + "px";

    if (Math.abs(position) > list.offsetHeight / 2) {
      position = 0;
    }

    speed *= 0.97;

    if (speed < 0.5) {
      clearInterval(timer);
      alignCenter();
    }
  }, 16);
}

function alignCenter() {
  const frame = document.querySelector(".frame");
  const frameRect = frame.getBoundingClientRect();
  const frameCenter = frameRect.top + frameRect.height / 2;

  const items = document.querySelectorAll(".item");

  let closest = null;
  let minDiff = Infinity;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
