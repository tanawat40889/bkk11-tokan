/* BKK11 loader: BKKLoader.show(ข้อความ) / BKKLoader.hide() */
(function () {
  var el = document.getElementById('bkkLoader');
  if (!el) { window.BKKLoader = { show: function () {}, hide: function () {} }; return; }
  var text = el.querySelector('.bkk-loader__text');
  var base = text.textContent;
  var MIN_MS = 450;            // อย่าให้แวบเร็วจนดูกระพริบ
  var shownAt = Date.now(), slowTimer = 0, hideTimer = 0;

  function arm() {
    clearTimeout(slowTimer);
    slowTimer = setTimeout(function () { text.textContent = 'ใช้เวลานานกว่าปกติ กรุณารอสักครู่…'; }, 8000);
    el.classList.toggle('alt');  // สลับ keyframes เพื่อให้นับ 20 วินาทีของลิงก์ลองใหม่ใหม่
  }

  window.BKKLoader = {
    show: function (msg) {
      clearTimeout(hideTimer);
      text.textContent = msg || base;
      shownAt = Date.now();
      el.classList.remove('is-hidden');
      el.setAttribute('aria-busy', 'true');
      arm();
    },
    hide: function () {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        clearTimeout(slowTimer);
        el.classList.add('is-hidden');
        el.setAttribute('aria-busy', 'false');
      }, Math.max(0, MIN_MS - (Date.now() - shownAt)));
    }
  };
  el.setAttribute('aria-busy', 'true');
  arm();
})();
