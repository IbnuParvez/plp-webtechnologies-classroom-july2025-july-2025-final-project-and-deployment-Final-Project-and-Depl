/* Navigation toggle + footer year + form validation */
document.addEventListener('DOMContentLoaded', () => {
  // Year stamp
  const y = new Date().getFullYear();
  ['year','year-about','year-contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = y;
  });

  // Nav toggle
  const navToggle = document.querySelectorAll('.nav-toggle');
  navToggle.forEach(btn => {
    btn.addEventListener('click', ()=> {
      const nav = document.getElementById('primary-nav');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  });

  // Simple form validation
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = [
        { id: 'name', checks: [v=> v.trim().length>=2 || 'Name must be at least 2 characters']},
        { id: 'email', checks: [v=> /\S+@\S+\.\S+/.test(v) || 'Enter a valid email']},
        { id: 'message', checks: [v=> v.trim().length>=10 || 'Message must be at least 10 characters']},
      ];

      let valid = true;
      fields.forEach(f => {
        const el = document.getElementById(f.id);
        const errEl = el.nextElementSibling;
        errEl.textContent = '';
        for (const check of f.checks) {
          const res = check(el.value);
          if (res !== true) {
            errEl.textContent = res;
            valid = false;
            break;
          }
        }
      });

      const status = document.getElementById('formStatus');
      if (!valid) {
        status.textContent = 'Please fix the errors above.';
        status.style.color = '#b00020';
        return;
      }

      // Simulate sending — for production wire up to Netlify Forms, Formspree, or your own endpoint
      status.textContent = 'Sending…';
      status.style.color = '';
      setTimeout(() => {
        status.textContent = 'Thanks! Your message was sent.';
        form.reset();
      }, 900);
    });
  }
});
