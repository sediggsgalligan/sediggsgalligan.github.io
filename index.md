---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

title: sophiadg.com
layout: default
---

<div class="site_header">
<h1>Sophia Diggs-Galligan</h1>

<ul class="header">
    <li class="selected"><a href="./">Home</a></li>
    <li><a href="./about">About</a></li>
    <li><a href="./contact">Contact</a></li>
</ul>
</div>

<style>

    body {
        background-color: var(--c-bg)
    }

    div.site_header {
        text-align: center;
    }

    #header.blog {
        display: flex;
        flex-direction: column;
        align-items: baseline;
    }
    
    #header.blog h1, #header.blog span.pop {
        /* color: black; */
    }

    #header.blog .emoji-block h1 {
        animation-name: none;
        font-size: 5rem;
    }

    article.post_flat {
        cursor: pointer;
        background-color: #fff;
        margin: 1em 4em;
        transition: background-color 0.2s ease-in-out;
        border-radius: 1em;
    }

    article.post_flat:hover {
        background-color: #eee;
    }

    article.post_flat img {
        object-fit: cover;
        height: 15em;
        width: 15em;
        border-radius: 0;
        margin: 1em 5em 1em 1em;
        /* position: relative; */
        overflow: hidden;
        border-radius: 50%;
    }

    .article_text_div div {
        display: inline-block;
        width: max-content;

    }

    .post_flat div > * {
        vertical-align:middle;  // Align children to middle of line
    }

    div.blogs_splash {
        position: absolute;
        top: 0;
        left: 0;
        transition: none;
        flex-basis: 100%;
        max-width: 100%;
        width: 100%;
        display: block;
        height: 20em;
        z-index: -20;
        object-position: bottom;
        object-fit: cover;
        background: var(--less-pop);
    }

    ul.header {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        width: max-content;
        text-align: center;
        display: inline-block;
    }
    ul.header li {
        float: left;
    }
    ul.header li a {
        display: block;
        color: black;
        font-weight: 500;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }
    ul.header li a:hover {
        color: red;
    }

    ul.header li.selected a {
        color: blue;
    }

</style>

<br/>

## My Experiments

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