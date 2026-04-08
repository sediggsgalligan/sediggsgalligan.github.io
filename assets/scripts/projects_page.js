function initProjectCards() {
  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  if (isTouchDevice) {
    const cards = document.querySelectorAll('.project-card');
    
    if (cards.length === 0) return;

    const observerOptions = {
      root: null,
      threshold: 0.8 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 200}ms`;
      observer.observe(card);
    });
  }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initProjectCards();
} else {
  document.addEventListener("DOMContentLoaded", initProjectCards);
}

swup.hooks.on('page:view', initProjectCards);