/* Theme (light/dark) and the language menu. No cookies, no tracking: the choice is kept in localStorage only. */
(function () {
  var root = document.documentElement;
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('teatroo-theme', t); } catch (e) {}
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () { setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); });
    b.setAttribute('aria-label', root.getAttribute('data-theme') === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  });
  document.querySelectorAll('[data-lang-toggle]').forEach(function (b) {
    var menu = b.parentNode.querySelector('.lang-menu');
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.hasAttribute('hidden');
      document.querySelectorAll('.lang-menu').forEach(function (m) { m.setAttribute('hidden', ''); });
      document.querySelectorAll('[data-lang-toggle]').forEach(function (x) { x.setAttribute('aria-expanded', 'false'); });
      if (open) { menu.removeAttribute('hidden'); b.setAttribute('aria-expanded', 'true'); }
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.lang-menu').forEach(function (m) { m.setAttribute('hidden', ''); });
    document.querySelectorAll('[data-lang-toggle]').forEach(function (x) { x.setAttribute('aria-expanded', 'false'); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('.lang-menu').forEach(function (m) { m.setAttribute('hidden', ''); });
  });
})();
