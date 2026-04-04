---
layout: default
title: Projects
permalink: /projects
---

<div class="projects-list">
  {% for project in site.projects reversed %}
    {% unless project.hidden %}
      <div class="project-card">
        <img
          class="project-card-img"
          src="{{ project.image | default: '/assets/images/placeholder.png' }}"
          alt="{{ project.title }} image"
        >
        <div class="project-card-body">
          <h2>{{ project.title }}</h2>
          <p>{{ project.description }}</p>
        </div>
      </div>
    {% endunless %}
  {% endfor %}
</div>
