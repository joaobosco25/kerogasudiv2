const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    nav?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

function initHeroCarousel() {
  const carousel = document.querySelector('[data-hero-carousel]');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
  const dots = Array.from(carousel.querySelectorAll('.hero-dot'));
  const prev = carousel.querySelector('.hero-arrow-prev');
  const next = carousel.querySelector('.hero-arrow-next');
  const hero = carousel.closest('.hero');

  if (!slides.length) return;

  let currentIndex = 0;
  let timer = null;

  const setSlide = index => {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === currentIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === currentIndex);
      dot.setAttribute('aria-current', String(dotIndex === currentIndex));
    });

    hero?.classList.toggle('is-promo-active', slides[currentIndex]?.classList.contains('hero-slide-promo'));
  };

  const startAutoplay = () => {
    stopAutoplay();
    timer = window.setInterval(() => setSlide(currentIndex + 1), 5000);
  };

  const stopAutoplay = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  const goToPreviousSlide = event => {
    event?.preventDefault();
    event?.stopPropagation();
    setSlide(currentIndex - 1);
    startAutoplay();
  };

  const goToNextSlide = event => {
    event?.preventDefault();
    event?.stopPropagation();
    setSlide(currentIndex + 1);
    startAutoplay();
  };

  prev?.addEventListener('click', goToPreviousSlide);
  next?.addEventListener('click', goToNextSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      setSlide(index);
      startAutoplay();
    });
  });

  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', event => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', event => {
    touchEndX = event.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 45) return;

    if (distance > 0) {
      setSlide(currentIndex - 1);
    } else {
      setSlide(currentIndex + 1);
    }

    startAutoplay();
  }, { passive: true });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);

  setSlide(0);
  startAutoplay();
}

initHeroCarousel();
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("keroPromoModal");
  const closeButtons = document.querySelectorAll("[data-close-promo]");

  if (!modal) return;

  function openPromoModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closePromoModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openPromoModal();

  closeButtons.forEach(function (button) {
    button.addEventListener("click", closePromoModal);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closePromoModal();
    }
  });
});

function initInnerCarousels() {
  document.querySelectorAll('[data-inner-carousel]').forEach(carousel => {
    const slides = Array.from(carousel.querySelectorAll('.inner-order-slide'));
    const dots = Array.from(carousel.querySelectorAll('.inner-order-dot'));
    const prev = carousel.querySelector('.inner-order-arrow-prev');
    const next = carousel.querySelector('.inner-order-arrow-next');
    if (!slides.length) return;

    let currentIndex = 0;
    let timer = null;

    const setSlide = index => {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === currentIndex);
      });
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === currentIndex);
        dot.setAttribute('aria-current', String(dotIndex === currentIndex));
      });
    };

    const stopAutoplay = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const startAutoplay = () => {
      stopAutoplay();
      timer = window.setInterval(() => setSlide(currentIndex + 1), 5000);
    };

    prev?.addEventListener('click', event => {
      event.preventDefault();
      setSlide(currentIndex - 1);
      startAutoplay();
    });

    next?.addEventListener('click', event => {
      event.preventDefault();
      setSlide(currentIndex + 1);
      startAutoplay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', event => {
        event.preventDefault();
        setSlide(index);
        startAutoplay();
      });
    });

    let touchStartX = 0;
    carousel.addEventListener('touchstart', event => {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', event => {
      const distance = event.changedTouches[0].screenX - touchStartX;
      if (Math.abs(distance) < 45) return;
      setSlide(distance > 0 ? currentIndex - 1 : currentIndex + 1);
      startAutoplay();
    }, { passive: true });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    setSlide(0);
    startAutoplay();
  });
}

initInnerCarousels();

function initKeroGoogleReviews() {
  const currentPage = window.location.pathname.split('/').pop();
  const isHome = currentPage === '' || currentPage === 'index.html';
  if (!isHome || document.querySelector('.kero-google-reviews')) return;

  const footer = document.querySelector('.footer');
  if (!footer) return;

  const googleReviewUrl = 'https://share.google/GJ0jDMmwVzMM4Dsoc';
  const reviews = [
    {
      name: 'Alexandre Gomes',
      meta: 'Local Guide · 164 avaliações · 160 fotos',
      dateLabel: 'um ano atrás',
      sortDate: '2025-06-01',
      rating: 5,
      photo: 'assets/img/depoimentos/alexandre-gomes.png',
      text: 'Sou cliente a bastante tempo sempre com a mesma qualidade e um atendimento de primeira.'
    },
    {
      name: 'Vanderlei Galdino',
      meta: 'Local Guide · 20 avaliações · 20 fotos',
      dateLabel: 'um ano atrás',
      sortDate: '2025-05-01',
      rating: 5,
      photo: 'assets/img/depoimentos/vanderlei-galdino.png',
      text: ''
    },
    {
      name: 'Andressa Barnabé',
      meta: '9 avaliações',
      dateLabel: '3 anos atrás',
      sortDate: '2023-06-01',
      rating: 5,
      photo: 'assets/img/depoimentos/andressa-barnabe.png',
      text: 'Que atendimento toooop!!! E a qualidade do gás é excelente. Melhor brinde que tem hahaha nao troco de jeito nenhum..'
    },
    {
      name: 'Alessandra Cruvinel',
      meta: 'Local Guide · 295 avaliações · 1390 fotos',
      dateLabel: '3 anos atrás',
      sortDate: '2023-05-01',
      rating: 5,
      photo: 'assets/img/depoimentos/alessandra-cruvinel.png',
      text: 'Melhor e mais rápida entrega da cidade! Super recomendo!! Ansiosa para meu pedido mensal de gás - todo mês um brinde diferente e super útil! 🙏'
    },
    {
      name: 'Mariana Alves Araujo',
      meta: '4 avaliações',
      dateLabel: '3 anos atrás',
      sortDate: '2023-04-01',
      rating: 5,
      photo: 'assets/img/depoimentos/mariana-alves-araujo.png',
      text: 'Genteeeee liguei nesse gás, e a atentende é muito carismática, alegrou meu dia com a alegria dela🥰'
    },
    {
      name: 'Larissa Custodio',
      meta: '4 avaliações',
      dateLabel: '3 anos atrás',
      sortDate: '2023-03-01',
      rating: 5,
      text: 'Atendimento adorável, agilidade na entrega.. e sem falar que adoro os brindes q ganho 🥰'
    }
  ];

  const fiveStarNewestReviews = reviews
    .filter(review => Number(review.rating) >= 5)
    .sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));

  const getInitial = name => name.trim().charAt(0).toUpperCase();
  const renderStars = rating => '★'.repeat(Math.min(Number(rating), 5));
  const googleIcon = `
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#FFC107" d="M43.61 20.08H42V20H24v8h11.3C33.65 32.66 29.22 36 24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.63-.39-3.92Z"/>
      <path fill="#FF3D00" d="m6.31 14.69 6.57 4.82C14.66 15.11 18.97 12 24 12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4 16.32 4 9.66 8.34 6.31 14.69Z"/>
      <path fill="#4CAF50" d="M24 44c5.17 0 9.86-1.98 13.4-5.2l-6.18-5.23C29.15 35.14 26.64 36 24 36c-5.2 0-9.62-3.32-11.29-7.95l-6.53 5.03C9.49 39.56 16.23 44 24 44Z"/>
      <path fill="#1976D2" d="M43.61 20.08H42V20H24v8h11.3a12.04 12.04 0 0 1-4.08 5.57l6.18 5.23C36.96 39.2 44 34 44 24c0-1.34-.14-2.63-.39-3.92Z"/>
    </svg>`;

  const section = document.createElement('section');
  section.className = 'kero-google-reviews';
  section.setAttribute('aria-labelledby', 'keroGoogleReviewsTitle');
  section.innerHTML = `
    <div class="wrap kero-google-reviews-wrap">
      <h2 id="keroGoogleReviewsTitle">O que nossos clientes dizem</h2>

      <div class="kero-google-carousel" data-google-reviews-carousel>
        <button class="kero-google-arrow kero-google-arrow-prev" type="button" aria-label="Ver depoimentos anteriores">‹</button>
        <div class="kero-google-track" tabindex="0">
          ${fiveStarNewestReviews.map(review => `
            <article class="kero-google-card">
              <header class="kero-google-card-head">
                ${review.photo
                  ? `<img class="kero-google-avatar" src="${review.photo}" alt="Foto de ${review.name}" loading="lazy">`
                  : `<span class="kero-google-avatar" aria-hidden="true">${getInitial(review.name)}</span>`}
                <span class="kero-google-author">
                  <strong>${review.name}</strong>
                  <small>${review.meta}</small>
                  <em>${review.dateLabel}</em>
                </span>
                <span class="kero-google-icon" aria-label="Avaliação do Google">${googleIcon}</span>
              </header>
              <div class="kero-google-stars" aria-label="${review.rating} estrelas">
                <span>${renderStars(review.rating)}</span>
                <ion-icon name="checkmark-circle" aria-hidden="true"></ion-icon>
              </div>
              ${review.text
                ? `<p>${review.text}</p>`
                : `<p class="kero-google-no-comment">Avaliação 5 estrelas sem comentário escrito.</p>`}
            </article>
          `).join('')}
        </div>
        <button class="kero-google-arrow kero-google-arrow-next" type="button" aria-label="Ver próximos depoimentos">›</button>
      </div>

      <div class="kero-google-rate">
        <h3>Nos avalie aqui <span aria-hidden="true">⬇</span></h3>
        <a href="${googleReviewUrl}" target="_blank" rel="noopener" class="kero-google-rate-btn">
          <ion-icon name="star" aria-hidden="true"></ion-icon>
          Avalie aqui
        </a>
      </div>
    </div>
  `;

  footer.parentNode.insertBefore(section, footer);

  const track = section.querySelector('.kero-google-track');
  const prevButton = section.querySelector('.kero-google-arrow-prev');
  const nextButton = section.querySelector('.kero-google-arrow-next');

  const scrollCards = direction => {
    const card = track.querySelector('.kero-google-card');
    if (!card) return;
    const gap = parseFloat(window.getComputedStyle(track).gap || '0');
    const amount = card.getBoundingClientRect().width + gap;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  prevButton?.addEventListener('click', () => scrollCards(-1));
  nextButton?.addEventListener('click', () => scrollCards(1));
}

document.addEventListener('DOMContentLoaded', initKeroGoogleReviews);

