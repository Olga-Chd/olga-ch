(function () {
  const progress = document.querySelector('.top-progress');
  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuIcon = document.querySelector('.menu-icon');

  function updateProgress() {
    if (!progress) return;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    progress.style.width = `${percent}%`;
  }

  function setMenu(open) {
    if (!menuButton || !mobileMenu) return;
    mobileMenu.hidden = !open;
    mobileMenu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    if (menuIcon) menuIcon.textContent = open ? '×' : '☰';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if (menuButton) {
    menuButton.addEventListener('click', function () {
      setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });
  }

  document.querySelectorAll('.mobile-menu a, .brand').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) setMenu(false);
  });
}());