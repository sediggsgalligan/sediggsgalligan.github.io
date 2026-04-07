---
layout: default
title: Projects
permalink: /projects
---

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