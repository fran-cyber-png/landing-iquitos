document.addEventListener('DOMContentLoaded', () => {
  // Scroll animations
  const fadeElements = document.querySelectorAll(
    '.objetivo__container, .speaker__container, .beneficios__container, ' +
    '.inscripcion__container, .cronograma__container, .como-inscribirte__container, ' +
    '.reserva__container, .inversion__container'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => observer.observe(el));

  // Sticky info bar
  const infoBar = document.querySelector('.hero__info-bar');
  const hero = document.getElementById('hero');
  if (infoBar && hero) {
    window.addEventListener('scroll', () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      if (heroBottom <= 80) {
        infoBar.classList.add('sticky');
      } else {
        infoBar.classList.remove('sticky');
      }
    });
  }

  // Form visual validation
  const form = document.getElementById('inscripcionForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn--primary');
      btn.textContent = '¡INSCRIPCIÓN ENVIADA!';
      btn.style.background = '#22c35e';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = 'INSCRIBETE';
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    });
  }

  // Modal certificado
  const modal = document.getElementById('modalCertificado');
  const btnVer = document.getElementById('btnVerCertificado');
  const btnClose = document.getElementById('modalClose');
  const modalOverlay = modal?.querySelector('.modal__overlay');

  if (btnVer && modal) {
    btnVer.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    btnClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
