---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

title: sophiadg.com
layout: default
---

<div class="site_header">
  
<h1>
[🚧 UNDER CONSTRUCTION 🚧]<br/>
<div class="confetti-container">
    <span class="hover-text" onmouseover="createConfetti(event)" style="    font-family: 'Balsamiq Sans'">Sophia Diggs-Galligan</span>
  </div></h1>

<ul class="header">
    <li class="selected"><a href="./">Home</a></li>
    <li><a href="./about">About</a></li>
    <li><a href="./contact">Contact</a></li>
</ul>
</div>

<br/>

<br/><br/>

<div class="posts" id="post_published">
  {% for post in site.projects reversed %}
    {% if post.hidden %}
    {% else %}
        {% include project_list_item.html post=post %}
        <br/>
        <br/>
    {% endif %}
  {% endfor %}
</div>