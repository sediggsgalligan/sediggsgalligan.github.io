---
title: Anything Vending Machine
date: 2025-02-27 19:49:59 -0800
hidden: false
image: /assets/images/vendingmachine.webp
image_active: /assets/images/vendingmachine.webp
description: Order anything you can imagine — we have it in stock!
css_class: vending_machine
priority: 4
---

<!-- 
<figure>
  <p><img src="https://www.itstorque.com/blog/2025_02_17_egg_sims/egg_images/annotated_egg2.jpg" class="large"></p>
  <figcaption>Picture of eggs cooked using 2 pulsed methods, each coulumn of eggs is labelled by a number. 
   Egg (1) Proposed faster pulsed cooking of eggs, (2) re-calibrated version of the original cooking sequence from the Nature paper and (3) a different cross-section
   of an egg cooked using the Nature paper method. Eggs (1) and (2) are qualitatively similar despite the 2.7x faster cook time.</figcaption>
</figure> -->

<style>
  .gallery-container {
    display: flex;
    flex-direction: column; /* Stack vertically */
    align-items: center;
    justify-content: center;
    gap: 15px;
    max-width: 800px;
    margin: auto;
  }

  .gallery-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .gallery-item {
    display: none;
    text-align: center;
  }

  .gallery-item.active {
    display: block;
  }

  .gallery-item img {
    width: 100%;
    border-radius: 8px;
    height: auto;
  }

  /* Container for the buttons below the image */
  .button-row {
    display: flex;
    gap: 40px;
    justify-content: center;
  }

  .nav-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    transition: transform 0.2s;
  }

  .nav-btn:hover {
    transform: scale(1.2);
  }

  .nav-btn.prev:hover:active {
    transform: translateX(-1em);
  }
  .nav-btn.next:hover:active {
    transform: translateX(1em);
  }

  .nav-btn svg {
    width: 40px;
    height: 40px;
    color: #333;
  }
</style>

<div class="gallery-container">
  <div class="gallery-wrapper">
    <figure class="gallery-item active">
      <img src="https://www.itstorque.com/blog/2025_02_17_egg_sims/egg_images/annotated_egg2.jpg">
      <figcaption>
        <strong>Figure 1:</strong> Picture of eggs cooked using 2 pulsed methods. 
        (1) Proposed faster pulsed cooking, (2) re-calibrated original sequence, and (3) different cross-section.
      </figcaption>
    </figure>

    <figure class="gallery-item">
      <img src="https://www.itstorque.com/blog/2025_02_05_voronoi_perimeters/voronoi_circle_times_2.png" alt="Sample 2">
      <figcaption>
        <strong>Figure 2:</strong> 2D Voronoi diagram showcasing 8 random points and ball-size correspondences.
      </figcaption>
    </figure>
  </div>

  <div class="button-row">
<button class="nav-btn prev" id="prevBtn" aria-label="Previous">
    <img src="/assets/images/indicators/arrow_left.svg" alt="Left" width="50" height="50">
</button>

<button class="nav-btn next" id="nextBtn" aria-label="Next">
    <img src="/assets/images/indicators/arrow_right.svg" alt="Left" width="50" height="50">
</button>
</div>
</div>

<script>
  const items = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;

  function showSlide(index) {
    items[currentIndex].classList.remove('active');
    currentIndex = (index + items.length) % items.length;
    items[currentIndex].classList.add('active');
  }

  document.getElementById('prevBtn').addEventListener('click', () => showSlide(currentIndex - 1));
  document.getElementById('nextBtn').addEventListener('click', () => showSlide(currentIndex + 1));
</script>