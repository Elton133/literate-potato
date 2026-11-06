(function () {
  const S = window.SITE;
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ── PAGE META ──────────────────────────────────────────────────
  document.title = S.name + ' | Official Site';
  $('pageTitle').textContent = S.name + ' | Official Site';
  $('brand').textContent = S.name;
  $('footerBrand').textContent = S.name;
  $('heroName').textContent = S.name;
  $('tagline').textContent = S.tagline;
  $('copy').textContent = `© ${new Date().getFullYear()} ${S.name}. All rights reserved.`;

  if (S.heroImage) $('heroImg').style.backgroundImage = `url(${S.heroImage})`;
  if (S.portrait) $('portrait').style.backgroundImage = `url(${S.portrait})`;

  $('storyText').innerHTML = S.story.map(p => `<p>${esc(p)}</p>`).join('');
  $('pressLink').href = S.pressKit;

  // ── NAV SCROLL EFFECT ──────────────────────────────────────────
  const navbar = $('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── MOBILE HAMBURGER ───────────────────────────────────────────
  const hamburger = $('hamburger');
  const navLinks = $('navLinks');
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ── PARTICLES ─────────────────────────────────────────────────
  const particleContainer = $('particles');
  const PARTICLE_COUNT = 30;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const span = document.createElement('span');
    const size = Math.random() * 2.5 + 1;
    span.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 20}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 10 + 8}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: 0;
    `;
    particleContainer.appendChild(span);
  }

  // ── SCROLL REVEAL ─────────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${(i % 4) * 0.1}s`;
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

  // ── COUNTER ANIMATION ─────────────────────────────────────────
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        const duration = 1800;
        const start = performance.now();
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * ease);
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target;
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

  // ── STREAMING LINKS ───────────────────────────────────────────
  $('streaming').innerHTML = S.streaming.map(a =>
    `<a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.label)}</a>`
  ).join('');

  // ── VIDEO ─────────────────────────────────────────────────────
  if (S.videoEmbed) {
    $('video').innerHTML = `<iframe src="${esc(S.videoEmbed)}" title="Music Video" allowfullscreen loading="lazy"></iframe>`;
  }

  // ── SOCIALS ───────────────────────────────────────────────────
  $('socials').innerHTML = S.socials.map(a =>
    `<a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.label)}</a>`
  ).join('');

  // ── GALLERY ───────────────────────────────────────────────────
  if (S.gallery && S.gallery.length) {
    $('gallery').hidden = false;
    $('galleryGrid').innerHTML = S.gallery.map(src =>
      `<img src="${esc(src)}" alt="" loading="lazy">`
    ).join('');
  }

  // ── SHOWS ─────────────────────────────────────────────────────
  const today = new Date(new Date().toDateString());
  const upcoming = (S.shows || []).filter(s => new Date(s.date) >= today);
  if (!upcoming.length) {
    $('showList').innerHTML = `<li class="show-none">No dates announced yet. Join the newsletter below to be the first to know, or book me for your event.</li>`;
  } else {
    $('showList').innerHTML = upcoming.map(s => {
      const d = new Date(s.date + 'T12:00:00');
      const day = d.getDate();
      const month = d.toLocaleString('en', { month: 'short', year: 'numeric' });
      const action = s.status === 'sold-out'
        ? `<span class="tag">Sold Out</span>`
        : s.status === 'free'
          ? `<span class="tag">Free Entry</span>`
          : `<a class="btn btn-primary" href="${esc(s.ticketUrl)}" target="_blank" rel="noopener" style="font-size:.85rem;padding:.55rem 1.2rem">Get Tickets</a>`;
      return `<li class="show-item">
        <div class="show-date">
          <div class="show-day">${day}</div>
          <div class="show-month">${month}</div>
        </div>
        <div>
          <div class="show-venue">${esc(s.venue)}</div>
          <div class="show-city">${esc(s.city)}</div>
        </div>
        ${action}
      </li>`;
    }).join('');
  }

  // ── AUDIO PLAYER ──────────────────────────────────────────────
  const audio = $('audio');
  const playBtn = $('playBtn');
  const playIcon = $('playIcon');
  const prevBtn = $('prevBtn');
  const nextBtn = $('nextBtn');
  const nowTitle = $('nowTitle');
  const progressFill = $('progressFill');
  const currentTimeEl = $('currentTime');
  const totalTimeEl = $('totalTime');
  const vinyl = document.querySelector('.player-vinyl');
  let cur = -1;

  const PLAY_SVG = `<polygon points="5,3 19,12 5,21"/>`;
  const PAUSE_SVG = `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`;

  // Build tracklist
  $('tracklist').innerHTML = (S.tracks || []).map((t, i) =>
    `<li><button data-i="${i}">
      <span class="track-num">${i + 1}</span>
      <span class="track-title">${esc(t.title)}</span>
      <small>${esc(t.year)}</small>
    </button></li>`
  ).join('');

  function formatTime(sec) {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = String(Math.floor(sec % 60)).padStart(2, '0');
    return `${m}:${s}`;
  }

  function loadTrack(i) {
    if (!S.tracks || !S.tracks[i]) return;
    cur = i;
    audio.src = S.tracks[i].file;
    nowTitle.textContent = S.tracks[i].title;
    document.querySelectorAll('.tracklist button').forEach((b, j) =>
      b.classList.toggle('on', j === i)
    );
    progressFill.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    totalTimeEl.textContent = '0:00';
  }

  $('tracklist').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    loadTrack(+btn.dataset.i);
    audio.play().catch(() => { });
  });

  playBtn.addEventListener('click', () => {
    if (cur < 0) loadTrack(0);
    audio.paused ? audio.play().catch(() => { }) : audio.pause();
  });

  prevBtn.addEventListener('click', () => {
    if (cur > 0) { loadTrack(cur - 1); audio.play().catch(() => { }); }
  });

  nextBtn.addEventListener('click', () => {
    if (S.tracks && cur < S.tracks.length - 1) { loadTrack(cur + 1); audio.play().catch(() => { }); }
  });

  audio.addEventListener('play', () => {
    playIcon.innerHTML = PAUSE_SVG;
    vinyl.classList.add('spinning');
  });
  audio.addEventListener('pause', () => {
    playIcon.innerHTML = PLAY_SVG;
    vinyl.classList.remove('spinning');
  });
  audio.addEventListener('ended', () => {
    if (S.tracks && cur + 1 < S.tracks.length) { loadTrack(cur + 1); audio.play(); }
    else { vinyl.classList.remove('spinning'); playIcon.innerHTML = PLAY_SVG; }
  });
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = pct + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
    totalTimeEl.textContent = formatTime(audio.duration);
  });

  $('progressBar') && $('progressBar').addEventListener('click', e => {
    if (!audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  });

  // ── BOOKING FORM ──────────────────────────────────────────────
  const formStatus = $('formStatus');
  $('bookForm').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.style.color = '#f87171';
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    if (S.bookingEndpoint) {
      try {
        const r = await fetch(S.bookingEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        });
        if (!r.ok) throw 0;
        form.reset();
        formStatus.textContent = '✓ Request sent! I will reply within 48 hours.';
        formStatus.style.color = 'var(--success)';
      } catch {
        formStatus.textContent = 'Could not send. Please email ' + S.email + ' directly.';
        formStatus.style.color = '#f87171';
      }
    } else {
      const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
      location.href = `mailto:${S.email}?subject=${encodeURIComponent('Booking request: ' + data.type)}&body=${encodeURIComponent(body)}`;
      formStatus.textContent = 'Your email app should open with the request ready.';
      formStatus.style.color = 'var(--success)';
    }
  });

  // ── NEWSLETTER ────────────────────────────────────────────────
  $('newsletter').addEventListener('submit', e => {
    e.preventDefault();
    e.target.innerHTML = '<p style="color:var(--success);text-align:center">✓ You\'re on the list! Welcome aboard.</p>';
  });

})();
