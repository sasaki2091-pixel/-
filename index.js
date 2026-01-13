function alignCenter() {
  const frame = document.querySelector(".frame");
  const frameRect = frame.getBoundingClientRect();
  const frameCenter = frameRect.top + frameRect.height / 2;

  const items = document.querySelectorAll(".item");

  let closest = null;
  let minDiff = Infinity;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.top + rect.height / 2;
    const diff = Math.abs(itemCenter - frameCenter);

    if (diff < minDiff) {
      minDiff = diff;
      closest = item;
    }
  });

  // 当選表示
  const overlay = document.getElementById("winnerOverlay");
  const winnerName = document.getElementById("winnerName");

  winnerName.textContent = closest.textContent;
  overlay.classList.remove("hidden");
}
