---
layout: default
title: Projects
permalink: /projects
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

<div class="projects-grid">
  {% assign all_projects = site.projects | where_exp: "item", "item.path contains '_projects'" %}
  {% assign sorted_projects = all_projects | sort: "relative_path" %}
  {% for project in sorted_projects %}
    {% unless project.hidden %}
      <div class="project-card">
        <div class="project-card-img-container">
          <!-- <img
            class="project-card-img img-default {{ project.css_class }}"
            src="{{ project.image }}"
            alt="{{ project.title }}"
          >
          
          <img
            class="project-card-img img-active {{ project.css_class }}" 
            src="{{ project.image_active }}"
            alt="{{ project.title }} active"
          > -->

          <img
            class="project-card-img img-default {{ project.css_class }}"
            src="{{ project.image }}"
            alt="{{ project.title }}"
            loading="eager"
          >
          
          <img
            class="project-card-img img-active {{ project.css_class }}" 
            src="{{ project.image_active }}"
            alt="{{ project.title }} active"
            loading="eager"
          >
        </div>

        <div class="project-card-body">
          <h2 class="project-title">{{ project.title }}</h2>
        </div>
      </div>
    {% endunless %}
  {% endfor %}
</div>