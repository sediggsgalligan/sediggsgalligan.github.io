---
layout: default
title: Contact
permalink: /contact
skip_title: false
---

<div class="plain-page">
    <h2>Say hi!</h2>
    <p>You can reach me at <a href="mailto:hi@sophiadg.com">hi@sophiadg.com</a>.</p>

    <style>
        .drawing-section { display: flex; flex-direction: column; align-items: center; margin-top: 30px; position: relative; }
        #canvas-container { border: 5px solid #555; background: white; cursor: crosshair; touch-action: none; }
        #canvas-container {
            max-width: 600px;
            width: 100vw;
            margin: 2rem auto;
            position: relative;
            max-height: 90vh;
        }
        canvas { display: block; }
        .toolbar { margin: 15px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap; justify-content: center; }
        .crayon { width: 30px; height: 30px; border-radius: 50%; border: 2px solid #fff; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        .crayon.active { border: 2px solid #000; transform: scale(1.1); }
        button { padding: 10px 20px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 5px; font-weight: bold; }
        #popup-overlay { display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(50, 50, 50, 0.9); color: white; flex-direction: column; justify-content: center; align-items: center; z-index: 10; }
        .popup-content { text-align: center; width: 80%; }
        .popup-content input { padding: 10px; width: 100%; margin: 10px 0; border-radius: 4px; border: none; color: #333; }
        #status-msg { margin-top: 10px; font-weight: bold; min-height: 1.2em; }
    </style>

    <div class="drawing-section" id="drawing-app-container" 
         data-pk="{{ site.env.EMAILJS_PUBLIC_KEY | base64_encode }}"
         data-sid="{{ site.env.EMAILJS_SERVICE_ID }}"
         data-tid="{{ site.env.EMAILJS_TEMPLATE_ID }}">
        
        <h2>Send me a Drawing!</h2>

        <div class="toolbar">
            <div class="crayon active" style="background: rgb(0, 0, 0);"></div>
            <div class="crayon" style="background: rgb(255, 119, 0);"></div>
            <div class="crayon" style="background: rgb(247, 173, 0);"></div>
            <div class="crayon" style="background: rgb(0, 171, 29);"></div>
            <div class="crayon" style="background: rgb(0, 133, 157);"></div>
            <div class="crayon" style="background: rgb(225, 127, 235);"></div>
            <div>
                <button id="clear-btn" style="background: #dc3545;">Clear</button>
                <button id="done-btn" style="background: #28a745;">Done</button>
            </div>
        </div>

        <div id="canvas-container">
            <canvas id="drawingCanvas" width="600" height="400"></canvas>
            
            <div id="popup-overlay">
                <div class="popup-content">
                    <h3>Share your art!</h3>
                    <input type="email" id="sender-email" placeholder="From: name@example.com">
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button id="download-btn" style="background: #6c757d;">Download</button>
                        <button id="send-email-btn">Send to Sophia</button>
                    </div>
                    <p id="close-popup" style="margin-top: 15px; cursor: pointer; text-decoration: underline;">Go back</p>
                </div>
            </div>
        </div>
        
        <div id="status-msg"></div>
    </div>
</div>