let scrollObserver = null; 

function initScrollIndicator() {
  if (scrollObserver) {
    scrollObserver.disconnect();
  }

  const container = document.getElementById('scroll-indicator');
  // Re-fetch headers to ensure we have the fresh DOM elements from Swup
//   const headers = document.querySelectorAll('.project-title, .post-body h1, .post-body h2, .post-body h3');
    const selector = container.dataset.scrollSelector || '.project-title, .post-body h1, .post-body h2, .post-body h3';
    const headers = document.querySelectorAll(selector);
  
  if (!container || headers.length === 0) return;

  container.innerHTML = ''; 
  const dots = [];
  const patterns = ["star", "heart", "square", "triangle"];
  const idCounts = {};
  let isManualScrolling = false;

  headers.forEach((header, index) => {
    let baseId = header.innerText.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    if (!baseId) baseId = 'section';
    if (idCounts[baseId] === undefined) {
        idCounts[baseId] = 0;
        header.id = baseId;
    } else {
        idCounts[baseId]++;
        header.id = `${baseId}-${idCounts[baseId]}`;
    }

    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.dataset.target = header.id;
    dot.classList.add(patterns[index % patterns.length]);

    dot.addEventListener('click', () => {
      isManualScrolling = true;
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      // if first header, scroll to top, else scroll to header
      if (header.id === headers[0].id && !container.dataset.scrollSelector) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        header.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => { isManualScrolling = false; }, 800);
    });

    container.appendChild(dot);
    dots.push(dot);
  });

  // 3. SYNCED OBSERVER: Uses the "Tripwire" method
  scrollObserver = new IntersectionObserver((entries) => {
    if (isManualScrolling) return;
    console.log('Observer triggered');

    any_intersections_already = false;
    entries.forEach(entry => {
      // When scrolling DOWN, we want the element that just entered the top buffer
      // When scrolling UP, we want the element that is still visible
      console.log(entry.target.id, entry.isIntersecting, entry.intersectionRatio);
      if (entry.isIntersecting && entry.intersectionRatio > 0 && !any_intersections_already) {
        any_intersections_already = true;
        dots.forEach(dot => {
          dot.classList.toggle('active', dot.dataset.target === entry.target.id);
        });
      }
    });
  }, {
    // rootMargin: '-1px 0px -90% 0px',
    // threshold: 0 
      // rootMargin: "0px",
      scrollMargin: "0px",
      threshold: 0.5,
  });

  headers.forEach(header => scrollObserver.observe(header));
  
  setInitialActiveDot(headers, dots);
}

function setInitialActiveDot(headers, dots) {
  if (!headers || headers.length === 0) return;
  let currentActiveId = null;
  
  headers.forEach(header => {
    const rect = header.getBoundingClientRect();
    console.log(header.id, rect.top >= 0 && rect.top <= window.innerHeight * 0.25);
    // Match the 20% rootMargin top
    if (rect.top >= 0 && rect.top <= window.innerHeight * 0.25) {
      currentActiveId = header.id;
    }
  });

  const targetId = currentActiveId || headers[0].id;
  dots.forEach(dot => dot.classList.toggle('active', dot.dataset.target === targetId));
}

// Swup Integration
if (window.swup) {
  swup.hooks.on('page:view', initScrollIndicator);
}

// Initial load
if (document.readyState === 'complete') {
  initScrollIndicator();
} else {
  document.addEventListener('DOMContentLoaded', initScrollIndicator);
}