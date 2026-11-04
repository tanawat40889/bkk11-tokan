'use strict';

// แบบติดต่องานทะเบียน 1050: ภาพฟอร์ม (assets/form1050.png) + ช่องกรอกวางทับตำแหน่งจุดไข่ปลา/กรอบตัวเลข/วงกลม
// ทุกช่องแก้ไขได้ ข้อมูลอยู่ในหน้าจอเท่านั้น (ไม่ส่งไปไหน ไม่เก็บ) ปิดหน้าต่างแล้วล้างหมด
// ตำแหน่งทั้งหมดเป็นหน่วย pt ของ PDF ต้นฉบับ (กว้าง 595.32 สูง 841.92) ถ้าเปลี่ยนฟอร์ม 1050 เวอร์ชันใหม่ ต้องวัดตำแหน่งใหม่
(() => {
  const SPEC = {"w":595.32,"h":841.92,"fields":[{"id":"name","x":121.2,"y":56.2,"w":149.7,"h":18.1},{"id":"khet","x":291.8,"y":56.2,"w":92.1,"h":18.1},{"id":"tambon","x":410.1,"y":56.2,"w":66.2,"h":18.1},{"id":"moo","x":490.5,"y":56.2,"w":69.1,"h":18.1},{"id":"subject","x":412.0,"y":85.1,"w":150.5,"h":15.4},{"id":"date","x":112.6,"y":88.9,"w":52.1,"h":10.9},{"id":"f6","x":276.4,"y":144.1,"w":179.9,"h":15.4},{"id":"f7","x":298.7,"y":206.7,"w":114.0,"h":15.4},{"id":"f8","x":222.6,"y":233.8,"w":24.8,"h":15.4},{"id":"f9","x":251.3,"y":233.8,"w":31.7,"h":15.4},{"id":"f10","x":316.3,"y":233.8,"w":18.0,"h":15.4},{"id":"f11","x":378.8,"y":233.8,"w":76.5,"h":15.4},{"id":"f12","x":121.7,"y":234.3,"w":59.2,"h":15.4},{"id":"f13","x":98.3,"y":306.7,"w":69.6,"h":15.4},{"id":"f14","x":260.0,"y":306.7,"w":78.5,"h":15.4},{"id":"f15","x":398.7,"y":306.7,"w":38.3,"h":15.4},{"id":"f16","x":452.5,"y":306.7,"w":57.0,"h":15.4},{"id":"f17","x":80.1,"y":325.6,"w":89.8,"h":15.4},{"id":"f18","x":248.8,"y":325.6,"w":85.2,"h":15.4},{"id":"f19","x":428.4,"y":325.6,"w":80.6,"h":15.4},{"id":"f20","x":79.5,"y":344.6,"w":89.8,"h":15.4},{"id":"f21","x":265.4,"y":344.6,"w":71.8,"h":15.4},{"id":"f22","x":429.2,"y":344.6,"w":80.6,"h":15.4},{"id":"f23","x":87.9,"y":363.6,"w":78.5,"h":15.4},{"id":"f24","x":269.9,"y":363.6,"w":67.2,"h":15.4},{"id":"f25","x":419.2,"y":363.6,"w":87.4,"h":15.4},{"id":"f26","x":302.8,"y":387.4,"w":34.1,"h":15.4},{"id":"f27","x":429.3,"y":387.4,"w":27.4,"h":15.4},{"id":"f28","x":460.5,"y":387.4,"w":27.4,"h":15.4},{"id":"f29","x":514.1,"y":387.4,"w":41.0,"h":15.4},{"id":"f30","x":267.8,"y":428.1,"w":68.4,"h":15.4},{"id":"f31","x":357.5,"y":428.1,"w":77.5,"h":15.4},{"id":"f32","x":449.7,"y":428.1,"w":66.1,"h":15.4},{"id":"f33","x":190.2,"y":475.2,"w":121.4,"h":15.4},{"id":"f34","x":188.2,"y":493.4,"w":123.8,"h":15.4},{"id":"f35","x":349.4,"y":519.0,"w":40.8,"h":13.1},{"id":"f36","x":425.8,"y":519.0,"w":48.3,"h":13.1},{"id":"f37","x":535.3,"y":540.5,"w":21.6,"h":15.4},{"id":"f38","x":389.2,"y":582.7,"w":43.3,"h":15.4},{"id":"f39","x":453.9,"y":582.7,"w":36.5,"h":15.4},{"id":"f40","x":502.1,"y":582.7,"w":38.8,"h":15.4},{"id":"f41","x":360.4,"y":643.3,"w":20.3,"h":15.4},{"id":"f42","x":390.5,"y":643.3,"w":18.0,"h":15.4},{"id":"f43","x":447.8,"y":643.3,"w":22.6,"h":15.4},{"id":"f44","x":416.7,"y":690.5,"w":131.7,"h":15.4},{"id":"f45","x":147.7,"y":737.0,"w":168.7,"h":14.2},{"id":"f46","x":441.0,"y":770.3,"w":97.9,"h":15.4},{"id":"f47","x":425.1,"y":791.0,"w":25.1,"h":15.4},{"id":"f48","x":454.0,"y":791.0,"w":29.6,"h":15.4},{"id":"f49","x":516.9,"y":791.0,"w":25.0,"h":15.4}],"boxes":[{"id":"idtop","y":33.3,"h":15.3,"w":13.7,"xs":[429.3,443.0,456.7,470.4,491.4,505.1,518.8,532.4]},{"id":"id2","y":210.6,"h":14.8,"w":13.7,"xs":[434.2,447.8,461.5,475.1,496.1,509.8,523.4,537.0]},{"id":"id4a","y":475.8,"h":14.0,"w":13.7,"xs":[430.9,444.6,458.2,471.9,491.4,505.1,518.7,532.3]},{"id":"id4b","y":494.0,"h":14.1,"w":13.7,"xs":[430.9,444.6,458.2,471.9,491.4,505.1,518.7,532.3]},{"id":"id6a","y":731.7,"h":18.7,"w":13.7,"xs":[416.1,429.7,443.4,457.0,478.0,491.7,505.3,518.9]},{"id":"id6b","y":768.9,"h":18.7,"w":13.7,"xs":[154.2,167.9,181.5,195.2,216.2,229.8,243.5,257.1]}],"circles":[{"id":"c0","x":34.0,"y":114.3,"s":12.2},{"id":"c1","x":34.0,"y":179.0,"s":12.2},{"id":"c2","x":73.0,"y":389.5,"s":12.2},{"id":"c3","x":164.9,"y":388.9,"s":12.2},{"id":"c4","x":189.7,"y":411.5,"s":12.2},{"id":"c5","x":302.9,"y":411.6,"s":12.2},{"id":"c6","x":407.3,"y":411.9,"s":12.2},{"id":"c7","x":43.1,"y":430.8,"s":12.2},{"id":"c8","x":144.4,"y":431.1,"s":12.2},{"id":"c9","x":242.1,"y":459.0,"s":12.2},{"id":"c10","x":331.3,"y":459.4,"s":12.2},{"id":"c11","x":456.8,"y":459.0,"s":12.2},{"id":"c12","x":457.2,"y":543.8,"s":12.2},{"id":"c13","x":497.2,"y":543.7,"s":12.2},{"id":"c14","x":372.2,"y":566.7,"s":12.2},{"id":"c15","x":419.0,"y":566.7,"s":12.2},{"id":"c16","x":457.2,"y":567.0,"s":12.2},{"id":"c17","x":497.2,"y":566.8,"s":12.2},{"id":"c18","x":71.8,"y":585.2,"s":12.2},{"id":"c19","x":183.8,"y":604.2,"s":12.2},{"id":"c20","x":293.0,"y":604.2,"s":12.2},{"id":"c21","x":419.8,"y":604.9,"s":12.2}]};

  const TEXT_PT = 10.5;   // ขนาดตัวอักษรในช่องข้อความ (pt)
  const DIGIT_PT = 11.5;  // ขนาดตัวเลขในกรอบ
  const INK = '#0a2a6e';
  const pctX = v => `${(v / SPEC.w * 100).toFixed(3)}%`;
  const pctY = v => `${(v / SPEC.h * 100).toFixed(3)}%`;
  const sizeCss = pt => `calc(${pt} * var(--pt))`;

  let dlg = null, page = null, current = null;

  function build() {
    dlg = document.getElementById('formModal');
    page = dlg.querySelector('#form1050Page');

    // เบราว์เซอร์เก่าที่ไม่รู้จัก cqw: คำนวณ 1pt เป็น px เอง
    if (!(window.CSS && CSS.supports('width', '1cqw'))) {
      new ResizeObserver(() => page.style.setProperty('--pt', `${page.clientWidth / SPEC.w}px`)).observe(page);
    }

    for (const f of SPEC.fields) {
      const i = document.createElement('input');
      i.type = 'text';
      i.className = 'f1050-t';
      i.dataset.id = f.id;
      i.autocomplete = 'off';
      i.spellcheck = false;
      i.setAttribute('aria-label', f.id === 'name' ? 'ชื่อ-สกุล' : 'ช่องกรอก');
      Object.assign(i.style, { left: pctX(f.x), top: pctY(f.y - 1), width: pctX(f.w), height: pctY(f.h + 1) });
      page.append(i);
    }
    for (const b of SPEC.boxes) {
      b.xs.forEach((x, k) => {
        const i = document.createElement('input');
        i.type = 'text';
        i.inputMode = 'numeric';
        i.maxLength = 1;
        i.className = 'f1050-d';
        i.dataset.row = b.id;
        i.dataset.k = k;
        i.autocomplete = 'off';
        i.setAttribute('aria-label', `เลขหมายประจำตัว หลักที่ ${k + 1}`);
        Object.assign(i.style, { left: pctX(x), top: pctY(b.y), width: pctX(b.w), height: pctY(b.h) });
        page.append(i);
      });
    }
    for (const c of SPEC.circles) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'f1050-c';
      btn.dataset.id = c.id;
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'ติ๊กเลือก');
      Object.assign(btn.style, { left: pctX(c.x), top: pctY(c.y), width: pctX(c.s), height: pctY(c.s) });
      btn.addEventListener('click', () => btn.setAttribute('aria-pressed', String(btn.getAttribute('aria-pressed') !== 'true')));
      page.append(btn);
    }

    page.addEventListener('input', e => {
      const t = e.target;
      if (t.classList.contains('f1050-t')) { fit(t); return; }
      if (!t.classList.contains('f1050-d')) return;
      t.value = t.value.replace(/\D/g, '').slice(-1);
      if (t.value) rowInputs(t)[Number(t.dataset.k) + 1]?.focus();
    });
    page.addEventListener('keydown', e => {
      const t = e.target;
      if (!t.classList.contains('f1050-d')) return;
      const row = rowInputs(t), k = Number(t.dataset.k);
      if (e.key === 'Backspace' && !t.value) { row[k - 1]?.focus(); }
      else if (e.key === 'ArrowLeft') { row[k - 1]?.focus(); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { row[k + 1]?.focus(); e.preventDefault(); }
    });
    page.addEventListener('paste', e => {
      const t = e.target;
      if (!t.classList.contains('f1050-d')) return;
      const digits = (e.clipboardData?.getData('text') || '').replace(/\D/g, '');
      if (!digits) return;
      e.preventDefault();
      const row = rowInputs(t);
      let k = Number(t.dataset.k);
      for (const d of digits) { if (!row[k]) break; row[k++].value = d; }
      row[Math.min(k, row.length - 1)].focus();
    });

    dlg.querySelector('#form1050Refill').addEventListener('click', () => { if (current) fill(current); });
    dlg.querySelector('#form1050Clear').addEventListener('click', clearAll);
    dlg.querySelector('#form1050Png').addEventListener('click', savePng);
    dlg.querySelector('#form1050Print').addEventListener('click', printForm);
    const reset = () => { clearAll(); current = null; };
    dlg.querySelector('#form1050Close').addEventListener('click', () => { dlg.close(); reset(); });
    dlg.addEventListener('close', reset); // ปิดด้วย Esc
  }

  const rowInputs = t => [...page.querySelectorAll(`.f1050-d[data-row="${t.dataset.row}"]`)];
  const textField = id => page.querySelector(`.f1050-t[data-id="${id}"]`);

  // ย่อตัวอักษรให้พอดีช่อง (ชื่อยาว)
  function fit(i) {
    let s = TEXT_PT;
    i.style.fontSize = sizeCss(s);
    while (i.scrollWidth > i.clientWidth && s > 6) { s -= 0.5; i.style.fontSize = sizeCss(s); }
  }
  const fitAll = () => page.querySelectorAll('.f1050-t').forEach(i => { if (i.value) fit(i); });

  function clearAll() {
    if (!page) return;
    page.querySelectorAll('.f1050-t').forEach(i => { i.value = ''; i.style.fontSize = ''; });
    page.querySelectorAll('.f1050-d').forEach(i => { i.value = ''; });
    page.querySelectorAll('.f1050-c').forEach(b => b.setAttribute('aria-pressed', 'false'));
  }

  function setText(id, v) {
    const i = textField(id);
    if (i) i.value = v || '';
  }

  function setDigits(rowId, str) {
    const digits = String(str || '').replace(/\D/g, '').slice(0, 8);
    page.querySelectorAll(`.f1050-d[data-row="${rowId}"]`).forEach((i, k) => { i.value = digits[k] || ''; });
  }

  const thaiToday = () => { const d = new Date(); return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear() + 543}`; };

  // กรอกส่วนบนสุดจากข้อมูลสมาชิก: เลขหมายประจำตัว, ชื่อ-สกุล, เขต, ตำบล, หมู่, วันที่เขียนเอกสาร
  function fill(d) {
    clearAll();
    setDigits('idtop', d.id);
    setText('name', d.name);
    setText('khet', d.khet);
    setText('tambon', d.tambon);
    setText('moo', d.moo);
    setText('date', d.date || thaiToday());
    requestAnimationFrame(fitAll);
  }

  function printForm() {
    document.body.classList.add('printing-1050');
    const done = () => { document.body.classList.remove('printing-1050'); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    window.print();
  }

  async function savePng() {
    const img = page.querySelector('img');
    // รอรูปกับฟอนต์ แต่ไม่รอนานเกิน 2 วินาที (ถ้าฟอนต์ไม่มา ใช้ฟอนต์สำรอง)
    const wait = p => Promise.race([p.catch(() => {}), new Promise(r => setTimeout(r, 2000))]);
    await wait(img.decode());
    await wait(document.fonts.load(`${TEXT_PT}px Prompt`, 'ก'));
    const W = img.naturalWidth, H = img.naturalHeight, kpt = W / SPEC.w, kpx = W / page.clientWidth;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');
    ctx.drawImage(img, 0, 0, W, H);
    ctx.fillStyle = INK;
    ctx.strokeStyle = INK;
    ctx.textBaseline = 'alphabetic';

    for (const f of SPEC.fields) {
      const i = textField(f.id);
      if (!i || !i.value) continue;
      ctx.font = `${parseFloat(getComputedStyle(i).fontSize) * kpx}px Prompt, sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(i.value, (f.x + 1) * kpt, (f.y + f.h - 4.8) * kpt);
    }
    ctx.textAlign = 'center';
    ctx.font = `500 ${DIGIT_PT * kpt}px Prompt, sans-serif`;
    for (const b of SPEC.boxes) {
      page.querySelectorAll(`.f1050-d[data-row="${b.id}"]`).forEach((i, k) => {
        if (i.value) ctx.fillText(i.value, (b.xs[k] + b.w / 2) * kpt, (b.y + b.h - 3) * kpt);
      });
    }
    ctx.lineWidth = 1.7 * kpt;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const c of SPEC.circles) {
      if (page.querySelector(`.f1050-c[data-id="${c.id}"]`)?.getAttribute('aria-pressed') !== 'true') continue;
      ctx.beginPath();
      ctx.moveTo((c.x + c.s * 0.2) * kpt, (c.y + c.s * 0.55) * kpt);
      ctx.lineTo((c.x + c.s * 0.43) * kpt, (c.y + c.s * 0.78) * kpt);
      ctx.lineTo((c.x + c.s * 0.82) * kpt, (c.y + c.s * 0.2) * kpt);
      ctx.stroke();
    }
    cv.toBlob(blob => {
      if (!blob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `1050-${current?.id || 'form'}.png`;
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 10000);
    }, 'image/png');
  }

  // d = { id (เลขหมายประจำตัว 8 หลัก), name, khet, tambon, moo, date? }
  window.openForm1050 = function (d) {
    if (!dlg) build();
    current = d;
    fill(d);
    if (!dlg.open) dlg.showModal();
    requestAnimationFrame(fitAll);
  };
})();
