"use strict";

// แบบติดต่องานทะเบียน 1050: ภาพฟอร์ม (assets/form1050.png) + ช่องกรอกวางทับตำแหน่งจุดไข่ปลา/กรอบตัวเลข/วงกลม
// ใช้ร่วมกันทั้งหน้าโทกัง (สมาชิกกรอกแล้วส่งไปหลังบ้าน) และหน้าแอดมิน (ตรวจ แก้ไข อนุมัติ) รูปแบบ CSS อยู่ที่ form1050.css
// ไฟล์นี้ไม่ยุ่งกับฐานข้อมูล: หน้าที่เรียกส่งปุ่ม (actions) มาเอง ข้อมูลในหน้าต่างล้างทุกครั้งที่ปิด
// ตำแหน่งทั้งหมดเป็นหน่วย pt ของ PDF ต้นฉบับ (กว้าง 595.32 สูง 841.92) ถ้าเปลี่ยนฟอร์ม 1050 เวอร์ชันใหม่ ต้องวัดตำแหน่งใหม่
(() => {
  const SPEC = {"w":595.32,"h":841.92,"fields":[{"id":"name","x":121.2,"y":56.2,"w":149.7,"h":18.1},{"id":"khet","x":291.8,"y":56.2,"w":92.1,"h":18.1},{"id":"tambon","x":410.1,"y":56.2,"w":66.2,"h":18.1},{"id":"moo","x":490.5,"y":56.2,"w":69.1,"h":18.1},{"id":"subject","x":412.0,"y":85.1,"w":150.5,"h":15.4},{"id":"date","x":112.6,"y":88.9,"w":52.1,"h":10.9},{"id":"f6","x":276.4,"y":144.1,"w":179.9,"h":15.4},{"id":"f7","x":298.7,"y":206.7,"w":114.0,"h":15.4},{"id":"f8","x":222.6,"y":233.8,"w":24.8,"h":15.4},{"id":"f9","x":251.3,"y":233.8,"w":31.7,"h":15.4},{"id":"f10","x":316.3,"y":233.8,"w":18.0,"h":15.4},{"id":"f11","x":378.8,"y":233.8,"w":76.5,"h":15.4},{"id":"f12","x":121.7,"y":234.3,"w":59.2,"h":15.4},{"id":"f13","x":98.3,"y":306.7,"w":69.6,"h":15.4},{"id":"f14","x":260.0,"y":306.7,"w":78.5,"h":15.4},{"id":"f15","x":398.7,"y":306.7,"w":38.3,"h":15.4},{"id":"f16","x":452.5,"y":306.7,"w":57.0,"h":15.4},{"id":"f17","x":80.1,"y":325.6,"w":89.8,"h":15.4},{"id":"f18","x":248.8,"y":325.6,"w":85.2,"h":15.4},{"id":"f19","x":428.4,"y":325.6,"w":80.6,"h":15.4},{"id":"f20","x":79.5,"y":344.6,"w":89.8,"h":15.4},{"id":"f21","x":265.4,"y":344.6,"w":71.8,"h":15.4},{"id":"f22","x":429.2,"y":344.6,"w":80.6,"h":15.4},{"id":"f23","x":87.9,"y":363.6,"w":78.5,"h":15.4},{"id":"f24","x":269.9,"y":363.6,"w":67.2,"h":15.4},{"id":"f25","x":419.2,"y":363.6,"w":87.4,"h":15.4},{"id":"f26","x":302.8,"y":387.4,"w":34.1,"h":15.4},{"id":"f27","x":429.3,"y":387.4,"w":27.4,"h":15.4},{"id":"f28","x":460.5,"y":387.4,"w":27.4,"h":15.4},{"id":"f29","x":514.1,"y":387.4,"w":41.0,"h":15.4},{"id":"f30","x":267.8,"y":428.1,"w":68.4,"h":15.4},{"id":"f31","x":357.5,"y":428.1,"w":77.5,"h":15.4},{"id":"f32","x":449.7,"y":428.1,"w":66.1,"h":15.4},{"id":"f33","x":190.2,"y":475.2,"w":121.4,"h":15.4},{"id":"f34","x":188.2,"y":493.4,"w":123.8,"h":15.4},{"id":"f35","x":349.4,"y":519.0,"w":40.8,"h":13.1},{"id":"f36","x":425.8,"y":519.0,"w":48.3,"h":13.1},{"id":"f37","x":535.3,"y":540.5,"w":21.6,"h":15.4},{"id":"f38","x":389.2,"y":582.7,"w":43.3,"h":15.4},{"id":"f39","x":453.9,"y":582.7,"w":36.5,"h":15.4},{"id":"f40","x":502.1,"y":582.7,"w":38.8,"h":15.4},{"id":"f41","x":360.4,"y":643.3,"w":20.3,"h":15.4},{"id":"f42","x":390.5,"y":643.3,"w":18.0,"h":15.4},{"id":"f43","x":447.8,"y":643.3,"w":22.6,"h":15.4},{"id":"f44","x":416.7,"y":690.5,"w":131.7,"h":15.4},{"id":"f45","x":147.7,"y":737.0,"w":168.7,"h":14.2},{"id":"f46","x":441.0,"y":770.3,"w":97.9,"h":15.4},{"id":"f47","x":425.1,"y":791.0,"w":25.1,"h":15.4},{"id":"f48","x":454.0,"y":791.0,"w":29.6,"h":15.4},{"id":"f49","x":516.9,"y":791.0,"w":25.0,"h":15.4}],"boxes":[{"id":"idtop","y":33.3,"h":15.3,"w":13.7,"xs":[429.3,443.0,456.7,470.4,491.4,505.1,518.8,532.4]},{"id":"id2","y":210.6,"h":14.8,"w":13.7,"xs":[434.2,447.8,461.5,475.1,496.1,509.8,523.4,537.0]},{"id":"id4a","y":475.8,"h":14.0,"w":13.7,"xs":[430.9,444.6,458.2,471.9,491.4,505.1,518.7,532.3]},{"id":"id4b","y":494.0,"h":14.1,"w":13.7,"xs":[430.9,444.6,458.2,471.9,491.4,505.1,518.7,532.3]},{"id":"id6a","y":731.7,"h":18.7,"w":13.7,"xs":[416.1,429.7,443.4,457.0,478.0,491.7,505.3,518.9]},{"id":"id6b","y":768.9,"h":18.7,"w":13.7,"xs":[154.2,167.9,181.5,195.2,216.2,229.8,243.5,257.1]}],"circles":[{"id":"c0","x":34.0,"y":114.3,"s":12.2},{"id":"c1","x":34.0,"y":179.0,"s":12.2},{"id":"c2","x":73.0,"y":389.5,"s":12.2},{"id":"c3","x":164.9,"y":388.9,"s":12.2},{"id":"c4","x":189.7,"y":411.5,"s":12.2},{"id":"c5","x":302.9,"y":411.6,"s":12.2},{"id":"c6","x":407.3,"y":411.9,"s":12.2},{"id":"c7","x":43.1,"y":430.8,"s":12.2},{"id":"c8","x":144.4,"y":431.1,"s":12.2},{"id":"c9","x":242.1,"y":459.0,"s":12.2},{"id":"c10","x":331.3,"y":459.4,"s":12.2},{"id":"c11","x":456.8,"y":459.0,"s":12.2},{"id":"c12","x":457.2,"y":543.8,"s":12.2},{"id":"c13","x":497.2,"y":543.7,"s":12.2},{"id":"c14","x":372.2,"y":566.7,"s":12.2},{"id":"c15","x":419.0,"y":566.7,"s":12.2},{"id":"c16","x":457.2,"y":567.0,"s":12.2},{"id":"c17","x":497.2,"y":566.8,"s":12.2},{"id":"c18","x":71.8,"y":585.2,"s":12.2},{"id":"c19","x":183.8,"y":604.2,"s":12.2},{"id":"c20","x":293.0,"y":604.2,"s":12.2},{"id":"c21","x":419.8,"y":604.9,"s":12.2}]};

  const TEXT_PT = 10.5;   // ขนาดตัวอักษรในช่องข้อความ (pt)
  const DIGIT_PT = 11.5;  // ขนาดตัวเลขในกรอบ
  const INK = '#0a2a6e';
  const DESIGN_W = 920;   // ความกว้างหน้ากระดาษ (px) ที่ตัวอักษรในช่องได้ >= 16px (iOS ไม่ซูมตอนแตะ) ย่อให้พอดีจอด้วย --s
  const COARSE = window.matchMedia('(pointer: coarse)').matches; // จอสัมผัส: ไม่ย่อตัวอักษรตามความยาว (ย่อแล้วต่ำกว่า 16px จะทำให้ iOS ซูม)
  const pctX = v => `${(v / SPEC.w * 100).toFixed(3)}%`;
  const pctY = v => `${(v / SPEC.h * 100).toFixed(3)}%`;
  const sizeCss = pt => `calc(${pt} * var(--pt))`;

  let dlg = null, page = null, fitBox = null, scroller = null, ro = null;
  let current = null;     // { d, opts }
  let busy = false;

  function build() {
    dlg = document.createElement('dialog');
    dlg.id = 'formModal';
    dlg.innerHTML = `
      <div class="form-bar">
        <div class="form-title" id="f1050Title"></div>
        <p class="form-meta" id="f1050Meta" hidden></p>
        <div class="form-actions" id="f1050Actions"></div>
        <p class="form-hint" id="f1050Hint"></p>
        <p class="form-status" id="f1050Status" role="status" hidden></p>
      </div>
      <div class="form-scroll">
        <div class="form-fit"><div class="form-page" id="form1050Page"><img src="assets/form1050.png" alt="แบบติดต่องานทะเบียน 1050" draggable="false"></div></div>
      </div>`;
    document.body.append(dlg);
    page = dlg.querySelector('#form1050Page');
    fitBox = dlg.querySelector('.form-fit');
    scroller = dlg.querySelector('.form-scroll');

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

    // ย่อหน้ากระดาษให้พอดีความกว้างจอ (ไม่ขยายเกินขนาดออกแบบ)
    ro = new ResizeObserver(() => {
      const s = Math.max(0.2, Math.min(1, (scroller.clientWidth - 24) / DESIGN_W));
      fitBox.style.setProperty('--s', s.toFixed(4));
    });
    ro.observe(scroller);

    const reset = () => { clearAll(); current = null; };
    dlg.addEventListener('close', reset); // ปิดด้วย Esc หรือปุ่มปิด
  }

  const rowInputs = t => [...page.querySelectorAll(`.f1050-d[data-row="${t.dataset.row}"]`)];
  const textField = id => page.querySelector(`.f1050-t[data-id="${id}"]`);

  // ย่อตัวอักษรให้พอดีช่อง (ชื่อยาว) เฉพาะจอที่ไม่ใช่ระบบสัมผัส
  function fit(i) {
    if (COARSE) return;
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

  const thaiToday = () => { const d = new Date(); return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear() + 543}`; };

  function setDigits(rowId, str) {
    page.querySelectorAll(`.f1050-d[data-row="${rowId}"]`).forEach((i, k) => { i.value = /\d/.test(str?.[k] || '') ? str[k] : ''; });
  }

  // กรอกส่วนบนสุดจากข้อมูลสมาชิก: เลขหมายประจำตัว, ชื่อ-สกุล, เขต, ตำบล, หมู่, วันที่เขียนเอกสาร
  function fillFromMember(d) {
    clearAll();
    setDigits('idtop', String(d.id || '').replace(/\D/g, '').slice(0, 8));
    for (const [id, v] of [['name', d.name], ['khet', d.khet], ['tambon', d.tambon], ['moo', d.moo], ['date', d.date || thaiToday()]]) {
      const i = textField(id);
      if (i) i.value = v || '';
    }
  }

  // ค่าทั้งหมดในฟอร์ม -> { text:{id:ค่า}, digits:{แถว:"12345678" (ช่องว่าง = ว่าง)}, ticks:[id,...] } เก็บเฉพาะที่มีค่า
  function collect() {
    const text = {}, digits = {}, ticks = [];
    page.querySelectorAll('.f1050-t').forEach(i => { const v = i.value.trim(); if (v) text[i.dataset.id] = v; });
    for (const b of SPEC.boxes) {
      const s = [...page.querySelectorAll(`.f1050-d[data-row="${b.id}"]`)].map(i => i.value || ' ').join('');
      if (s.trim()) digits[b.id] = s;
    }
    page.querySelectorAll('.f1050-c[aria-pressed="true"]').forEach(b => ticks.push(b.dataset.id));
    return { text, digits, ticks };
  }

  function apply(v) {
    clearAll();
    for (const [id, val] of Object.entries(v?.text || {})) { const i = textField(id); if (i) i.value = String(val); }
    for (const [row, s] of Object.entries(v?.digits || {})) setDigits(row, String(s));
    for (const id of v?.ticks || []) page.querySelector(`.f1050-c[data-id="${id}"]`)?.setAttribute('aria-pressed', 'true');
  }

  function setStatus(text, kind) {
    const s = dlg.querySelector('#f1050Status');
    s.hidden = !text;
    s.textContent = text || '';
    s.className = `form-status ${kind || ''}`;
  }

  function renderActions() {
    const box = dlg.querySelector('#f1050Actions');
    box.replaceChildren();
    const add = (label, kind, onClick) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      if (kind) b.className = kind;
      b.addEventListener('click', onClick);
      box.append(b);
      return b;
    };
    for (const a of current.opts.actions || []) {
      add(a.label, a.kind, async () => {
        if (busy) return;
        if (a.confirm && !window.confirm(a.confirm)) return;
        busy = true;
        box.querySelectorAll('button').forEach(b => { b.disabled = true; });
        setStatus('กำลังดำเนินการ…', 'busy');
        try {
          const msg = await a.run(collect());
          setStatus(msg || 'เรียบร้อย', 'ok');
          if (a.close) setTimeout(() => { if (dlg.open) dlg.close(); }, 1100);
          else box.querySelectorAll('button').forEach(b => { b.disabled = false; });
        } catch (e) {
          setStatus(e.message || 'ไม่สำเร็จ ลองใหม่อีกครั้ง', 'err');
          box.querySelectorAll('button').forEach(b => { b.disabled = false; });
        } finally { busy = false; }
      });
    }
    if (current.opts.refill && current.d) add('กรอกใหม่จากข้อมูล', '', () => { fillFromMember(current.d); requestAnimationFrame(fitAll); });
    add('ล้างทั้งหมด', '', clearAll);
    add('บันทึกเป็นรูป', '', savePng);
    add('ปิด', '', () => dlg.close());
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
      a.download = `${current?.opts.fileName || '1050'}.png`;
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 10000);
    }, 'image/png');
  }

  // d    = { id (เลขหมายประจำตัว 8 หลัก), name, khet, tambon, moo, date? } ข้อมูลสมาชิกสำหรับกรอกส่วนบนสุด (ไม่บังคับถ้ามี opts.values)
  // opts = { title, meta, hint, values (จาก collect() ถ้ามีจะแสดงค่านี้แทน d), refill (แสดงปุ่มกรอกใหม่จากข้อมูล),
  //          fileName, actions: [{ label, kind: 'primary'|'danger', run: async values => ข้อความสำเร็จ, close, confirm }] }
  window.openForm1050 = function (d, opts = {}) {
    if (!dlg) build();
    current = { d, opts };
    dlg.querySelector('#f1050Title').textContent = opts.title || 'แบบติดต่องานทะเบียน 1050';
    const meta = dlg.querySelector('#f1050Meta');
    meta.hidden = !opts.meta;
    meta.textContent = opts.meta || '';
    dlg.querySelector('#f1050Hint').textContent = opts.hint || 'ช่องส่วนบนสุดกรอกให้แล้ว คลิกช่องจุดไข่ปลาเพื่อพิมพ์หรือแก้ไข คลิกวงกลมเพื่อติ๊ก ข้อมูลในหน้าต่างนี้ไม่ถูกเก็บไว้ ปิดแล้วหาย';
    setStatus('', '');
    busy = false;
    if (opts.values) apply(opts.values); else fillFromMember(d);
    renderActions();
    if (!dlg.open) dlg.showModal();
    requestAnimationFrame(fitAll);
  };
})();
