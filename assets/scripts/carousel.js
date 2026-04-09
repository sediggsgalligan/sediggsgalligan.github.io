function initCarousels() {
  // Find all carousel instances on the current page
  const carousels = document.querySelectorAll('[data-carousel="gallery"]');

  carousels.forEach(container => {
    // Prevent double-initialization if the script runs twice
    if (container.dataset.initialized) return;

    const items = container.querySelectorAll('.gallery-item');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    let currentIndex = 0;

    if (!prevBtn || !nextBtn) return;

    function showSlide(index) {
      items[currentIndex].classList.remove('active');
      currentIndex = (index + items.length) % items.length;
      items[currentIndex].classList.add('active');
    }

    prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

    // Mark as initialized
    container.dataset.initialized = "true";
  });
}

document.addEventListener('DOMContentLoaded', initCarousels);
swup.hooks.on('page:view', initCarousels);