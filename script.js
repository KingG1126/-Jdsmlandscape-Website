// ---------- logo: new agave inside the Arizona outline ----------
// Draws a replacement logo (same Arizona outline and JDSM LANDSCAPE lettering,
// new centered agave) and points the header and footer logos at it.
(function () {
  const defs = document.querySelector('.desert-defs defs');
  if (!defs || !document.getElementById('jdsm-lockup')) return;
  defs.insertAdjacentHTML('beforeend',
    '<clipPath id="jdsm-no-agave"><path clip-rule="evenodd" d="M-10 -10H300V90H-10Z M32.9 34.3 L44.2 38.6 L52 47.4 L53 58.6 L48.6 66.2 L34.2 71 L32.8 71 L18.2 66 L13.5 58.8 L14.4 47.4 L21.4 38.8Z"/></clipPath>' +
    '<symbol id="jdsm-logo" viewBox="0 0 280 78">' +
    '<use href="#jdsm-lockup" clip-path="url(#jdsm-no-agave)"/>' +
    '<path fill="currentColor" d="M55.50 35.27 L53.51 36.06 L51.77 36.96 L49.83 38.20 L48.14 39.54 L47.00 40.64 L45.66 42.23 L43.17 46.30 L41.63 48.24 L40.24 49.58 L39.00 50.53 L37.86 51.22 L36.46 51.87 L37.51 52.62 L38.80 54.01 L39.50 55.25 L39.89 56.59 L41.53 55.75 L43.12 54.60 L44.47 53.31 L45.51 52.02 L47.00 49.48 L48.89 44.91 L50.98 40.94 L52.82 38.25 L53.96 36.86Z M13.50 35.27 L15.49 37.36 L17.48 40.04 L18.67 42.03 L19.96 44.56 L21.80 48.99 L22.74 50.83 L24.29 53.01 L25.78 54.50 L28.01 56.05 L29.65 56.79 L31.34 57.29 L33.38 57.59 L35.62 57.59 L37.16 57.39 L38.35 57.09 L38.05 56.00 L37.66 55.20 L37.11 54.46 L36.36 53.76 L34.92 52.81 L32.09 51.67 L30.50 50.83 L28.91 49.68 L27.27 48.09 L26.03 46.55 L23.39 42.28 L22.35 40.99 L21.15 39.79 L19.32 38.30 L17.68 37.21 L15.94 36.26Z M49.04 25.33 L46.70 27.12 L44.32 29.45 L42.43 31.79 L40.74 34.52 L40.04 36.01 L39.54 37.46 L38.85 41.08 L38.15 43.47 L36.76 46.60 L35.47 48.69 L36.41 50.08 L38.25 49.09 L39.54 48.04 L40.59 47.00 L41.83 45.41 L43.22 43.12 L43.87 38.40 L44.91 34.13 L45.81 31.59 L46.90 29.11 L47.99 27.02Z M20.01 25.33 L22.10 29.06 L23.14 31.39 L23.84 33.28 L24.83 36.81 L25.28 39.15 L25.73 42.82 L26.08 43.62 L28.01 46.50 L30.05 48.54 L31.64 49.63 L32.79 50.23 L34.48 50.88 L34.87 50.78 L34.87 50.63 L32.44 46.90 L31.19 44.32 L30.30 41.58 L29.46 37.36 L28.76 35.52 L27.52 33.18 L26.22 31.29 L24.39 29.11 L22.15 26.97Z M34.52 19.41 L33.63 23.74 L32.54 30.10 L31.79 35.52 L31.49 38.55 L31.49 39.25 L31.69 40.34 L32.54 43.27 L33.73 45.91 L34.52 47.20 L35.92 44.66 L36.56 43.07 L37.01 41.68 L37.56 39.10 L37.11 34.47 L36.41 29.60Z"/></symbol>');
  document.querySelectorAll('.logo-img use').forEach(function (u) {
    u.setAttribute('href', '#jdsm-logo');
  });
})();

// ---------- mobile nav ----------
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- header shadow on scroll ----------
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 20 ? '0 2px 12px rgba(0,0,0,0.15)' : 'none';
});

// ---------- scroll reveal for service rows ----------
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ---------- contact form ----------
// Quote requests are emailed to jdsmlandscape@gmail.com through Web3Forms (web3forms.com).
//
// ONE-TIME SETUP (2 minutes):
//   1. Go to https://web3forms.com and enter jdsmlandscape@gmail.com
//   2. They email you a free "access key"
//   3. Paste it between the quotes below (done)
const WEB3FORMS_ACCESS_KEY = '4b2fb20a-d293-47e0-8733-e4c0eab8570f';
const BUSINESS_EMAIL = 'jdsmlandscape@gmail.com';
const BUSINESS_PHONE = '(480) 544-3994';

const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = form.querySelector('button[type="submit"]');

function field(name) {
  return form.elements.namedItem(name);
}

function setError(fieldName, message) {
  const row = field(fieldName).closest('.form-row');
  const errorEl = form.querySelector('.form-error[data-for="' + fieldName + '"]');
  if (message) {
    row.classList.add('error');
    if (errorEl) errorEl.textContent = message;
  } else {
    row.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Builds a pre-filled email to the business so a request is never lost,
// even if the form service is unavailable.
function buildMailto(d) {
  const body =
    'Name: ' + d.name + '\n' +
    'Email: ' + d.email + '\n' +
    'Phone: ' + d.phone + '\n' +
    'Service: ' + d.service + '\n\n' +
    d.message;
  return 'mailto:' + BUSINESS_EMAIL +
    '?subject=' + encodeURIComponent('New quote request from ' + d.name) +
    '&body=' + encodeURIComponent(body);
}

function showStatus(text, color) {
  formStatus.style.color = color;
  formStatus.textContent = text;
}

function showFallback(d) {
  formStatus.style.color = '#b3432f';
  formStatus.textContent = 'We couldn\u2019t send that automatically. ';
  const link = document.createElement('a');
  link.href = buildMailto(d);
  link.textContent = 'Click here to email us instead';
  link.style.textDecoration = 'underline';
  formStatus.appendChild(link);
  formStatus.appendChild(document.createTextNode(' or call ' + BUSINESS_PHONE + '.'));
}

// Sends the request to Web3Forms. If the browser blocks the normal reply
// (network / CORS / offline-file quirks), it re-sends in a way that doesn't
// need a readable reply, so the email still goes through.
async function sendRequest(d) {
  const url = 'https://api.web3forms.com/submit';
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: 'New quote request from ' + d.name,
    from_name: 'JDSM Landscape Website',
    name: d.name,
    email: d.email,
    phone: d.phone,
    service: d.service,
    message: d.message
  };

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (networkErr) {
    // Browser couldn't read the reply. Re-send as a simple form post.
    const fd = new FormData();
    Object.keys(payload).forEach(k => fd.append(k, payload[k]));
    await fetch(url, { method: 'POST', mode: 'no-cors', body: fd });
    return; // request was delivered; reply is intentionally unreadable
  }

  let result = {};
  try { result = await response.json(); } catch (parseErr) { /* non-JSON reply */ }

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Request failed (' + response.status + ')');
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formStatus.textContent = '';

  const data = {
    name: field('name').value.trim(),
    email: field('email').value.trim(),
    phone: field('phone').value.trim() || 'Not provided',
    service: field('service').value || 'Not specified',
    message: field('message').value.trim() || 'No details provided'
  };

  let valid = true;

  if (!data.name) {
    setError('name', 'Please enter your name.');
    valid = false;
  } else {
    setError('name', '');
  }

  if (!data.email) {
    setError('email', 'Please enter your email.');
    valid = false;
  } else if (!isValidEmail(data.email)) {
    setError('email', 'That email doesn\u2019t look right.');
    valid = false;
  } else {
    setError('email', '');
  }

  if (!valid) {
    showStatus('Please fix the fields above.', '#b3432f');
    return;
  }

  // Access key not added yet: open a pre-filled email so the request still reaches the business.
  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'PASTE_YOUR_ACCESS_KEY_HERE') {
    showStatus('Opening your email app to send this request\u2026', '#4A6741');
    window.location.href = buildMailto(data);
    return;
  }

  // lock the button so the request can't be double-sent
  const originalLabel = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  showStatus('', '#4A6741');

  try {
    await sendRequest(data);
    showStatus('Thanks, ' + data.name.split(' ')[0] + ' \u2014 we\u2019ll be in touch within one to three business days.', '#4A6741');
    form.reset();
  } catch (err) {
    console.error(err);
    showFallback(data);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
});

// ---------- footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
