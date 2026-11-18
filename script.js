/* ============================================================
   سوير (SAR) — shared interactions
   ============================================================ */

(function () {
  'use strict';

  /* Mobile navigation toggle */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  function setOpen(open) {
    if (!nav || !toggle) { return; }
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });

    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        setOpen(false);
      });
    }
  }

  /* Current year in footer */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }

  /* Product category filtering */
  var chips = document.querySelectorAll('.chip');
  var products = document.querySelectorAll('.product-card');

  function applyFilter(cat) {
    for (var i = 0; i < products.length; i++) {
      var p = products[i];
      var match = cat === 'all' || p.getAttribute('data-cat') === cat;
      p.classList.toggle('is-hidden', !match);
    }
  }

  for (var j = 0; j < chips.length; j++) {
    (function (chip) {
      chip.addEventListener('click', function () {
        for (var k = 0; k < chips.length; k++) {
          chips[k].classList.toggle('is-active', chips[k] === chip);
        }
        applyFilter(chip.getAttribute('data-cat') || 'all');
      });
    })(chips[j]);
  }

  /* Contact form feedback (no backend) */
  var form = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('is-hidden');
      if (formSuccess) { formSuccess.hidden = false; }
    });
  }
})();
