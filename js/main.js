/* ==========================================================================
   Yash Maurya — Portfolio interactions
   Reveal system · nav · parallax · magnetic buttons · tilt · timeline ·
   counters · carousel · contact form. No dependencies.
   ========================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Navigation ---------- */
  var nav = document.getElementById('siteNav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    var open = nav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* Active link highlighting */
  var sections = document.querySelectorAll('main section[id]');
  var linkFor = {};
  navLinks.querySelectorAll('a').forEach(function (a) {
    linkFor[a.getAttribute('href').slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.querySelectorAll('a.active').forEach(function (a) { a.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* ---------- Scroll-driven bits (rAF-throttled) ---------- */
  var toTop = document.getElementById('toTop');
  var tlProgress = document.getElementById('tlProgress');
  var timeline = document.getElementById('timeline');
  var desktopTimeline = window.matchMedia('(min-width: 861px)');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      nav.classList.toggle('scrolled', y > 10);
      toTop.classList.toggle('show', y > 700);

      /* timeline line fills as you scroll through it (vertical layout only) */
      if (tlProgress && desktopTimeline.matches) {
        var rect = timeline.getBoundingClientRect();
        var vh = window.innerHeight;
        var total = rect.height;
        var passed = Math.min(Math.max(vh * 0.75 - rect.top, 0), total);
        tlProgress.style.setProperty('--p', (passed / total).toFixed(4));
      }
      ticking = false;
    });
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: motionOK ? 'smooth' : 'auto' });
  });

  /* ---------- Reveal on scroll + stagger ---------- */
  var staggerGroups = [
    '.skill-tiles', '.projects-grid', '.services-grid',
    '.certs-grid', '.stats-row'
  ];
  staggerGroups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (grid) {
      Array.prototype.forEach.call(grid.children, function (el, i) {
        el.style.setProperty('--d', (i * 90) + 'ms');
      });
    });
  });

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (!target || !motionOK) { el.textContent = target; return; }
    var start = null;
    var duration = 1300;
    function step(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var revealEls = document.querySelectorAll('.reveal, .tl-item');
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('in');
        el.querySelectorAll('.count').forEach(countUp);
        revealIO.unobserve(el);
        /* once settled, drop the reveal class so hover transitions
           aren't slowed by the reveal's duration + stagger delay */
        var delay = parseFloat(el.style.getPropertyValue('--d')) || 0;
        setTimeout(function () { el.classList.remove('reveal'); }, delay + 750);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('in');
      el.querySelectorAll('.count').forEach(countUp);
    });
  }

  /* ---------- Mouse parallax (hero chips, orbs) ---------- */
  if (motionOK && finePointer) {
    var depthEls = Array.prototype.slice.call(document.querySelectorAll('[data-depth]'));
    var targetX = 0, targetY = 0, curX = 0, curY = 0, rafId = null;

    document.addEventListener('mousemove', function (e) {
      targetX = (e.clientX / window.innerWidth) - 0.5;
      targetY = (e.clientY / window.innerHeight) - 0.5;
      if (rafId === null) rafId = requestAnimationFrame(tick);
    }, { passive: true });

    function tick() {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      depthEls.forEach(function (el) {
        var d = parseFloat(el.getAttribute('data-depth')) || 0;
        el.style.transform = 'translate3d(' + (curX * d) + 'px,' + (curY * d) + 'px,0)';
      });
      if (Math.abs(targetX - curX) + Math.abs(targetY - curY) > 0.001) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }
  }

  /* ---------- Cursor spotlight on cards (glow only, no movement) ---------- */
  if (finePointer) {
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* ---------- Testimonial carousel ---------- */
  var track = document.getElementById('carouselTrack');
  if (track) {
    var slides = track.children;
    var dotsWrap = document.getElementById('cDots');
    var current = 0;
    var timer = null;

    for (var i = 0; i < slides.length; i++) {
      (function (idx) {
        var dot = document.createElement('button');
        dot.className = 'c-dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Show testimonial ' + (idx + 1));
        dot.addEventListener('click', function () { goTo(idx); restart(); });
        dotsWrap.appendChild(dot);
      })(i);
    }
    var dots = dotsWrap.children;

    function goTo(idx) {
      current = (idx + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      for (var j = 0; j < dots.length; j++) {
        dots[j].classList.toggle('active', j === current);
      }
    }
    function restart() {
      if (!motionOK) return;
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 6000);
    }

    document.getElementById('cPrev').addEventListener('click', function () { goTo(current - 1); restart(); });
    document.getElementById('cNext').addEventListener('click', function () { goTo(current + 1); restart(); });

    var carousel = document.getElementById('carousel');
    carousel.addEventListener('mouseenter', function () { clearInterval(timer); });
    carousel.addEventListener('mouseleave', restart);
    carousel.addEventListener('focusin', function () { clearInterval(timer); });
    carousel.addEventListener('focusout', restart);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { clearInterval(timer); } else { restart(); }
    });
    restart();
  }

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
