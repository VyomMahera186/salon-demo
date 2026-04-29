/* ═══════════════════════════════════════════════════════════════════
   LUXE STUDIO - Premium Salon & Beauty Website
   script.js
   ═══════════════════════════════════════════════════════════════════ */

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── HAMBURGER ── */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
ham.addEventListener('click', () => mob.classList.toggle('open'));
function closeMobile() { mob.classList.remove('open'); }

/* ── INTERSECTION OBSERVER ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => observer.observe(el));

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const isDecimal = el.dataset.decimal === 'true';
  const suffix = el.dataset.suffix || (el.closest('.stat')?.querySelector('.stat-label')?.textContent === 'Happy Clients' ? '+' : el.closest('.stat')?.querySelector('.stat-label')?.textContent === 'Years Active' ? '+' : '');
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val = isDecimal ? (ease * target / 10).toFixed(1) : Math.round(ease * target);
    el.textContent = val + (suffix || '');
    if (t < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = 'true';
      // Add appropriate suffix based on position
      const label = e.target.closest('.stat')?.querySelector('.stat-label')?.textContent;
      if (label === 'Happy Clients') e.target.dataset.suffix = '+';
      else if (label === 'Years Active') e.target.dataset.suffix = '+';
      else if (label === 'Rating') { e.target.dataset.suffix = '★'; e.target.dataset.decimal = 'true'; }
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ── FORM SUBMIT ── */
function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const service = form.service.value.trim();
  const message = form.message.value.trim();

  // Build message
  const text = `Hi, I just filled your form:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Service: ${service}
Message: ${message}`;

  const encodedText = encodeURIComponent(text);

  // 🔴 CHANGE THIS TO YOUR NUMBER
  const whatsappNumber = "919876543210";

  // Open WhatsApp
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank");

  // UI feedback
  const btn = form.querySelector('.form-submit');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#2d6a2d';
  btn.style.color = '#fff';

  setTimeout(() => {
    btn.textContent = 'Send Message ✦';
    btn.style.background = '';
    btn.style.color = '';
    form.reset();
  }, 3000);
}

/* ── SMOOTH SCROLL OFFSET ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ── STAGGER CHILDREN ON VISIBLE ── */
document.querySelectorAll('.services-grid, .testimonials-grid').forEach(grid => {
  const gridObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      grid.querySelectorAll('.service-card, .testimonial-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 100);
      });
      gridObserver.disconnect();
    }
  }, { threshold: 0.1 });
  gridObserver.observe(grid);
});



const select = document.getElementById("serviceSelect");
const selected = select.querySelector(".select-selected");
const options = select.querySelectorAll(".select-options div");
const hiddenInput = document.getElementById("serviceInput");

// Toggle dropdown
selected.addEventListener("click", () => {
  select.classList.toggle("open");
});

// Select option
options.forEach(option => {
  option.addEventListener("click", () => {
    selected.textContent = option.textContent;
    hiddenInput.value = option.dataset.value;
    select.classList.remove("open");
  });
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!select.contains(e.target)) {
    select.classList.remove("open");
  }
});