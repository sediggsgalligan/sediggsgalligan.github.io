---
title: Constellation Dome
date: 2024-06-01
hidden: false
image: /assets/images/project_thumbnails/constellation.webp
image_active: /assets/images/project_thumbnails/constellation_hover.webp
description: A geodesic dome where participants could create their own constellations with string in a sky of glow-in-the-dark stars.
css_class: constellations
priority: 2

constellation_dome_carousel:
  - image: "assets/images/projects/constellation-dome/constellation_dome_1.webp"
    caption: ""
  - image: "assets/images/projects/constellation-dome/constellation_dome_2.webp"
    caption: ""
  - image: "assets/images/projects/constellation-dome/constellation_dome_3.webp"
    caption: ""
  - image: "assets/images/projects/constellation-dome/constellation_dome_4.webp"
    caption: ""
  - image: "assets/images/projects/constellation-dome/constellation_dome_5.webp"
    caption: ""
  - image: "assets/images/projects/constellation-dome/constellation_dome_6.webp"
    caption: ""
  - image: "assets/images/projects/constellation-dome/constellation_dome_7.webp"
    caption: ""
  - image: "assets/images/projects/constellation-dome/constellation_dome_8.webp"
    caption: ""
  - image: "assets/images/projects/constellation-dome/constellation_dome_9.webp"
    caption: ""

---

{% include carousel.html images=page.constellation_dome_carousel %}

<style>
.figure-container {
    display: flex;
    flex-direction: column; /* This forces a new line for every child */
    justify-content: center; /* Centers horizontally */
    align-items: center;     /* Centers vertically */
    width: 100%;
    min-height: 100vh;       /* Ensures there is height to center within */
}

.iphone-mockup {
    margin: 0;               /* Remove margins to let flexbox handle it */
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.the-iphone-mockup {
    height: 80vh; 
}

@media (max-width: 768px) {
    .iphone-mockup {
        /* Scale from the center, not the top-left corner */
        transform: scale(0.75);
        transform-origin: center center; 
    }

    .the-iphone-mockup {
        height: 110vh; 
    }
}
</style>

<div class="figure-container">
    <figure class='iphone-mockup'>
        <div style="
            display: flex;
            justify-content: center;
            align-items: center;
        ">
            <div style="
                position: relative;
                aspect-ratio: 375 / 812; 
                border: 1.2vh solid #2c2c2e; 
                border-radius: 5.5vh; 
                box-shadow: 0 4vh 10vh rgba(0,0,0,0.4);
                background: #000;
                overflow: hidden;
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            " class='the-iphone-mockup'>
                <div style="
                    position: absolute;
                    top: 1.5%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 30%;
                    height: 3.5%;
                    background: #000;
                    border-radius: 2vh;
                    z-index: 20;
                    border: 0.1vh solid #333;
                "></div>

                <div style="
                    height: 5.5%;
                    background: #000;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 8%;
                    font-size: 1.6vh;
                    font-weight: 600;
                    color: #fff;
                ">
                    <span>9:41</span>
                    <div style="display: flex; gap: 0.8vh; align-items: center;">
                        <svg width="1.8vh" height="1.2vh" viewBox="0 0 18 12" fill="white"><path d="M1 10h2v2H1v-2zm4-3h2v5H5V7zm4-3h2v8H9V4zm4-3h2v11h-2V1z"/></svg>
                        
                        <svg width="1.8vh" height="1.4vh" viewBox="0 0 24 18" fill="white">
                            <path d="M12 18a2 2 0 100-4 2 2 0 000 4zM18.3 12.3a8.9 8.9 0 00-12.6 0l1.4 1.4a6.9 6.9 0 019.8 0l1.4-1.4zm3.6-3.6a13.9 13.9 0 00-19.8 0l1.4 1.4a11.9 11.9 0 0117 0l1.4-1.4zm3.5-3.5a18.9 18.9 0 00-26.8 0l1.4 1.4a16.9 16.9 0 0124 0l1.4-1.4z"/>
                        </svg>

                        <svg width="2.2vh" height="1.1vh" viewBox="0 0 22 11" fill="none" stroke="white" stroke-width="1.2">
                            <rect x="0.5" y="0.5" width="18" height="10" rx="2.5"/>
                            <path d="M20 3.5v4" stroke-linecap="round"/>
                            <rect x="2.5" y="2.5" width="14" height="6" rx="1" fill="white"/>
                        </svg>
                    </div>
                </div>

                <div style="height: 82%; background: #fff;">
                    <iframe 
                        src="https://www.itstorque.com/constellations-fidget-camp-2025/?" 
                        width="100%" 
                        height="100%" 
                        frameborder="0"
                        style="display: block;"
                    ></iframe>
                </div>

                <div style="
                    height: 11%;
                    background: rgba(20, 20, 20, 0.94);
                    backdrop-filter: blur(20px);
                    display: flex;
                    flex-direction: column;
                    border-top: 0.5px solid #333;
                    padding-bottom: 10em;
                ">
                    <div style="background: rgba(255,255,255,0.1); margin: 2% 5%; padding: 1.5%; border-radius: 1vh; text-align: center; font-size: 1.4vh; color: #eee; border: 0.5px solid rgba(255,255,255,0.05);">
                        <span style="opacity: 0.6; margin-right: 4px;">AA</span> <a href="https://www.itstorque.com/constellations-fidget-camp-2025">constellations-fidget-camp-2025</a>
                    </div>

                    <div style="display: flex; justify-content: space-around; align-items: center; padding-top: 1%;">
                        <svg width="2.2vh" height="2.2vh" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        <svg width="2.2vh" height="2.2vh" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.3;"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        <svg width="2.2vh" height="2.2vh" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                        <svg width="2.2vh" height="2.2vh" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                        <svg width="2vh" height="2vh" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </div>
                </div>

                <div style="
                    position: absolute;
                    bottom: 1%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 35%;
                    height: 0.6%;
                    background: #fff;
                    opacity: 0.8;
                    border-radius: 1vh;
                "></div>
            </div>
        </div>
        <figcaption style="text-align: center; margin-top: 1.5vh; font-size: 1.8vh; color: #555; z-index: 100;">
            Interactive demo of the site from the installation showing the constellations people made the day of.
        </figcaption>
    </figure>
</div>