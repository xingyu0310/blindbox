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

  // 维护每轮的剩余池：每轮包含 6 张，不重复；用尽后重置新一轮
  let remainingPool = [];

  function shuffle(array) {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function ensurePool() {
    if (!Array.isArray(remainingPool) || remainingPool.length === 0) {
      remainingPool = shuffle(images);
    }
  }

  function drawFromPool() {
    ensurePool();
    return remainingPool.pop();
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
    const next = drawFromPool();
    displayImageEl.src = next;
    toRevealState();
  });

  backBtn.addEventListener('click', function () {
    toIdleState();
  });

  // 提示：目前点击 back 不会“归还”本次抽到的图片，
  // 即每点击一次 unbox 都会消耗一张；当 6 张用尽后自动进入新一轮。
})();


