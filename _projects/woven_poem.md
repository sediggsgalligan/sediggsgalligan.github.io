---
title: Woven Poem
date: 2024-06-01
hidden: false
image: /assets/images/project_thumbnails/wovenpoem.webp
image_active: /assets/images/project_thumbnails/wovenpoem_hover.webp
description: Experiments with new poetic structures and forms.
css_class: wovenpoem
priority: 3

egg_image_carousel:
  - image: "https://www.itstorque.com/blog/2025_02_17_egg_sims/egg_images/annotated_egg2.jpg"
    caption: "Picture of eggs cooked using 2 pulsed methods."
  - image: "https://www.itstorque.com/blog/2025_02_05_voronoi_perimeters/voronoi_circle_times_2.png"
    caption: "2D Voronoi diagram showcasing 8 random points."

other_carousel:
  - image: "https://mitadmissions.org/wp-content/uploads/2026/04/supplies-0-800x1067.png"
    caption: "Other"
---

# Text above

text

{% include carousel.html images=page.egg_image_carousel %}

## Text below

{% include carousel.html images=page.other_carousel %}