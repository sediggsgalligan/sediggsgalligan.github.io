---
layout: default
title: Projects
permalink: /projects
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

<script>
  document.addEventListener("DOMContentLoaded", () => {
  // Check if the device is a touch/no-hover device
  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  if (isTouchDevice) {
    const cards = document.querySelectorAll('.project-card');

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

    cards.forEach(card => observer.observe(card));

  // add transition delay to each card for staggered effect
    const allCards = document.querySelectorAll('.project-card');
    allCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 100}ms`;
    });
  }
});
</script>

<div class="projects-grid">
  {% assign all_projects = site.projects | where_exp: "item", "item.path contains '_projects'" %}
  {% assign sorted_projects = all_projects | sort: "relative_path" %}
  {% for project in sorted_projects %}
    {% unless project.hidden %}
      <div class="project-card">
        <div class="project-card-img-container">
          <img
            class="project-card-img img-default {{ project.css_class }}"
            src="{{ project.image }}"
            alt="{{ project.title }}"
            loading="lazy"
          >
          
          <img
            class="project-card-img img-active {{ project.css_class }}" 
            src="{{ project.image_active }}"
            alt="{{ project.title }} active"
            loading="lazy"
          >
        </div>

        <div class="project-card-body">
          <h2 class="project-title">{{ project.title }}</h2>
        </div>
      </div>
    {% endunless %}
  {% endfor %}
</div>