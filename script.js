/* ═══════════════════════════════════════════
   FAUSTINA BIRTHDAY — app.js
   ═══════════════════════════════════════════ */

/* ── AUDIO ── */
const music = document.getElementById('bg-music');
let muted = false;

music.play().catch(() => {});
document.addEventListener('click', () => music.play().catch(() => {}), { once: true });

function toggleMute() {
  muted = !muted;
  music.muted = muted;
  document.getElementById('mute-btn').textContent = muted ? 'Unmute' : 'Mute';
}

/* ── TYPEWRITER ── */
const TYPEWRITER_TEXT = `  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga consequatur quibusdam voluptas veniam saepe unde blanditiis eius omnis, adipisci aperiam pariatur ullam est earum eveniet quae voluptate totam dolore quo?
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi cupiditate laboriosam distinctio veritatis. Incidunt cupiditate quia laboriosam quae delectus aperiam eaque distinctio, non quo repellat ipsa nobis blanditiis omnis eos.
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam nulla nam quibusdam accusantium iure aut cum obcaecati dolor ipsa rerum nihil tempora, maxime asperiores provident amet deleniti corporis, optio magni?`;
const TYPEWRITER_SIG  = `— Written with all the love in the world, from your biggest fan - Osagie Faith`;

let typewriterDone = false;

function runTypewriter() {
  if (typewriterDone) return;
  typewriterDone = true;

  const textEl = document.getElementById('typewriter-text');
  const sigEl  = document.getElementById('typewriter-sig');
  textEl.innerHTML = '';
  sigEl.innerHTML  = '';

  // Add blinking cursor to active element
  let i = 0;
  const speed = 28; // ms per character

  function typeChar() {
    if (i < TYPEWRITER_TEXT.length) {
      textEl.textContent += TYPEWRITER_TEXT[i];
      textEl.classList.add('typing-cursor');
      i++;
      setTimeout(typeChar, speed);
    } else {
      // Main text done — pause then type signature
      textEl.classList.remove('typing-cursor');
      setTimeout(typeSig, 400);
    }
  }

  let j = 0;
  function typeSig() {
    if (j < TYPEWRITER_SIG.length) {
      sigEl.textContent += TYPEWRITER_SIG[j];
      sigEl.classList.add('typing-cursor');
      j++;
      setTimeout(typeSig, 32);
    } else {
      sigEl.classList.remove('typing-cursor');
    }
  }

  // Small delay after section fades in before typing starts
  setTimeout(typeChar, 600);
}
//   Watches which section is in the viewport and adds .is-active,
//  which triggers all .anim / .anim-left / .anim-right children.
//   Also marks the matching nav dot. */
const SECTION_IDS = ['hero','message','gallery','funfacts','surprise','wishes','timeline','finale'];
const sections    = SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean);
const dots        = document.querySelectorAll('.dot');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const sec = entry.target;

    // Activate section (triggers CSS animations)
    sec.classList.add('is-active');

    // Typewriter effect for message section
    if (sec.id === 'message') runTypewriter();

    // Update nav dot
    const idx = SECTION_IDS.indexOf(sec.id);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));

    // Fire confetti on finale entry
    if (sec.id === 'finale') setTimeout(bigConfetti, 400);
  });
}, {
  root: document.body,
  threshold: 0,
  rootMargin: '0px 0px -10% 0px'
});

sections.forEach(s => sectionObs.observe(s));

// Hero activates immediately (it's visible on load)
document.getElementById('hero')?.classList.add('is-active');

/* ── NAV DOT CLICK ── */
function scrollToSection(id) {
  const el = document.querySelector(id);
  if (!el) return;
  document.body.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
}

/* ── CONFETTI ENGINE ── */
const canvas = document.getElementById('confetti-canvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const COLORS = ['#FFBF9B','#F4845F','#FFE5D4','#C07D56','#FFD4B8','#FF9F7A','#FFF0E8','#FFFFFF'];
let particles = [];

function makeParticle(x, y) {
  return {
    x, y,
    vx:       (Math.random() - 0.5) * 7,
    vy:       Math.random() * -9 - 2,
    size:     Math.random() * 9 + 4,
    color:    COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * 360,
    rotV:     (Math.random() - 0.5) * 11,
    shape:    Math.random() > 0.5 ? 'rect' : 'circle',
    life:     1,
  };
}

function burst(x, y, count) {
  for (let i = 0; i < count; i++) particles.push(makeParticle(x, y));
}

function bigConfetti() {
  for (let i = 0; i < 7; i++) {
    setTimeout(() => {
      burst(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.5, 45);
    }, i * 110);
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0.01);
  particles.forEach(p => {
    p.x  += p.vx;
    p.vy += 0.22;
    p.y  += p.vy;
    p.rotation += p.rotV;
    p.life -= 0.011;
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    if (p.shape === 'rect') {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

// Initial load burst
setTimeout(bigConfetti, 1100);

/* ── SCRATCH CARD ── */
const scratchCanvas = document.getElementById('scratch-canvas');
const sCtx          = scratchCanvas.getContext('2d');
scratchCanvas.width  = 320;
scratchCanvas.height = 200;

// Draw peach cover
const grad = sCtx.createLinearGradient(0, 0, 320, 200);
grad.addColorStop(0, '#FFD4B8');
grad.addColorStop(1, '#F4845F');
sCtx.fillStyle = grad;
sCtx.fillRect(0, 0, 320, 200);
sCtx.fillStyle = 'rgba(255,255,255,0.18)';
sCtx.font = 'bold 17px DM Sans';
sCtx.textAlign = 'center';
sCtx.fillText('✦ Scratch here ✦', 160, 92);
sCtx.font = '13px DM Sans';
sCtx.fillText('A message waits for you 🌸', 160, 118);

sCtx.globalCompositeOperation = 'destination-out';
let scratching = false;
let revealed   = false;

function getPos(e, el) {
  const r   = el.getBoundingClientRect();
  const src = e.touches ? e.touches[0] : e;
  return { x: src.clientX - r.left, y: src.clientY - r.top };
}

function scratch(e) {
  if (!scratching) return;
  const p = getPos(e, scratchCanvas);
  sCtx.beginPath();
  sCtx.arc(p.x, p.y, 30, 0, Math.PI * 2);
  sCtx.fill();

  if (!revealed) {
    const data  = sCtx.getImageData(0, 0, 320, 200).data;
    const total = 320 * 200 * 4;
    let transparent = 0;
    for (let i = 3; i < total; i += 4) if (data[i] < 128) transparent++;
    if (transparent / (total / 4) > 0.55) {
      revealed = true;
      scratchCanvas.style.transition = 'opacity 0.9s';
      scratchCanvas.style.opacity    = '0';
      document.getElementById('scratch-hint').textContent = '🌸 Revealed!';
      burst(window.innerWidth / 2, window.innerHeight * 0.5, 90);
    }
  }
}

scratchCanvas.addEventListener('mousedown',  ()  => { scratching = true; });
window.addEventListener('mouseup',           ()  => { scratching = false; });
scratchCanvas.addEventListener('mousemove',  (e) => scratch(e));
scratchCanvas.addEventListener('touchstart', (e) => { scratching = true; e.preventDefault(); }, { passive: false });
scratchCanvas.addEventListener('touchend',   ()  => { scratching = false; });
scratchCanvas.addEventListener('touchmove',  (e) => { scratch(e); e.preventDefault(); }, { passive: false });