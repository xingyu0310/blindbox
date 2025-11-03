(function () {
  const bgSrc = './bg.png'; // 初始展示的 bg 图片（已改用 bg.png）
  const images = [
    './image1.png',
    './image2.png',
    './image3.png',
    './image4.png',
    './image5.png',
    './image6.png',
  ];

  const displayImageEl = document.getElementById('displayImage');
  const unboxBtn = document.getElementById('unboxBtn');
  const postActions = document.getElementById('postActions');
  const backBtn = document.getElementById('backBtn');

  function pickRandomImage(excludeSrc) {
    if (!Array.isArray(images) || images.length === 0) return excludeSrc || bgSrc;
    let candidate = images[Math.floor(Math.random() * images.length)];
    // 避免与当前相同，重掷一次（简单去重，防止连续相同体验差）
    if (excludeSrc && candidate === excludeSrc && images.length > 1) {
      candidate = images[Math.floor(Math.random() * images.length)];
    }
    return candidate;
  }

  function toRevealState() {
    unboxBtn.hidden = true;
    postActions.hidden = false;
  }

  function toIdleState() {
    displayImageEl.src = bgSrc;
    unboxBtn.hidden = false;
    postActions.hidden = true;
  }

  // 初始状态
  displayImageEl.src = bgSrc;
  toIdleState();

  unboxBtn.addEventListener('click', function () {
    const next = pickRandomImage(displayImageEl.src);
    displayImageEl.src = next;
    toRevealState();
  });

  backBtn.addEventListener('click', function () {
    toIdleState();
  });

  // 仅保留 back 行为
})();


