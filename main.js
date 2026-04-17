/* =============================================
   RAJEEV SWAMI — PORTFOLIO JAVASCRIPT
   Navbar | Typing | Reveal | Skills | Form
   ============================================= */

/* ---- EMAILJS INIT ---- */
// Replace these with your real EmailJS keys after setup
var EMAILJS_SERVICE_ID = 'service_dcu9314';
var EMAILJS_TEMPLATE_ID = 'template_ka2ug4x';
var EMAILJS_PUBLIC_KEY = 'Nsp3sFRGDcqH-fliw';

try {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
} catch (e) { console.warn('EmailJS not loaded', e); }

/* ---- NAVBAR ---- */
var nav = document.getElementById('nav');
var hbg = document.getElementById('hbg');
var navlinks = document.getElementById('navlinks');

window.addEventListener('scroll', function () {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('btt').classList.toggle('show', window.scrollY > 400);
  setActiveLink();
});

hbg.addEventListener('click', function () {
  hbg.classList.toggle('open');
  navlinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    hbg.classList.remove('open');
    navlinks.classList.remove('open');
  });
});

function setActiveLink() {
  var sy = window.scrollY + 100;
  document.querySelectorAll('section[id]').forEach(function (sec) {
    var lnk = document.querySelector('.nav-links a[href="#' + sec.id + '"]');
    if (lnk) {
      lnk.classList.toggle('active', sy >= sec.offsetTop && sy < sec.offsetTop + sec.offsetHeight);
    }
  });
}

/* ---- BACK TO TOP ---- */
document.getElementById('btt').addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var href = anchor.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 65,
        behavior: 'smooth'
      });
    }
  });
});

/* ---- TYPING EFFECT ---- */
var typedEl = document.getElementById('typed');
var phrases = [
  'Django Full Stack Developer',
  'Python Backend Engineer',
  'REST API Builder',
  'Problem Solver'
];
var phraseIndex = 0;
var charIndex = 0;
var isDeleting = false;

function typeWriter() {
  var current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, --charIndex);
  } else {
    typedEl.textContent = current.substring(0, ++charIndex);
  }

  var delay = isDeleting ? 50 : 95;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeWriter, delay);
}

setTimeout(typeWriter, 1000);

/* ---- SCROLL REVEAL ---- */
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var siblings = [].slice.call(
        entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
      );
      var delay = siblings.indexOf(entry.target) * 80;
      setTimeout(function () {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});

/* ---- SKILL BARS ---- */
var skillObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var target = entry.target;
      var width = target.getAttribute('data-w');
      setTimeout(function () {
        target.style.width = width + '%';
      }, 200);
      skillObserver.unobserve(target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.sk-fill').forEach(function (el) {
  skillObserver.observe(el);
});

/* ---- CONTACT FORM — EMAILJS ---- */
document.getElementById('cf').addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear errors
  document.getElementById('nerr').textContent = '';
  document.getElementById('eerr').textContent = '';
  document.getElementById('merr').textContent = '';
  document.getElementById('fsuccess').style.display = 'none';
  document.getElementById('fsenderror').style.display = 'none';

  var name = document.getElementById('uname').value.trim();
  var email = document.getElementById('uemail').value.trim();
  var message = document.getElementById('umsg').value.trim();
  var valid = true;

  if (name.length < 2) {
    document.getElementById('nerr').textContent = 'Please enter your full name.';
    valid = false;
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('eerr').textContent = 'Please enter a valid email address.';
    valid = false;
  }

  if (message.length < 10) {
    document.getElementById('merr').textContent = 'Message must be at least 10 characters.';
    valid = false;
  }

  if (valid) {
    var btn = document.getElementById('cf-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    var templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_email: 'rajeevswami056@gmail.com'
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(function () {
        var success = document.getElementById('fsuccess');
        success.style.display = 'flex';
        e.target.reset();
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        setTimeout(function () { success.style.display = 'none'; }, 5000);
      })
      .catch(function (err) {
        console.error('EmailJS error:', err);
        document.getElementById('fsenderror').style.display = 'flex';
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
      });
  }
});
