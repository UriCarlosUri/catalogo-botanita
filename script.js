document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.product-card');
  const sections = document.querySelectorAll('.category-section');
  const navBtns = document.querySelectorAll('.nav-btn');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // 1. Buscador en tiempo real
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(term)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    // Ocultar secciones si no tienen productos coincidentes
    sections.forEach(section => {
      const visible = section.querySelectorAll('.product-card[style="display: flex;"], .product-card:not([style*="display: none"])');
      section.style.display = visible.length > 0 ? 'block' : 'none';
    });
  });

  // 2. Control de visibilidad del botón "Volver arriba"
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 3. Resaltar botón de categoría según la posición de la pantalla
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('href') === `#${currentSectionId}`) {
        btn.classList.add('active');
      }
    });
  });
});