---
layout: default
title: Contact
permalink: /contact
---

<div class="plain-page">
  <h2>Say hi!</h2>
  <p>You can reach me at <a href="mailto:hi@sophiadg.com">hi@sophiadg.com</a>.</p>


<style>
        body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; background: #f0f0f0; }
        #canvas-container { position: relative; border: 5px solid #555; background: white; cursor: crosshair; }
        canvas { display: block; }
        .toolbar { margin: 15px; display: flex; gap: 10px; align-items: center; }
        .crayon { width: 30px; height: 30px; border-radius: 50%; border: 2px solid #fff; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        .crayon.active { border: 2px solid #000; transform: scale(1.1); }
        button { padding: 10px 20px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 5px; }
        button:hover { background: #0056b3; }
    </style>

    <h2>Send me a Drawing!</h2>

    <div class="toolbar">
        <div class="crayon active" style="background: #000000;" onclick="setColor('#000000', this)"></div>
        <div class="crayon" style="background: #e91e63;" onclick="setColor('#e91e63', this)"></div>
        <div class="crayon" style="background: #ff9800;" onclick="setColor('#ff9800', this)"></div>
        <div class="crayon" style="background: #4caf50;" onclick="setColor('#4caf50', this)"></div>
        <div class="crayon" style="background: #2196f3;" onclick="setColor('#2196f3', this)"></div>
        <div class="crayon" style="background: #9c27b0;" onclick="setColor('#9c27b0', this)"></div>
        
        <button onclick="clearCanvas()">Clear</button>
        <button onclick="sendEmail()" style="background: #28a745;">Prepare Email</button>
    </div>

    <div id="canvas-container">
        <canvas id="drawingCanvas" width="600" height="400"></canvas>
    </div>

    <p><small>Note: Due to browser limits, the image link will be added to the email body.</small></p>

    <script>
        const canvas = document.getElementById('drawingCanvas');
        const ctx = canvas.getContext('2d');
        let painting = false;
        let color = '#000000';

        function startPosition(e) {
            painting = true;
            draw(e);
        }

        function finishedPosition() {
            painting = false;
            ctx.beginPath();
        }

        function draw(e) {
            if (!painting) return;
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = color;

            // Adjust for canvas position
            const rect = canvas.getBoundingClientRect();
            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        }

        function setColor(newColor, element) {
            color = newColor;
            document.querySelectorAll('.crayon').forEach(c => c.classList.remove('active'));
            element.classList.add('active');
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function sendEmail() {
            // Convert canvas to a Base64 Image string
            const dataURL = canvas.toDataURL("image/png");
            
            const subject = encodeURIComponent("My Drawing");
            // Note: mailto body has character limits; very large drawings might get truncated
            const body = encodeURIComponent("Here is my drawing! \n\n(Copy and paste this link to view or right-click to save):\n\n" + dataURL);
            
            window.location.href = `mailto:hi@sophiadg.com?subject=${subject}&body=${body}`;
        }

        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', finishedPosition);
        canvas.addEventListener('mousemove', draw);
    </script>


</div>
