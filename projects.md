---
layout: default
title: Projects
permalink: /projects
---

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
  
  {% comment %} Split projects into two groups {% endcomment %}
  {% assign with_priority = all_projects | where_exp: "item", "item.priority" | sort: "priority" %}
  {% assign no_priority = all_projects | where_exp: "item", "item.priority == nil" | sort: "relative_path" %}
  
  {% comment %} Combine them: Priority first, then the rest {% endcomment %}
  {% assign sorted_projects = with_priority | concat: no_priority %}

  {% for project in sorted_projects %}
    {% unless project.hidden %}
      <a class="project-card" href="{{ project.url | relative_url }}">
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
      </a>
    {% endunless %}
  {% endfor %}
</div>