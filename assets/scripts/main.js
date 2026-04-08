const swup = new Swup({
    plugins: [new SwupPreloadPlugin()]
  });

  // --- NEW: Hamburger Logic ---
  function initHamburger() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.classList.toggle('active');
      // Prevent scrolling the background when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  function closeHamburger() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (menuToggle && mainNav) {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function updateActiveNav() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
      const href = item.getAttribute('href');
      const isHome = currentPath === '/' || currentPath === '/index.html';
      const isMatch = (href === '/' && isHome) || (href !== '/' && currentPath == href) || (href !== '/' && currentPath == href + "/");

      if (isMatch) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Hook into Swup's lifecycle
  swup.hooks.on('visit:start', (visit) => {
    // NEW: Close menu immediately when a transition starts
    closeHamburger();

    document.getElementById('page-loader').classList.add('is-loading');
    const dest = visit.to.url;

    let section = 'about';
    if (dest === '/' || dest === '/index.html') section = 'about';
    else if (dest.startsWith('/projects')) section = 'projects';
    else if (dest.startsWith('/research')) section = 'research';
    else if (dest.startsWith('/contact')) section = 'contact';
    document.body.dataset.section = section;

    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href');
      const isHome = dest === '/' || dest === '/index.html';
      const isMatch = (href === '/' && isHome) || (href !== '/' && dest.startsWith(href));
      item.classList.toggle('pressing', isMatch);
    });
  });

  swup.hooks.on('page:view', () => {
    document.getElementById('page-loader').classList.remove('is-loading');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('pressing'));
    updateActiveNav();

    const images = document.querySelectorAll('#swup img');
    images.forEach(img => {
      const parent = img.parentNode;
      const newImg = img.cloneNode(true);
      parent.replaceChild(newImg, img);
    });
  });

  // Run on initial page load
  window.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    initHamburger(); // Initialize the toggle listener
  });

  function handleSvgViewbox() {
  const nameSvg = document.querySelector('.name-svg');
  if (!nameSvg) return;

  // Create a media query list
  const mobileQuery = window.matchMedia("(max-width: 768px)");
  const smallerMobileQuery = window.matchMedia("(max-width: 420px)");

  function updateViewBox(e) {
    if (e.matches) {
      nameSvg.setAttribute('viewBox', '0 -30 700 124');
    } else {
      nameSvg.setAttribute('viewBox', '-350 -30 1433 124');
    }
  }

  function updateSmallerViewBox(e) {
    if (e.matches) {
      // nameSvg.setAttribute('viewBox', '-150 -30 1000 124');
      // nameSvg.setAttribute('viewBox', '0 -30 800 124');
      nameSvg.setAttribute('viewBox', '0 -30 650 124');
    }
  }

  // Register the listener to run whenever the breakpoint is crossed
  mobileQuery.addEventListener('change', updateViewBox);
  smallerMobileQuery.addEventListener('change', updateSmallerViewBox);

  // Run once on load to set the correct initial state
  updateViewBox(mobileQuery);
  updateSmallerViewBox(smallerMobileQuery);
}

// Call it on load
document.addEventListener('DOMContentLoaded', handleSvgViewbox);

// Initial page load bar
window.addEventListener('load', () => {
const bar = document.getElementById('page-load-bar');
if (!bar) return;
bar.classList.add('done');
setTimeout(() => {
    bar.classList.add('fade-out');
    setTimeout(() => bar.remove(), 400);
}, 200);


const primaryAssets = [
    '/assets/images/sophia_pic.webp',
    '/assets/images/project_thumbnails/luminaria.webp',
    '/assets/images/project_thumbnails/wovenpoem.webp',
    '/assets/images/project_thumbnails/pillowfort.webp',
];

const secondaryAssets = [
    '/assets/images/project_thumbnails/luminaria_hover.webp',
    '/assets/images/project_thumbnails/wovenpoem_hover.webp',
    '/assets/images/project_thumbnails/pillowfort_hover.webp',
];

if ('requestIdleCallback' in window) {
    requestIdleCallback(async () => {
        // Wait for primaries to finish (or at least start) before hovers
        await preloadBatch(primaryAssets);
        
        // Optional: Add a slight delay or wait for another idle period
        requestIdleCallback(() => preloadBatch(secondaryAssets));
    });
} else {
    preloadBatch(primaryAssets).then(() => preloadBatch(secondaryAssets));
}
});

async function preloadBatch(urls) {
const promises = urls.map(url => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = resolve; // Continue even if one fails
    });
});
return Promise.all(promises);
}