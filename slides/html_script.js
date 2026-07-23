/* ── VOUCH PRESENTATION — JS ── */
(function () {
  const deck = document.getElementById('deck');
  const slides = deck.querySelectorAll('.slide');
  const total = slides.length;
  let cur = 0;

  const curEl = document.getElementById('cur');
  const totEl = document.getElementById('tot');
  const progEl = document.getElementById('progress');

  totEl.textContent = String(total).padStart(2, '0');

  function go(idx) {
    if (idx < 0 || idx >= total) return;
    slides[cur].classList.remove('active');
    cur = idx;
    slides[cur].classList.add('active');
    curEl.textContent = String(cur + 1).padStart(2, '0');
    progEl.style.width = ((cur + 1) / total * 100) + '%';
  }

  function scaleDeck() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const s = Math.min(vw / 1920, vh / 1080);
    deck.style.transform = `scale(${s})`;
  }

  // Init
  slides[0].classList.add('active');
  progEl.style.width = (1 / total * 100) + '%';
  scaleDeck();
  window.addEventListener('resize', scaleDeck);

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); go(cur + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(cur - 1); }
    else if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }
    else if (e.key === 'Home') { e.preventDefault(); go(0); }
    else if (e.key === 'End') { e.preventDefault(); go(total - 1); }
  });

  // Buttons
  document.getElementById('prev').addEventListener('click', function () { go(cur - 1); });
  document.getElementById('next').addEventListener('click', function () { go(cur + 1); });
  document.getElementById('fs-btn').addEventListener('click', function () {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  });

  // Touch support
  let tx = 0;
  deck.addEventListener('touchstart', function (e) { tx = e.changedTouches[0].screenX; }, { passive: true });
  deck.addEventListener('touchend', function (e) {
    const diff = e.changedTouches[0].screenX - tx;
    if (Math.abs(diff) > 60) { diff < 0 ? go(cur + 1) : go(cur - 1); }
  }, { passive: true });
})();
