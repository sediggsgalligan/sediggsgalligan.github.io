# html code  to make a ul list
"""
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
"""

# style css so that the list is a horizontal list that has links to other pages, each of which are colored black with no underline. When hovered, changes color to a random color based on item name
"""
<style>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    li {
        float: left;
    }
    li a {
        display: block;
        color: black;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }
    li a:hover {
        color: random_color_based_on_item_name;
    }
</style>
"""
# html code to make a ul list
"""
<ul>
    <li><a href="page1.html">Item 1</a></li>
    <li><a href="page2.html">Item 2</a></li>