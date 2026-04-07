---
layout: default
title: Research
permalink: /research
---

<div class="plain-page">
  <h2>Research</h2>
  <p>This page is coming soon — check back later for my full research! Meanwhile, here are a few papers of mine:</p>

  <h3>Select Publications</h3>

  {% assign publications = site.publications | sort: 'date' | reverse %}

  {% for pub in publications %}

  {{ pub }}

  {% endfor %}
</div>