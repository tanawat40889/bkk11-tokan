// ตัวแก้ไขลายเซ็นของฉัน: วาดด้วยนิ้ว/เมาส์ หรืออัปโหลดรูปลายเซ็น (ตัดพื้นหลังขาวให้โปร่งใส) + รหัส 8 หลัก
// ไม่รู้จัก Supabase: หน้าที่เรียกส่ง save/remove มาเอง  window.openSignatureEditor({ png, code, defaultCode, save, remove })
(() => {
  'use strict';
  const CW = 1200, CH = 400;           // ขนาดผืนวาด (px ภายใน)
  const OUT_W = 420, OUT_H = 150;      // ขนาดสูงสุดของ PNG ที่เก็บ
  const MAX_CHARS = 45000;             // data URL สูงสุด (ตารางจำกัด 60000)
  const INK = [10, 42, 110];           // #0a2a6e เหมือนหมึกในฟอร์ม
  let codeLabel = null, titleEl = null, noteEl = null, dlg = null, cv = null, ctx = null, codeInput = null, msg = null, btns = {}, state = null;

  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; };
  const loadImg = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('เปิดรูปไม่ได้')); i.src = src; });

  function build() {
    dlg = el('dialog', 'sig-dlg');
    dlg.setAttribute('aria-label', 'ลายเซ็นของฉัน');
    const form = el('div', 'sig-body');
    titleEl = el('h2', 'sig-title', 'ลายเซ็นของฉัน');
    form.append(titleEl);
    noteEl = el('p', 'sig-note');
    form.append(noteEl);
    const wrap = el('div', 'sig-pad');
    cv = document.createElement('canvas');
    cv.width = CW; cv.height = CH;
    cv.setAttribute('aria-label', 'ผืนวาดลายเซ็น');
    wrap.append(cv, el('span', 'sig-line'));
    form.append(wrap);
    ctx = cv.getContext('2d');

    const row = el('div', 'sig-row');
    btns.upload = el('button', 'sig-btn', 'อัปโหลดรูปลายเซ็น');
    btns.clear = el('button', 'sig-btn', 'ล้างกรอบ');
    btns.upload.type = btns.clear.type = 'button';
    row.append(btns.upload, btns.clear);
    form.append(row);

    const lab = el('label', 'sig-code');
    codeLabel = lab;
    lab.append(el('span', '', 'รหัส 8 หลักของฉัน (เลขหมายประจำตัว)'));
    codeInput = document.createElement('input');
    codeInput.type = 'text'; codeInput.inputMode = 'numeric'; codeInput.maxLength = 8; codeInput.autocomplete = 'off';
    codeInput.addEventListener('input', () => { codeInput.value = codeInput.value.replace(/\D/g, '').slice(0, 8); });
    lab.append(codeInput);
    form.append(lab);

    msg = el('p', 'sig-msg'); msg.hidden = true; msg.setAttribute('role', 'status');
    form.append(msg);

    const foot = el('div', 'sig-foot');
    btns.save = el('button', 'sig-btn sig-primary', 'บันทึก');
    btns.remove = el('button', 'sig-btn sig-danger', 'ลบลายเซ็นที่เก็บไว้');
    btns.close = el('button', 'sig-btn', 'ปิด');
    btns.save.type = btns.remove.type = btns.close.type = 'button';
    foot.append(btns.save, btns.remove, btns.close);
    form.append(foot);
    dlg.append(form);

    const file = document.createElement('input');
    file.type = 'file'; file.accept = 'image/*'; file.hidden = true;
    dlg.append(file);
    document.body.append(dlg);

    // วาด: pointer events (นิ้ว/เมาส์/ปากกา) เส้นโค้งเรียบด้วย quadratic ผ่านจุดกึ่งกลาง
    let drawing = false, last = null;
    const pos = e => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * CW / r.width, y: (e.clientY - r.top) * CH / r.height }; };
    cv.addEventListener('pointerdown', e => {
      drawing = true; last = pos(e);
      try { cv.setPointerCapture(e.pointerId); } catch { /* ไม่เป็นไร */ }
      ctx.fillStyle = `rgb(${INK})`;
      ctx.beginPath(); ctx.arc(last.x, last.y, 3, 0, Math.PI * 2); ctx.fill();
      e.preventDefault();
    });
    cv.addEventListener('pointermove', e => {
      if (!drawing) return;
      const p = pos(e), mid = { x: (last.x + p.x) / 2, y: (last.y + p.y) / 2 };
      ctx.strokeStyle = `rgb(${INK})`; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.quadraticCurveTo(last.x, last.y, mid.x, mid.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      last = p;
      e.preventDefault();
    });
    const stop = () => { drawing = false; };
    cv.addEventListener('pointerup', stop);
    cv.addEventListener('pointercancel', stop);

    btns.clear.addEventListener('click', () => { ctx.clearRect(0, 0, CW, CH); say(''); });
    btns.upload.addEventListener('click', () => file.click());
    file.addEventListener('change', async () => {
      const f = file.files[0]; file.value = '';
      if (!f) return;
      const url = URL.createObjectURL(f);
      try { await importPhoto(await loadImg(url)); say(''); }
      catch (e) { say(e.message || 'เปิดรูปไม่ได้', true); }
      finally { URL.revokeObjectURL(url); }
    });
    btns.close.addEventListener('click', () => dlg.close());
    dlg.addEventListener('close', () => { if (!dlg.open) finish(); });
    btns.save.addEventListener('click', onSave);
    btns.remove.addEventListener('click', onRemove);
  }

  // ปิดหน้าต่างและส่งผลกลับให้ผู้เรียกทันที (ไม่รอ event close; ปิดด้วย Esc/ปุ่มปิดก็เข้าทางนี้ผ่าน event)
  function finish() {
    const s = state;
    if (!s) return;
    state = null;
    s.done(s.result || null);
    if (dlg.open) dlg.close();
  }

  function say(text, err) { msg.hidden = !text; msg.textContent = text || ''; msg.className = `sig-msg${err ? ' err' : ''}`; }
  const busy = on => { Object.values(btns).forEach(b => { b.disabled = on; }); };

  // รูปถ่ายลายเซ็นบนกระดาษ -> เก็บเฉพาะหมึก (พื้นขาว = โปร่งใส) วางกลางผืนวาด
  async function importPhoto(img) {
    const k = Math.min(1, 1400 / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.max(1, Math.round(img.naturalWidth * k)), h = Math.max(1, Math.round(img.naturalHeight * k));
    const t = document.createElement('canvas'); t.width = w; t.height = h;
    const tc = t.getContext('2d', { willReadFrequently: true });
    tc.drawImage(img, 0, 0, w, h);
    const d = tc.getImageData(0, 0, w, h), px = d.data, lum = new Uint8Array(w * h), hist = new Uint32Array(256);
    for (let i = 0, j = 0; i < px.length; i += 4, j++) { const l = Math.round(0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]); lum[j] = l; hist[l]++; }
    let acc = 0, bg = 255;
    for (let l = 255; l >= 0; l--) { acc += hist[l]; if (acc >= lum.length * 0.5) { bg = l; break; } } // พื้นกระดาษ = ความสว่างกลาง ๆ ของภาพที่เป็นพื้นส่วนใหญ่
    bg = Math.max(bg, 120);
    const hi = bg * 0.82, lo = bg * 0.45;
    for (let i = 0, j = 0; i < px.length; i += 4, j++) {
      const a = Math.max(0, Math.min(1, (hi - lum[j]) / (hi - lo)));
      px[i] = INK[0]; px[i + 1] = INK[1]; px[i + 2] = INK[2]; px[i + 3] = Math.round(a * 255);
    }
    tc.putImageData(d, 0, 0);
    const bb = bbox(tc, w, h);
    if (!bb) throw new Error('ไม่พบลายเซ็นในรูป ลองถ่ายบนกระดาษขาว ให้แสงสว่างพอ');
    const s = Math.min((CW - 80) / bb.w, (CH - 60) / bb.h);
    ctx.clearRect(0, 0, CW, CH);
    ctx.drawImage(t, bb.x, bb.y, bb.w, bb.h, (CW - bb.w * s) / 2, (CH - bb.h * s) / 2, bb.w * s, bb.h * s);
  }

  // กรอบที่ล้อมพิกเซลที่ไม่โปร่งใส (null = ว่าง)
  function bbox(c, w, h) {
    const d = c.getImageData(0, 0, w, h).data;
    let x0 = w, y0 = h, x1 = -1, y1 = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (d[(y * w + x) * 4 + 3] > 24) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    return x1 < 0 ? null : { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
  }

  // ผืนวาด -> PNG ที่ตัดขอบแล้วและย่อให้พอดี OUT_W x OUT_H; ใหญ่เกินเพดานก็ย่ออีก
  function exportPng() {
    const bb = bbox(ctx, CW, CH);
    if (!bb) return null;
    const pad = 6;
    let s = Math.min(OUT_W / bb.w, OUT_H / bb.h, 1.2);
    for (let n = 0; n < 6; n++) {
      const o = document.createElement('canvas');
      o.width = Math.max(1, Math.round(bb.w * s) + pad * 2); o.height = Math.max(1, Math.round(bb.h * s) + pad * 2);
      const oc = o.getContext('2d');
      oc.imageSmoothingQuality = 'high';
      oc.drawImage(cv, bb.x, bb.y, bb.w, bb.h, pad, pad, o.width - pad * 2, o.height - pad * 2);
      const url = o.toDataURL('image/png');
      if (url.length <= MAX_CHARS) return url;
      s *= 0.75;
    }
    return null;
  }

  async function onSave() {
    const code = codeInput.value;
    if (!state.oneOff && !/^\d{8}$/.test(code)) { say('กรอกรหัสให้ครบ 8 หลัก', true); codeInput.focus(); return; }
    const png = exportPng();
    if (!png) { say('ยังไม่มีลายเซ็นในกรอบ (หรือไฟล์ใหญ่เกินไป)', true); return; }
    busy(true); say('กำลังบันทึก…');
    try {
      if (state.save) await state.save({ png, code });
      state.result = { png, code };
      say(state.oneOff ? '' : 'บันทึกแล้ว ✅');
      if (state.oneOff) finish(); else { const st = state; setTimeout(() => { if (state === st) finish(); }, 700); }
    } catch (e) { say(e.message || 'บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง', true); busy(false); }
  }

  async function onRemove() {
    if (!window.confirm('ลบลายเซ็นที่เก็บไว้? (ฟอร์มที่ส่งไปแล้วไม่เปลี่ยน)')) return;
    busy(true); say('กำลังลบ…');
    try {
      await state.remove();
      state.result = { removed: true };
      finish();
    } catch (e) { say(e.message || 'ลบไม่สำเร็จ ลองใหม่อีกครั้ง', true); busy(false); }
  }

  // opts = { png (ลายเซ็นที่เก็บไว้หรือ null), code, defaultCode, save: async ({png, code}), remove: async () }
  // คืนค่า: { png, code } เมื่อบันทึก, { removed: true } เมื่อลบ, null เมื่อปิดเฉย ๆ
  window.openSignatureEditor = opts => new Promise(done => {
    if (!dlg) build();
    state = { ...opts, done, result: null };
    busy(false);
    say('');
    ctx.clearRect(0, 0, CW, CH);
    codeInput.value = String(opts.code || opts.defaultCode || '').replace(/\D/g, '').slice(0, 8);
    const one = !!opts.oneOff;
    titleEl.textContent = opts.title || 'ลายเซ็นของฉัน';
    noteEl.textContent = one ? 'ให้เจ้าของข้อมูลวาดลายเซ็นในกรอบ (หรืออัปโหลดรูป) ใช้กับฟอร์มนี้ฟอร์มเดียว ไม่ถูกเก็บไว้' : 'วาดลายเซ็นในกรอบ หรืออัปโหลดรูปลายเซ็น (ถ่ายบนกระดาษขาว) เก็บไว้เห็นเฉพาะคุณ ใช้ใส่ช่องลงชื่อในแบบ 1050 ให้อัตโนมัติ';
    codeLabel.hidden = one;
    btns.save.textContent = one ? 'ใช้ลายเซ็นนี้' : 'บันทึก';
    btns.remove.hidden = one || !opts.png;
    dlg.showModal();
    if (opts.png) {
      loadImg(opts.png).then(img => {
        const s = Math.min((CW - 80) / img.naturalWidth, (CH - 60) / img.naturalHeight);
        ctx.drawImage(img, (CW - img.naturalWidth * s) / 2, (CH - img.naturalHeight * s) / 2, img.naturalWidth * s, img.naturalHeight * s);
      }).catch(() => {});
    }
  });
})();
