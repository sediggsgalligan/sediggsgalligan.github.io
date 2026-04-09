---
layout: default
title: Projects
permalink: /projects
add_scroll: true
scroll_selector: .project-card
---

<style>
  .project-card.scroll-indicator-card{
    display: none;
  }
@media (max-width: 768px) {
    /* Remove card styles for the scroll trigger */
  .project-card.scroll-indicator-card {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .scroll-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: currentColor; /* Matches your text color */
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .scroll-content .empty-fill {
    flex-grow: 1; /* This item expands to fill remaining space */
  }


  .scroll-text {
    font-family: inherit;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 5em;
  }

  .scroll-arrow {
    width: 40px;
    height: 40px;
    animation: bounce 2s infinite;
    margin-top: 1.2em;
  }

  /* The "Cute" Bobbing Animation */
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-1em);
    }
    60% {
      transform: translateY(-0.5em);
    }
  }

  /* Hide the arrow on the active/hover state if you want it subtle */
  .scroll-indicator-card:hover .scroll-text {
    opacity: 1;
  }

  .projects-intro {
    max-width: 600px; /* Keeps line length readable */
    margin: 0 auto 3rem auto; /* Centers the block and adds space before the grid */
    text-align: center;
    padding: 0 20px;
  }

  .projects-intro p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555; /* A slightly softer black/gray */
    font-weight: 400;
  }

  .projects-intro strong {
    color: #000; /* Makes keywords pop */
    font-weight: 600;
  }

  /* Optional: Add a subtle divider or extra breathing room */
  .projects-intro::after {
    content: "";
    display: block;
    width: 40px;
    height: 2px;
    background: #eee;
    margin: 1.5rem auto 0;
  }
}
</style>

<div class="projects-grid">
  {% assign all_projects = site.projects | where_exp: "item", "item.path contains '_projects'" %}
  
  {% comment %} Split projects into two groups {% endcomment %}
  {% assign with_priority = all_projects | where_exp: "item", "item.priority" | sort: "priority" %}
  {% assign no_priority = all_projects | where_exp: "item", "item.priority == nil" | sort: "relative_path" %}
  
  {% comment %} Combine them: Priority first, then the rest {% endcomment %}
  {% assign sorted_projects = with_priority | concat: no_priority %}

  <div class="project-card scroll-indicator-card" onclick="document.querySelectorAll('.project-card')[1].scrollIntoView({ behavior: 'smooth' })">
    <div class="project-card-img-container">
      <div class="scroll-content">
        <div class="empty-fill"></div>
        <header class="projects-intro">
          <p>
            This is an assortment of interactive art projects, prototypes, and schemes of mine from the past 4 years-
            click on any project for a more detailed write-up on the fabrication process and participant experience!
          </p>
        </header>
        <div class="empty-fill"></div>
        <div class="empty-fill"></div>
        <span class="scroll-text">View Projects</span>
        <svg class="scroll-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>

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
    <br/><br/><br/><br/><br/><br/><br/><br/>
</div>