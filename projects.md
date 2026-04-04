---
layout: default
title: Projects
permalink: /projects
---

<style>
  /* The Parent Grid */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Exactly 2 items per row */
  gap: 40px; /* Space between the cards */
  padding: 20px 0;
  margin: 0 auto;
  width: 80%;
}

/* on mobile make grid wider */
@media (max-width: 768px) {
  .projects-grid {
    width: 95%;
  }
}

/* The Individual Card */
.project-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  max-height: 60vh;
}

/* Image Container Sizing */
.project-card-img-container {
  position: relative;
  width: 100%;
  aspect-ratio: 0.6;
  overflow: hidden;
}

.project-card-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.3s ease-in-out;
}

/* Hover Swap Logic */
.img-active {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.project-card-img-container:hover .img-active {
  opacity: 1;
}

/* Title Styling */
.project-title {
  margin-top: 15px;
  font-size: 1.2rem;
  text-align: left;
  font-family: 'Commissioner', sans-serif; /* Matching your default.html fonts */
}

/* Mobile Responsive: Drop to 1 per row on small screens */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

.project-card-img.pillowfort {
  transform: scale(0.9) translateY(15%) translateX(6%);
}
</style>

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
          >
          
          <img
            class="project-card-img img-active" 
            src="{{ project.image_active }}"
            alt="{{ project.title }} active"
          >
        </div>

        <div class="project-card-body">
          <h2 class="project-title">{{ project.title }}</h2>
        </div>
      </div>
    {% endunless %}
  {% endfor %}
</div>