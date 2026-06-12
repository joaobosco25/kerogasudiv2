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
