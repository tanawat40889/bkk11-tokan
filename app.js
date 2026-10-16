const SUPABASE_URL = 'https://cqdzfsucpivsgznfpjxl.supabase.co';
const SUPABASE_KEY = 'sb_publishable_XkUBjE3M7HUiuDv7YwsbKA_mSu0ToEc';
const PAGE_SIZE = 1000; // PostgREST จำกัดแถวต่อ request
const NOTES_KEY = 'tokan_notes_v1';
const SESSION_KEY = 'tokan_session_v1';

const LEVEL_LABEL = { all: 'ทุกภาค', phak: 'ภาค', khet: 'เขต', tambon: 'ตำบล', moo: 'หมู่' };

// เก็บใน localStorage เพื่อให้ login ค้างไว้จนกว่าจะออกจากระบบหรือเปลี่ยนเครื่อง
function loadSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; }
}
function saveSession(s) { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
function clearSession() { localStorage.removeItem(SESSION_KEY); }

// คืน null เมื่อ server ปฏิเสธ refresh token; ถ้าเน็ตมีปัญหาจะ throw (ห้ามล้าง session)
async function refreshSession(s) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: s.refresh_token }),
  });
  if (!res.ok) return null;
  const d = await res.json();
  return { ...s, access_token: d.access_token, refresh_token: d.refresh_token, expires_at: d.expires_at };
}

async function fetchMembers(token) {
  const rows = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/members?select=*&order=mt_co`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${token}`,
        Range: `${from}-${from + PAGE_SIZE - 1}`,
      },
    });
    if (!res.ok) throw Object.assign(new Error(`members ${res.status}`), { status: res.status });
    const page = await res.json();
    rows.push(...page);
    if (page.length < PAGE_SIZE) return rows;
  }
}

const THEME_KEY = 'tokan_theme';

function currentTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function renderThemeButtons() {
  const label = currentTheme() === 'dark' ? '☀ โหมดสว่าง' : '🌙 โหมดมืด';
  document.querySelectorAll('[data-theme-toggle]').forEach(b => { b.textContent = label; });
}

function initTheme() {
  renderThemeButtons();
  document.querySelectorAll('[data-theme-toggle]').forEach(b => b.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch { /* ignore */ }
    renderThemeButtons();
  }));
}

let allRecords = [];
let scope = null;   // { phak: 'all'|string[], khet: 'all'|string[] }
let profile = null; // { name, po, level, phak, khet, tambon, moo }
let notes = {};     // { [mt_co]: { name, text, updatedAt } }

init();

function showLogin(msg = '') {
  document.getElementById('app').hidden = true;
  document.getElementById('loginView').hidden = false;
  const err = document.getElementById('loginError');
  err.textContent = msg;
  err.hidden = !msg;
}

async function init() {
  initTheme();
  document.getElementById('loginForm').addEventListener('submit', onLogin);
  document.getElementById('logoutBtn').addEventListener('click', () => {
    clearSession();
    location.reload();
  });

  let s = loadSession();
  if (s && s.expires_at * 1000 < Date.now() + 60000) {
    try {
      s = await refreshSession(s);
    } catch {
      showLogin('เชื่อมต่อไม่ได้ ลองรีเฟรชหน้าอีกครั้ง');
      return;
    }
  }
  if (!s) {
    clearSession();
    showLogin();
    return;
  }
  saveSession(s);
  await start(s);
}

async function onLogin(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/login`, {
      method: 'POST',
      headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById('loginName').value,
        code: document.getElementById('loginCode').value,
      }),
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok || !d.session) {
      showLogin(d.error && d.error !== 'server' ? d.error : 'เข้าสู่ระบบไม่สำเร็จ ลองใหม่อีกครั้ง');
      return;
    }
    const s = { ...d.session, profile: d.profile };
    saveSession(s);
    document.getElementById('loginCode').value = '';
    await start(s);
  } catch {
    showLogin('เชื่อมต่อไม่ได้ ลองใหม่อีกครั้ง');
  } finally {
    btn.disabled = false;
  }
}

async function start(s, retried = false) {
  let records;
  try {
    records = await fetchMembers(s.access_token);
  } catch (e) {
    if (e.status === 401 && !retried) {
      const next = await refreshSession(s).catch(() => null);
      if (next) {
        saveSession(next);
        return start(next, true);
      }
    }
    clearSession();
    showLogin(e.status === 401 ? 'หมดเวลาเข้าสู่ระบบ กรุณาเข้าใหม่' : 'โหลดข้อมูลไม่สำเร็จ');
    return;
  }
  if (!records.length) {
    clearSession();
    showLogin('ไม่มีสิทธิ์ดูข้อมูล');
    return;
  }

  // สิทธิ์จริงถูกกรองโดย RLS ฝั่ง server แล้ว ส่วนนี้ใช้กำหนดการแสดงผลเท่านั้น
  profile = s.profile;
  const lvl = profile.level;
  scope = {
    phak: lvl === 'all' ? 'all' : [profile.phak],
    khet: lvl === 'all' || lvl === 'phak' ? 'all' : [profile.khet],
  };
  allRecords = records;
  notes = loadNotes();

  document.getElementById('loginView').hidden = true;
  document.getElementById('app').hidden = false;
  renderScopeBadge();
  populateFilterOptions();
  if (!bindEvents.done) { bindEvents(); bindEvents.done = true; }
  applyFilters();
  renderNotesList();
  openDeepLink();
}

// ?m=<รหัสสมาชิก> เปิดรายละเอียดของสมาชิกคนนั้นทันที (ใช้จากแอป BKK11-YMDGoogleMaps)
function openDeepLink() {
  const m = new URLSearchParams(location.search).get('m');
  if (!m) return;
  history.replaceState(null, '', location.pathname + location.hash);
  const rec = allRecords.find(r => String(r.mt_co) === m);
  if (rec) openDetail(rec);
}

function renderScopeBadge() {
  const badge = document.getElementById('scopeBadge');
  const where = profile.level === 'all' ? LEVEL_LABEL.all : `${LEVEL_LABEL[profile.level]}${profile[profile.level]}`;
  badge.textContent = `${profile.name} · ${where}`;
}

function personId(rec) { return String(rec.mt_co); }

function fullName(rec) {
  return [rec.name_t, rec.saku_t].filter(Boolean).join(' ');
}

function uniqueSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, 'th'));
}

function populateFilterOptions() {
  document.getElementById('sortOrder').value = 'area';
  fillSelect('filterKhet', uniqueSorted(allRecords.map(r => r.sh_nt)), 'เขต: ทั้งหมด');
  fillSelect('filterFa', uniqueSorted(allRecords.map(r => r.fa_nt)), 'ฝ่าย: ทั้งหมด');
  fillSelect('filterPo', uniqueSorted(allRecords.map(r => r.po_nt)), 'ตำแหน่ง: ทั้งหมด');

  // Single-เขต scope: no need to let the user pick a different เขต.
  if (scope.khet !== 'all' && scope.khet.length === 1) {
    const sel = document.getElementById('filterKhet');
    sel.value = scope.khet[0];
    sel.disabled = true;
  }

  updateDependentFilters();
}

// เขต จำกัดตัวเลือกของตำบล และตำบล จำกัดตัวเลือกของหมู่ต่ออีกชั้น
function updateDependentFilters() {
  const khet = document.getElementById('filterKhet').value;
  const khetScoped = khet ? allRecords.filter(r => r.sh_nt === khet) : allRecords;

  const tambonSel = document.getElementById('filterTambon');
  const prevTambon = tambonSel.value;
  const tambonOptions = uniqueSorted(khetScoped.map(r => r.ch_nt));
  fillSelect('filterTambon', tambonOptions, 'ตำบล: ทั้งหมด');
  if (tambonOptions.includes(prevTambon)) tambonSel.value = prevTambon;

  const tambon = tambonSel.value;
  const tambonScoped = tambon ? khetScoped.filter(r => r.ch_nt === tambon) : khetScoped;

  const mooSel = document.getElementById('filterMoo');
  const prevMoo = mooSel.value;
  const mooOptions = uniqueSorted(tambonScoped.map(r => r.ha_nt));
  fillSelect('filterMoo', mooOptions, 'หมู่: ทั้งหมด');
  if (mooOptions.includes(prevMoo)) mooSel.value = prevMoo;
}

function fillSelect(id, values, placeholder) {
  const sel = document.getElementById(id);
  sel.innerHTML = '';
  const opt0 = document.createElement('option');
  opt0.value = '';
  opt0.textContent = placeholder;
  sel.appendChild(opt0);
  for (const v of values) {
    const opt = document.createElement('option');
    opt.value = v;
    opt.textContent = v;
    sel.appendChild(opt);
  }
}

function bindEvents() {
  document.getElementById('searchBox').addEventListener('input', applyFilters);
  ['filterKhet', 'filterTambon'].forEach(id => document.getElementById(id).addEventListener('input', () => {
    updateDependentFilters();
    applyFilters();
  }));
  ['filterMoo', 'filterFa', 'filterPo']
    .forEach(id => document.getElementById(id).addEventListener('input', applyFilters));
  document.getElementById('filterNoPhoto').addEventListener('change', applyFilters);
  document.getElementById('filterHasNote').addEventListener('change', applyFilters);
  document.getElementById('sortOrder').addEventListener('change', applyFilters);
  document.getElementById('resetFilters').addEventListener('click', () => {
    document.getElementById('searchBox').value = '';
    ['filterTambon', 'filterMoo', 'filterFa', 'filterPo'].forEach(id => document.getElementById(id).value = '');
    if (!document.getElementById('filterKhet').disabled) document.getElementById('filterKhet').value = '';
    document.getElementById('filterNoPhoto').checked = false;
    document.getElementById('filterHasNote').checked = false;
    document.getElementById('sortOrder').value = 'area';
    updateDependentFilters();
    applyFilters();
  });
  document.getElementById('modalClose').addEventListener('click', () => document.getElementById('detailModal').close());

  document.getElementById('filterToggle').addEventListener('click', () => {
    setFilterPanelOpen(!document.getElementById('filterPanel').classList.contains('open'));
  });
  document.getElementById('closeFilterPanel').addEventListener('click', () => setFilterPanelOpen(false));
}

function setFilterPanelOpen(open) {
  document.getElementById('filterPanel').classList.toggle('open', open);
  document.getElementById('filterToggle').classList.toggle('open', open);
  document.getElementById('filterToggle').setAttribute('aria-expanded', String(open));
  document.getElementById('filterToggleLabel').textContent = open ? 'ซ่อนตัวกรอง' : 'แสดงตัวกรอง';
}

function applyFilters() {
  const q = document.getElementById('searchBox').value.trim().toLowerCase();
  const khet = document.getElementById('filterKhet').value;
  const tambon = document.getElementById('filterTambon').value;
  const moo = document.getElementById('filterMoo').value;
  const fa = document.getElementById('filterFa').value;
  const po = document.getElementById('filterPo').value;
  const noPhotoOnly = document.getElementById('filterNoPhoto').checked;
  const hasNoteOnly = document.getElementById('filterHasNote').checked;

  const result = allRecords.filter(r => {
    if (khet && r.sh_nt !== khet) return false;
    if (tambon && r.ch_nt !== tambon) return false;
    if (moo && r.ha_nt !== moo) return false;
    if (fa && r.fa_nt !== fa) return false;
    if (po && r.po_nt !== po) return false;
    if (noPhotoOnly && r.pager !== 'ขาดรูปถ่าย') return false;
    if (hasNoteOnly && !notes[personId(r)]?.text) return false;
    if (q && !fullName(r).toLowerCase().includes(q)) return false;
    return true;
  });

  renderCards(result);
  document.getElementById('resultCount').textContent = `พบ ${result.length} จาก ${allRecords.length} คน`;

  const activeCount = [khet, tambon, moo, fa, po].filter(Boolean).length + (noPhotoOnly ? 1 : 0) + (hasNoteOnly ? 1 : 0);
  const countEl = document.getElementById('filterCount');
  countEl.textContent = activeCount;
  countEl.hidden = activeCount === 0;
}

// สระนำ (เ แ โ ใ ไ) เขียนไว้หน้าพยัญชนะ แต่จัดลำดับตามพยัญชนะ จึงต้องขยับตัวอักษร
// ที่ใช้แสดงดัชนี A-Z ให้เป็นพยัญชนะจริงเพื่อให้กลุ่มตรงกับลำดับ localeCompare('th')
const LEADING_VOWELS = new Set(['เ', 'แ', 'โ', 'ใ', 'ไ']);

function firstLetter(rec) {
  const n = fullName(rec).trim();
  if (!n) return '#';
  if (LEADING_VOWELS.has(n[0]) && n[1]) return n[1];
  return n[0];
}

// เมื่อสิทธิ์ถูกจำกัดไว้ที่เขตเดียว (มาจาก url param khet) ไม่ต้องย้ำชื่อเขตซ้ำในแต่ละแถว
function khetIsLocked() {
  return scope.khet !== 'all' && scope.khet.length === 1;
}

// ลำดับภาคเวลาเรียงตามพื้นที่: ภาคบางบอนก่อน แล้วค่อยภาคบางขุนเทียน
const PHAK_ORDER = ['บางบอน', 'บางขุนเทียน'];

function sortRecords(records, mode) {
  if (mode === 'area') {
    return [...records].sort((a, b) => {
      const rankA = PHAK_ORDER.indexOf(a.phak_nt);
      const rankB = PHAK_ORDER.indexOf(b.phak_nt);
      const a2 = rankA === -1 ? PHAK_ORDER.length : rankA;
      const b2 = rankB === -1 ? PHAK_ORDER.length : rankB;
      if (a2 !== b2) return a2 - b2;
      return (
        (a.sh_nt || '').localeCompare(b.sh_nt || '', 'th') ||
        (a.ch_nt || '').localeCompare(b.ch_nt || '', 'th') ||
        (a.ha_nt || '').localeCompare(b.ha_nt || '', 'th') ||
        fullName(a).localeCompare(fullName(b), 'th')
      );
    });
  }
  return [...records].sort((a, b) => fullName(a).localeCompare(fullName(b), 'th'));
}

function renderCards(records) {
  const grid = document.getElementById('cardGrid');
  grid.innerHTML = '';

  if (records.length === 0) {
    grid.innerHTML = '<div class="empty-state">ไม่พบข้อมูลตามเงื่อนไขที่เลือก</div>';
    renderAzIndex([]);
    return;
  }

  const mode = document.getElementById('sortOrder').value;
  const sorted = sortRecords(records, mode);

  const frag = document.createDocumentFragment();
  const indexItems = [];
  let lastKey = null;
  let groupIdx = 0;
  for (const rec of sorted) {
    const key = mode === 'area' ? areaGroupKey(rec) : firstLetter(rec);
    if (key !== lastKey) {
      const id = `group-${groupIdx++}`;
      const label = document.createElement('div');
      label.className = 'letter-label';
      label.id = id;
      label.textContent = mode === 'area' ? areaGroupLabel(rec) : key;
      frag.appendChild(label);
      lastKey = key;
      // ดัชนีด้านขวาไว้กระโดดเฉพาะโหมดตัวอักษร เพราะโหมดพื้นที่มีหัวข้อคั่นแบบเต็มเส้นทางให้ไล่ดูอยู่แล้ว
      if (mode !== 'area') indexItems.push({ label: key, id });
    }
    frag.appendChild(buildCard(rec));
  }
  grid.appendChild(frag);
  renderAzIndex(indexItems);
}

// ป้ายหัวข้อคั่นในโหมดเรียงตามพื้นที่: ภาค[เขต]ตำบล[ค่า]หมู่[ค่า] เต็มเส้นทาง
// (ไม่ใส่เขตซ้ำถ้าสิทธิ์ถูกล็อกไว้ที่เขตเดียวอยู่แล้ว เหมือนที่ทำกับบรรทัดข้อมูลแต่ละแถว)
function areaGroupKey(rec) {
  return [rec.phak_nt, khetIsLocked() ? '' : rec.sh_nt, rec.ch_nt, rec.ha_nt].join('|');
}

function areaGroupLabel(rec) {
  const parts = [`ภาค${rec.phak_nt || '-'}`];
  if (!khetIsLocked()) parts.push(`เขต${rec.sh_nt || '-'}`);
  parts.push(`ตำบล${rec.ch_nt || '-'}`);
  parts.push(`หมู่${rec.ha_nt || '-'}`);
  return parts.join(' ');
}

function renderAzIndex(items) {
  const nav = document.getElementById('azIndex');
  if (!items.length) {
    nav.innerHTML = '';
    return;
  }
  nav.innerHTML = items.map(it =>
    `<button type="button" class="az-item" data-target="${it.id}">${escapeHtml(it.label)}</button>`
  ).join('');
  nav.querySelectorAll('.az-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.target)?.scrollIntoView({ block: 'start' });
    });
  });
}

// ย่อสถานะโงะฮนซนให้สั้น เพื่อรวมไว้ในบรรทัดเดียวกับ pill ฝ่าย จะได้ไม่เพิ่มความสูงของแถว
const GO_SHORT = {
  'เป็นผู้รับโงะฮนซน': 'รับโงะฮนซน',
  'ผู้รับโงะฮนซน': 'รับโงะฮนซน',
  'เป็นผู้ติดตาม': 'ผู้ติดตาม',
};

function buildCard(rec) {
  const el = document.createElement('article');
  el.className = 'friend-row';
  el.addEventListener('click', () => openDetail(rec));

  const note = notes[personId(rec)];

  const locationParts = [];
  if (!khetIsLocked()) locationParts.push(`เขต ${rec.sh_nt || '-'}`);
  locationParts.push(`ตำบล ${rec.ch_nt || '-'}`);
  locationParts.push(`หมู่ ${rec.ha_nt || '-'}`);

  const goShort = GO_SHORT[rec.go_nt] || rec.go_nt || '';
  const faText = [rec.fa_nt, goShort].filter(Boolean).join(' · ');

  el.innerHTML = `
    <div class="friend-info">
      <div class="friend-name">${escapeHtml(fullName(rec))}</div>
      <div class="friend-location">${escapeHtml(locationParts.join(' · '))}</div>
      ${note?.text ? `<div class="badges"><span class="badge badge-note">มีบันทึก</span></div>` : ''}
      ${note?.text ? `<div class="card-note-preview">${escapeHtml(truncate(note.text, 80))}</div>` : ''}
    </div>
    <div class="friend-side">
      ${rec.po_nt ? `<span class="pill pill-role">${escapeHtml(rec.po_nt)}</span>` : ''}
      ${faText ? `<span class="pill pill-fa">${escapeHtml(faText)}</span>` : ''}
    </div>
  `;
  return el;
}

function truncate(s, n) { return s.length > n ? s.slice(0, n) + '…' : s; }

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function openDetail(rec) {
  const id = personId(rec);
  const modal = document.getElementById('detailModal');
  const body = document.getElementById('modalBody');
  const existingNote = notes[id]?.text || '';

  const rows = [
    ['รหัสสมาชิก', rec.mt_co],
    ['รหัสหัวหน้าครอบครัว', rec.amt_co],
    ['เขต', rec.sh_nt],
    ['ตำบล', rec.ch_nt],
    ['หมู่', rec.ha_nt],
    ['ฝ่าย', rec.fa_nt],
    ['ตำแหน่ง', rec.po_nt],
    ['สถานะโงะฮนซน', rec.go_nt],
    ['หมายเหตุระบบ (an_co)', rec.an_co],
    ['รูปถ่าย', rec.pager ? 'ขาดรูปถ่าย' : 'มีรูปถ่าย'],
    ['ชื่อเดิม', rec.name_t_o],
    ['นามสกุลเดิม', rec.saku_t_o],
    ['ไฟล์ต้นทาง', rec.source_file],
  ].filter(([, v]) => v !== null && v !== undefined && v !== '');

  const familyMembers = rec.amt_co == null ? [] : allRecords.filter(r => r.amt_co === rec.amt_co && personId(r) !== id);

  body.innerHTML = `
    <div class="modal-title">${escapeHtml(fullName(rec))}</div>
    <div class="modal-sub">${escapeHtml(rec.po_nt || rec.fa_nt || '')}</div>
    <dl class="detail-grid">
      ${rows.map(([k, v]) => `<dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd>`).join('')}
    </dl>
    ${familyMembers.length ? `
      <div class="family-section">
        <div class="family-title">สมาชิกในครอบครัวเดียวกัน (${familyMembers.length})</div>
        <div class="family-list">
          ${familyMembers.map(m => `
            <button type="button" class="family-item" data-family="${escapeHtml(personId(m))}">
              <span class="family-name">${escapeHtml(fullName(m))}</span>
              <span class="family-role">${escapeHtml(m.po_nt || m.fa_nt || '')}</span>
            </button>
          `).join('')}
        </div>
      </div>
    ` : ''}
    <div class="note-editor">
      <label for="noteText">บันทึกช่วยจำ</label>
      <textarea id="noteText" placeholder="พิมพ์บันทึกสำหรับคนนี้...">${escapeHtml(existingNote)}</textarea>
      <div class="note-editor-actions">
        <button type="button" class="btn-save" id="noteSaveBtn">บันทึก</button>
        <button type="button" class="btn-delete" id="noteDeleteBtn" ${existingNote ? '' : 'disabled'}>ลบบันทึก</button>
      </div>
    </div>
  `;

  body.querySelector('#noteSaveBtn').addEventListener('click', () => {
    const text = body.querySelector('#noteText').value.trim();
    if (!text) { deleteNote(id); } else { saveNote(id, fullName(rec), text); }
    modal.close();
    applyFilters();
    renderNotesList();
  });
  body.querySelector('#noteDeleteBtn').addEventListener('click', () => {
    deleteNote(id);
    modal.close();
    applyFilters();
    renderNotesList();
  });
  body.querySelectorAll('[data-family]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = allRecords.find(r => personId(r) === btn.dataset.family);
      if (target) openDetail(target);
    });
  });

  if (!modal.open) modal.showModal();
}

function loadNotes() {
  try {
    return JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function persistNotes() {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function saveNote(id, name, text) {
  notes[id] = { name, text, updatedAt: Date.now() };
  persistNotes();
}

function deleteNote(id) {
  delete notes[id];
  persistNotes();
}

function renderNotesList() {
  const list = document.getElementById('notesList');
  const entries = Object.entries(notes).sort((a, b) => b[1].updatedAt - a[1].updatedAt);
  document.getElementById('notesCount').textContent = entries.length;

  if (entries.length === 0) {
    list.innerHTML = '<div class="empty-state">ยังไม่มีบันทึก</div>';
    return;
  }

  list.innerHTML = entries.map(([id, n]) => `
    <div class="note-item" data-id="${escapeHtml(id)}">
      <div class="note-item-body">
        <div class="note-item-name" data-jump="${escapeHtml(id)}">${escapeHtml(n.name)}</div>
        <div class="note-item-text">${escapeHtml(n.text)}</div>
        <div class="note-item-time">${new Date(n.updatedAt).toLocaleString('th-TH')}</div>
      </div>
      <button type="button" data-del="${escapeHtml(id)}">ลบ</button>
    </div>
  `).join('');

  list.querySelectorAll('[data-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      deleteNote(btn.dataset.del);
      applyFilters();
      renderNotesList();
    });
  });

  list.querySelectorAll('[data-jump]').forEach(el => {
    el.addEventListener('click', () => {
      const rec = allRecords.find(r => personId(r) === el.dataset.jump);
      if (rec) openDetail(rec);
    });
  });
}
