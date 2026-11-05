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
  // ช่อง "ติดรูป" ในฟอร์ม (pt) และขนาดรูปที่ย่อแล้ว (px, สัดส่วนเดียวกับช่อง ~ 40KB ต่อรูป)
  const PHOTO = { x: 474.5, y: 108.2, w: 80.7, h: 93.7 };
  const PHOTO_W = 360, PHOTO_H = 418, PHOTO_MAX_BYTES = 70000;
  const DESIGN_W = 920;   // ความกว้างหน้ากระดาษ (px) ที่ตัวอักษรในช่องได้ >= 16px (iOS ไม่ซูมตอนแตะ) ย่อให้พอดีจอด้วย --s
  const COARSE = window.matchMedia('(pointer: coarse)').matches; // จอสัมผัส: ไม่ย่อตัวอักษรตามความยาว (ย่อแล้วต่ำกว่า 16px จะทำให้ iOS ซูม)
  const pctX = v => `${(v / SPEC.w * 100).toFixed(3)}%`;
  const pctY = v => `${(v / SPEC.h * 100).toFixed(3)}%`;
  const sizeCss = pt => `calc(${pt} * var(--pt))`;

  let dlg = null, page = null, fitBox = null, scroller = null, ro = null, fileInput = null, photoBox = null;
  let photo = { blob: null, url: null, existing: false, removed: false }; // existing = รูปที่โหลดมาจากหลังบ้าน
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

    photoBox = document.createElement('div');
    photoBox.className = 'f1050-photo';
    Object.assign(photoBox.style, { left: pctX(PHOTO.x), top: pctY(PHOTO.y), width: pctX(PHOTO.w), height: pctY(PHOTO.h) });
    photoBox.innerHTML = '<img class="f1050-photo-img" alt="รูปถ่าย" hidden><button type="button" class="f1050-photo-pick" aria-label="เพิ่มหรือเปลี่ยนรูปถ่าย"><span>เพิ่มรูป</span></button>';
    photoBox.querySelector('.f1050-photo-pick').addEventListener('click', () => fileInput.click());
    page.append(photoBox);
    fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.hidden = true;
    fileInput.addEventListener('change', onPickPhoto);
    dlg.append(fileInput);

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

    const reset = () => { if (crop.el) { crop.el.hidden = true; if (crop.prevSrc) URL.revokeObjectURL(crop.prevSrc.url); crop.prevSrc = null; } clearAll(); current = null; };
    dlg.addEventListener('close', reset); // ปิดด้วย Esc หรือปุ่มปิด
  }

  // ---------- รูปถ่าย ----------
  const photoImg = () => photoBox.querySelector('.f1050-photo-img');
  const hasPhoto = () => !!photo.url;

  function showPhoto(url) {
    photoImg().src = url;
    photoImg().hidden = false;
    photoBox.classList.add('has-photo');
  }

  // ล้างรูปในหน้าจอ (markRemoved: ผู้ใช้สั่งเอารูปออก -> ถ้ามีรูปเดิมจากหลังบ้าน ต้องลบไฟล์เดิมตอนบันทึก)
  function resetPhoto(markRemoved) {
    if (!photoBox) return;
    const hadServer = photo.existing || photo.removed;
    if (photo.url) URL.revokeObjectURL(photo.url);
    photoImg().hidden = true;
    photoImg().removeAttribute('src');
    photoBox.classList.remove('has-photo');
    photo = { blob: null, url: null, existing: false, removed: !!markRemoved && hadServer };
    if (!markRemoved) discardSource();
    updatePhotoButtons();
  }

  // ---------- ปรับตำแหน่ง/ขนาดรูปก่อนส่ง ----------
  // รูปต้นฉบับอยู่ในหน่วยความจำจนกว่าจะปิดฟอร์ม (photoSrc) เพื่อให้กลับมาปรับได้อีก; ส่งขึ้นเซิร์ฟเวอร์เฉพาะรูปที่ตัดและย่อแล้ว
  let photoSrc = null;   // { url, img, z, tx, ty }  z = ซูม (1 = พอดีช่องแบบ cover), tx/ty = ตำแหน่งรูปในกรอบตัด (px)
  const crop = { el: null, view: null, img: null, zoom: null, label: null, mode: 'new', prevSrc: null, vw: 0, vh: 0, z: 1, tx: 0, ty: 0, base: 1, pointers: new Map(), last: null };
  const MAX_ZOOM = 4;

  function buildCropper() {
    const el = document.createElement('div');
    el.className = 'f1050-crop';
    el.hidden = true;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'ปรับรูปถ่าย');
    el.innerHTML = `
      <div class="f1050-crop-card">
        <p class="f1050-crop-title">ลากรูปเพื่อเลื่อนตำแหน่ง · เลื่อนแถบ (หรือหยิกนิ้ว) เพื่อปรับขนาด</p>
        <div class="f1050-crop-view"><img class="f1050-crop-img" alt="" draggable="false"></div>
        <label class="f1050-crop-zoom"><span>ขนาด</span><input type="range" min="1" max="${MAX_ZOOM}" step="0.01" value="1" aria-label="ขนาดรูป"><output>100%</output></label>
        <div class="f1050-crop-actions">
          <button type="button" data-crop="cancel">ยกเลิก</button>
          <button type="button" data-crop="ok" class="primary">ใช้รูปนี้</button>
        </div>
      </div>`;
    dlg.append(el);
    Object.assign(crop, { el, view: el.querySelector('.f1050-crop-view'), img: el.querySelector('.f1050-crop-img'),
      zoom: el.querySelector('input[type=range]'), label: el.querySelector('output') });
    el.querySelector('[data-crop=cancel]').addEventListener('click', closeCropper);
    el.querySelector('[data-crop=ok]').addEventListener('click', applyCrop);
    crop.zoom.addEventListener('input', () => setZoom(Number(crop.zoom.value), crop.vw / 2, crop.vh / 2));

    const v = crop.view;
    v.addEventListener('pointerdown', e => { try { v.setPointerCapture(e.pointerId); } catch { /* ไม่รองรับ: ลากต่อได้ตราบที่ยังอยู่ในกรอบ */ } crop.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); crop.last = null; });
    v.addEventListener('pointermove', e => {
      const p = crop.pointers.get(e.pointerId);
      if (!p) return;
      const prev = [...crop.pointers.values()].map(q => ({ ...q }));
      p.x = e.clientX; p.y = e.clientY;
      const cur = [...crop.pointers.values()];
      if (cur.length >= 2) {            // หยิกนิ้ว: ซูมรอบจุดกึ่งกลางสองนิ้ว + เลื่อนตามไปด้วย
        const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
        const r = v.getBoundingClientRect();
        const mx = (cur[0].x + cur[1].x) / 2 - r.left, my = (cur[0].y + cur[1].y) / 2 - r.top;
        const pmx = (prev[0].x + prev[1].x) / 2 - r.left, pmy = (prev[0].y + prev[1].y) / 2 - r.top;
        crop.tx += mx - pmx; crop.ty += my - pmy;
        const d0 = dist(prev[0], prev[1]);
        if (d0 > 0) setZoom(crop.z * dist(cur[0], cur[1]) / d0, mx, my);
        else paintCrop();
      } else {                           // นิ้วเดียว/เมาส์: ลากเลื่อน
        const q = prev[0];
        crop.tx += p.x - q.x; crop.ty += p.y - q.y;
        paintCrop();
      }
    });
    const up = e => { crop.pointers.delete(e.pointerId); };
    v.addEventListener('pointerup', up);
    v.addEventListener('pointercancel', up);
    v.addEventListener('wheel', e => {
      e.preventDefault();
      const r = v.getBoundingClientRect();
      setZoom(crop.z * Math.exp(-e.deltaY * 0.0015), e.clientX - r.left, e.clientY - r.top);
    }, { passive: false });
  }

  // วาดรูปในกรอบตัดตาม z/tx/ty โดยบังคับให้รูปคลุมกรอบเต็มเสมอ (ไม่มีขอบว่าง)
  function paintCrop() {
    const sc = crop.base * crop.z, w = photoSrc.img.naturalWidth * sc, h = photoSrc.img.naturalHeight * sc;
    crop.tx = Math.min(0, Math.max(crop.vw - w, crop.tx));
    crop.ty = Math.min(0, Math.max(crop.vh - h, crop.ty));
    Object.assign(crop.img.style, { width: `${w}px`, height: `${h}px`, transform: `translate(${crop.tx}px, ${crop.ty}px)` });
    crop.zoom.value = String(crop.z);
    crop.label.textContent = `${Math.round(crop.z * 100)}%`;
  }

  // ซูมโดยให้จุด (cx, cy) ในกรอบอยู่ที่เดิม
  function setZoom(z, cx, cy) {
    z = Math.min(MAX_ZOOM, Math.max(1, z));
    const oldSc = crop.base * crop.z, newSc = crop.base * z;
    crop.tx = cx - (cx - crop.tx) / oldSc * newSc;
    crop.ty = cy - (cy - crop.ty) / oldSc * newSc;
    crop.z = z;
    paintCrop();
  }

  function openCropper(mode) {
    if (!crop.el) buildCropper();
    crop.mode = mode;
    crop.pointers.clear();
    crop.img.src = photoSrc.url;
    crop.el.hidden = false;
    const r = crop.view.getBoundingClientRect();
    crop.vw = r.width; crop.vh = r.height;
    crop.base = Math.max(crop.vw / photoSrc.img.naturalWidth, crop.vh / photoSrc.img.naturalHeight);
    // tx/ty เก็บเป็นสัดส่วนของกรอบ เพื่อให้เปิดซ้ำแล้วตำแหน่งเดิมไม่เพี้ยนแม้ขนาดจอเปลี่ยน
    crop.z = photoSrc.z;
    crop.tx = photoSrc.tx == null ? (crop.vw - photoSrc.img.naturalWidth * crop.base * crop.z) / 2 : photoSrc.tx * crop.vw;
    crop.ty = photoSrc.ty == null ? (crop.vh - photoSrc.img.naturalHeight * crop.base * crop.z) / 2 : photoSrc.ty * crop.vh;
    paintCrop();
    crop.el.querySelector('[data-crop=ok]').focus();
  }

  function closeCropper() {
    crop.el.hidden = true;
    crop.img.removeAttribute('src');
    if (crop.mode === 'new') {                // ยกเลิกตอนเพิ่งเลือกไฟล์: ทิ้งไฟล์ใหม่ แล้วกลับไปใช้รูปเดิม (ถ้ามี)
      URL.revokeObjectURL(photoSrc.url);
      photoSrc = crop.prevSrc;
      crop.prevSrc = null;
      updatePhotoButtons();
    }
  }

  function discardSource() {
    if (photoSrc) URL.revokeObjectURL(photoSrc.url);
    photoSrc = null;
    updatePhotoButtons();
  }

  // ตัดตามกรอบเป็น 360x418 แล้วบีบ JPEG จนไม่เกิน ~70KB (ปกติราว 30-50KB)
  async function renderCrop() {
    const img = photoSrc.img, sc = crop.base * crop.z;
    const cv = document.createElement('canvas');
    cv.width = PHOTO_W; cv.height = PHOTO_H;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, PHOTO_W, PHOTO_H);
    ctx.drawImage(img, -crop.tx / sc, -crop.ty / sc, crop.vw / sc, crop.vh / sc, 0, 0, PHOTO_W, PHOTO_H);
    let blob = null;
    for (const q of [0.82, 0.72, 0.62, 0.5, 0.4]) {
      blob = await new Promise(res => cv.toBlob(res, 'image/jpeg', q));
      if (blob && blob.size <= PHOTO_MAX_BYTES) break;
    }
    if (!blob) throw new Error('ย่อรูปไม่สำเร็จ');
    return blob;
  }

  async function applyCrop() {
    const okBtn = crop.el.querySelector('[data-crop=ok]');
    okBtn.disabled = true;
    try {
      const blob = await renderCrop();
      if (crop.mode === 'new' && crop.prevSrc) { URL.revokeObjectURL(crop.prevSrc.url); crop.prevSrc = null; }
      photoSrc.z = crop.z;
      photoSrc.tx = crop.tx / crop.vw;
      photoSrc.ty = crop.ty / crop.vh;
      if (photo.url) URL.revokeObjectURL(photo.url);
      photo = { blob, url: URL.createObjectURL(blob), existing: photo.existing, removed: false };
      showPhoto(photo.url);
      updatePhotoButtons();
      crop.el.hidden = true;
      crop.img.removeAttribute('src');
      setStatus(`ใส่รูปแล้ว (ย่อเหลือ ${Math.max(1, Math.round(blob.size / 1024))} KB)`, 'ok');
    } catch (e) { setStatus(e.message || 'ใส่รูปไม่สำเร็จ', 'err'); }
    finally { okBtn.disabled = false; }
  }

  async function onPickPhoto() {
    const f = fileInput.files[0];
    fileInput.value = '';
    if (!f) return;
    if (!/^image\//.test(f.type)) { setStatus('ไฟล์ที่เลือกไม่ใช่รูปภาพ', 'err'); return; }
    setStatus('กำลังเปิดรูป…', 'busy');
    const url = URL.createObjectURL(f);
    let img;
    try { img = await loadImg(url); } catch { URL.revokeObjectURL(url); setStatus('เปิดรูปนี้ไม่ได้ ลองเลือกรูปอื่น (JPG หรือ PNG)', 'err'); return; }
    crop.prevSrc = photoSrc;  // เก็บรูปเดิมไว้ก่อน เผื่อกดยกเลิก
    photoSrc = { url, img, z: 1, tx: null, ty: null };
    setStatus('', '');
    openCropper('new');
  }

  function updatePhotoButtons() {
    const del = dlg?.querySelector('[data-photo-del]');
    if (del) del.hidden = !hasPhoto();
    const adj = dlg?.querySelector('[data-photo-adjust]');
    if (adj) adj.hidden = !photoSrc || !hasPhoto();
  }

  const photoExtra = () => ({ photoBlob: photo.blob, photoRemoved: photo.removed && !photo.blob, renderPng });

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
    resetPhoto(false);
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
          const msg = await a.run(collect(), photoExtra());
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
    if (current.opts.photoEditable !== false) {
      add('📷 เพิ่ม/เปลี่ยนรูป', '', () => fileInput.click());
      const adj = add('ปรับตำแหน่ง/ขนาดรูป', '', () => openCropper('adjust'));
      adj.dataset.photoAdjust = '1';
      adj.hidden = !photoSrc || !hasPhoto();
      const del = add('ลบรูป', '', () => { resetPhoto(true); discardSource(); setStatus('เอารูปออกแล้ว', 'ok'); });
      del.dataset.photoDel = '1';
      del.hidden = !hasPhoto();
    }
    add('ล้างทั้งหมด', '', () => { const had = photo.existing || photo.removed; clearAll(); if (had) photo.removed = true; });
    add('บันทึกเป็นรูป', '', savePng);
    add('ปิด', '', () => dlg.close());
  }

  async function savePng() {
    const blob = await renderPng();
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${current?.opts.fileName || '1050'}.png`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
  }

  // ---------- วาดฟอร์มที่กรอกแล้วเป็นรูป PNG ----------
  // วาดจากค่า (collect()) ลงบนภาพฟอร์มเปล่าโดยตรง ไม่พึ่งหน้าต่างฟอร์ม จึงใช้ส่งหลายฉบับรวดเดียวจากหน้าแอดมินได้ (window.renderForm1050Png)
  let baseImg = null, fontsReady = false;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  // onload แทน decode(): decode() อาจค้างเมื่อแท็บอยู่เบื้องหลัง
  const loadImg = url => new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = () => rej(new Error('โหลดรูปไม่สำเร็จ'));
    i.src = url;
  });
  async function baseImage() {
    if (!baseImg) baseImg = await loadImg('assets/form1050.png');
    return baseImg;
  }
  async function ensureFonts() {
    if (fontsReady) return;
    // รอฟอนต์ไม่เกิน 2 วินาที (ถ้าฟอนต์ไม่มา ใช้ฟอนต์สำรอง)
    await Promise.race([document.fonts.load(`${TEXT_PT}px Prompt`, 'ก').catch(() => {}), sleep(2000)]);
    fontsReady = true;
  }

  async function renderValuesPng(values, photoUrl) {
    const [img] = await Promise.all([baseImage(), ensureFonts()]);
    const W = img.naturalWidth, H = img.naturalHeight, kpt = W / SPEC.w;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');
    ctx.drawImage(img, 0, 0, W, H);
    ctx.fillStyle = INK;
    ctx.strokeStyle = INK;
    ctx.textBaseline = 'alphabetic';

    for (const f of SPEC.fields) {
      const v = values?.text?.[f.id];
      if (!v) continue;
      let pt = TEXT_PT;
      ctx.font = `${pt * kpt}px Prompt, sans-serif`;
      while (pt > 6 && ctx.measureText(v).width > (f.w - 2) * kpt) { pt -= 0.5; ctx.font = `${pt * kpt}px Prompt, sans-serif`; } // ย่อให้พอดีช่อง
      ctx.textAlign = 'left';
      ctx.fillText(v, (f.x + 1) * kpt, (f.y + f.h - 4.8) * kpt);
    }
    ctx.textAlign = 'center';
    ctx.font = `500 ${DIGIT_PT * kpt}px Prompt, sans-serif`;
    for (const b of SPEC.boxes) {
      const s = String(values?.digits?.[b.id] || '');
      b.xs.forEach((x, k) => { if (/\d/.test(s[k] || '')) ctx.fillText(s[k], (x + b.w / 2) * kpt, (b.y + b.h - 3) * kpt); });
    }
    if (photoUrl) {
      try { ctx.drawImage(await loadImg(photoUrl), PHOTO.x * kpt, PHOTO.y * kpt, PHOTO.w * kpt, PHOTO.h * kpt); } catch { /* ไม่มีรูป: ข้าม */ }
    }
    ctx.lineWidth = 1.7 * kpt;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const ticks = new Set(values?.ticks || []);
    for (const c of SPEC.circles) {
      if (!ticks.has(c.id)) continue;
      ctx.beginPath();
      ctx.moveTo((c.x + c.s * 0.2) * kpt, (c.y + c.s * 0.55) * kpt);
      ctx.lineTo((c.x + c.s * 0.43) * kpt, (c.y + c.s * 0.78) * kpt);
      ctx.lineTo((c.x + c.s * 0.82) * kpt, (c.y + c.s * 0.2) * kpt);
      ctx.stroke();
    }
    return new Promise(res => cv.toBlob(res, 'image/png'));
  }
  window.renderForm1050Png = renderValuesPng;
  const renderPng = () => renderValuesPng(collect(), photo.url);

  // ---------- สถานะ/ขั้นตอนของแบบฟอร์มที่ส่งไปหลังบ้าน (ใช้ทั้งหน้าโทกังและหน้าแอดมิน) ----------
  // คำนวณจากคอลัมน์ที่มีอยู่: status (pending/approved/rejected) + emailed_at; ไม่มีคอลัมน์สถานะเพิ่ม
  // step = ขั้นปัจจุบัน (1 ส่งแบบฟอร์ม, 2 ตรวจสอบ/อนุมัติ, 3 ส่งอีเมลถึงสมาคม, 4 = เสร็จครบ)
  const STEP_LABELS = ['ส่งแบบฟอร์ม', 'ตรวจสอบ/อนุมัติ', 'ส่งอีเมลถึงสมาคม'];
  window.form1050State = f => {
    if (f.status === 'rejected') return { label: 'ไม่อนุมัติ', kind: 'danger', step: 2, rejected: true };
    if (f.status === 'approved') return f.emailed_at ? { label: 'ส่งอีเมลแล้ว', kind: 'ok', step: 4 } : { label: 'อนุมัติแล้ว · รอส่งอีเมล', kind: 'info', step: 3 };
    return { label: 'รอตรวจสอบ', kind: 'warn', step: 2 };
  };
  window.form1050Chip = f => {
    const st = window.form1050State(f), c = document.createElement('span');
    c.className = `f1050-chip ${st.kind}`;
    c.textContent = st.label;
    return c;
  };
  window.form1050Steps = f => {
    const st = window.form1050State(f), ol = document.createElement('ol');
    ol.className = 'f1050-steps';
    ol.setAttribute('aria-label', `สถานะ: ${st.label}`);
    STEP_LABELS.forEach((t, i) => {
      const n = i + 1, li = document.createElement('li');
      li.textContent = n === 2 && st.rejected ? 'ไม่อนุมัติ' : t;
      li.className = st.rejected ? (n === 1 ? 'done' : n === 2 ? 'bad' : 'skip') : n < st.step ? 'done' : n === st.step ? 'cur' : '';
      ol.append(li);
    });
    return ol;
  };

  // d    = { id (เลขหมายประจำตัว 8 หลัก), name, khet, tambon, moo, date? } ข้อมูลสมาชิกสำหรับกรอกส่วนบนสุด (ไม่บังคับถ้ามี opts.values)
  // opts = { title, meta, hint, values (จาก collect() ถ้ามีจะแสดงค่านี้แทน d), refill (แสดงปุ่มกรอกใหม่จากข้อมูล),
  //          photoUrl (blob: URL ของรูปเดิม ฟอร์มจะ revoke ให้เมื่อปิด), photoEditable (ค่าเริ่มต้น true),
  //          fileName, actions: [{ label, kind: 'primary'|'danger', run: async (values, { photoBlob, photoRemoved, renderPng }) => ข้อความสำเร็จ, close, confirm }] }
  //          photoBlob = รูปใหม่ที่ย่อแล้ว (JPEG ~40KB) หรือ null, photoRemoved = ผู้ใช้เอารูปเดิมออก
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
    if (opts.photoUrl) { photo = { blob: null, url: opts.photoUrl, existing: true, removed: false }; showPhoto(opts.photoUrl); }
    updatePhotoButtons();
    renderActions();
    if (!dlg.open) dlg.showModal();
    requestAnimationFrame(fitAll);
  };
})();
