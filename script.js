// =====================
// ✅ DEV MODE (para testar desbloqueado)
// =====================
const DEV_MODE = false; // coloque true para ver o site liberado agora

// =====================
// 🔒 BLOQUEIO POR DATA
// =====================
const lockScreen = document.getElementById("lockScreen");
const siteContent = document.getElementById("siteContent");
const unlockMsg = document.getElementById("unlockMsg");

function isValentineDay() {
  if (DEV_MODE) return true;
  const now = new Date();
  return now.getDate() === 14 && now.getMonth() === 1; // 14/02
}

if (unlockMsg) unlockMsg.textContent = "Desbloqueia em 14/02 💘";

if (isValentineDay()) {
  lockScreen.style.display = "none";
  siteContent.style.display = "block";
}

// =====================
// ⏳ CRONÔMETROS (lock e site)
// =====================
function getNextValentine() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 1, 14, 0, 0, 0);
  if (now > target) target = new Date(now.getFullYear() + 1, 1, 14, 0, 0, 0);
  return target;
}

const target = getNextValentine();

// lock ids
const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");

// site ids
const d2 = document.getElementById("d2");
const h2 = document.getElementById("h2");
const m2 = document.getElementById("m2");
const s2 = document.getElementById("s2");

function tick() {
  const now = new Date();
  const diff = target - now;

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  // atualiza lock (se existir)
  if (dEl) dEl.textContent = days;
  if (hEl) hEl.textContent = hours;
  if (mEl) mEl.textContent = mins;
  if (sEl) sEl.textContent = secs;

  // atualiza site (se existir)
  if (d2) d2.textContent = days;
  if (h2) h2.textContent = hours;
  if (m2) m2.textContent = mins;
  if (s2) s2.textContent = secs;
}

tick();
setInterval(tick, 1000);

// =====================
// 💖 CORAÇÕES
// =====================
const heartsLayer = document.querySelector(".hearts");
const heartChars = ["💖","💘","💕","💗","💓","❤️"];

function spawnHeart() {
  if (!heartsLayer) return;

  const el = document.createElement("div");
  el.className = "heart";
  el.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];

  const left = Math.random() * 100;           // vw
  const duration = 4 + Math.random() * 5;     // s
  const size = 14 + Math.random() * 18;       // px
  const drift = (Math.random() * 120 - 60);   // px

  el.style.left = left + "vw";
  el.style.animationDuration = duration + "s";
  el.style.fontSize = size + "px";
  el.style.setProperty("--drift", drift.toFixed(0) + "px");

  heartsLayer.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000);
}

// chuva leve sempre
setInterval(spawnHeart, 420);

// explosão
function burstHearts(strength = 45) {
  for (let i = 0; i < strength; i++) {
    setTimeout(spawnHeart, i * 35);
  }
}

// surpresa no bloqueio
const surpriseLock = document.getElementById("surpriseLock");
if (surpriseLock) surpriseLock.addEventListener("click", () => burstHearts(70));

// surpresa no site
const surprise = document.getElementById("surprise");
if (surprise) surprise.addEventListener("click", () => burstHearts(70));

// =====================
// 💌 MODAL DA CARTA (apenas no site)
// =====================
const modal = document.getElementById("modal");
const openLetter = document.getElementById("openLetter");
const closeModal = document.getElementById("closeModal");
const closeBtn = document.getElementById("closeBtn");

function openModalFn() {
  if (!modal) return;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}
function closeModalFn() {
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

if (openLetter) openLetter.addEventListener("click", openModalFn);
if (closeModal) closeModal.addEventListener("click", closeModalFn);
if (closeBtn) closeBtn.addEventListener("click", closeModalFn);

// =====================
// 🎯 BOTÕES SIM/NÃO (troll robusto)
// =====================
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");

if (yesBtn && hint) {
  yesBtn.addEventListener("click", () => {
    hint.textContent = "Então é oficial 😌💖";
    burstHearts(90);
    yesBtn.disabled = true;
    yesBtn.textContent = "Confirmado 💘";
    yesBtn.style.opacity = "0.85";
  });
}

function moveNoButton() {
  if (!noBtn) return;
  const x = Math.random() * 140 - 70; // -70..70
  const y = Math.random() * 90 - 45;  // -45..45
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

if (noBtn && hint) {
  // desktop
  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("mouseover", moveNoButton);

  // mobile
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
    hint.textContent = "😅 esse botão tá escapando…";
  }, { passive: false });

  // click fallback
  noBtn.addEventListener("click", () => {
    moveNoButton();
    hint.textContent = "👀 tenta o outro 😌";
  });
}
