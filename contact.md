---
layout: default
title: Contact
permalink: /contact
---

<div class="plain-page">
    <h2>Say hi!</h2>
    <p>You can reach me at <a href="mailto:hi@sophiadg.com">hi@sophiadg.com</a>.</p>

    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

    <style>
        .drawing-section { display: flex; flex-direction: column; align-items: center; margin-top: 30px; position: relative; }
        #canvas-container { border: 5px solid #555; background: white; cursor: crosshair; touch-action: none; position: relative; width: 600px; height: 400px; }
        canvas { display: block; }
        .toolbar { margin: 15px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap; justify-content: center; }
        .crayon { width: 30px; height: 30px; border-radius: 50%; border: 2px solid #fff; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        .crayon.active { border: 2px solid #000; transform: scale(1.1); }
        
        button { padding: 10px 20px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 5px; font-weight: bold; }
        button:hover { background: #0056b3; }
        .btn-clear { background: #dc3545; }
        .btn-clear:hover { background: #c82333; }
        .btn-done { background: #28a745; }
        .btn-done:hover { background: #218838; }

        /* Popup Overlay */
        #popup-overlay {
            display: none;
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(50, 50, 50, 0.9);
            color: white;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10;
            border-radius: 2px;
        }
        .popup-content { text-align: center; width: 80%; }
        .popup-content input { padding: 10px; width: 100%; margin: 10px 0; border-radius: 4px; border: none; }
        .popup-actions { display: flex; gap: 10px; justify-content: center; margin-top: 10px; }
        .btn-download { background: #6c757d; }
        
        #status-msg { margin-top: 10px; font-weight: bold; min-height: 1.2em; }
    </style>

    <div class="drawing-section">
        <h2>Send me a Drawing!</h2>

        <div class="toolbar">
            <div class="crayon active" style="background: #000000;" onclick="setColor('#000000', this)"></div>
            <div class="crayon" style="background: #FF7700;" onclick="setColor('#FF7700', this)"></div>
            <div class="crayon" style="background: #F7AD00;" onclick="setColor('#F7AD00', this)"></div>
            <div class="crayon" style="background: #00AB1D;" onclick="setColor('#00AB1D', this)"></div>
            <div class="crayon" style="background: #00859D;" onclick="setColor('#00859D', this)"></div>
            <div class="crayon" style="background: #E17FEB;" onclick="setColor('#E17FEB', this)"></div>
            
            <button class="btn-clear" onclick="confirmClear()">Clear</button>
            <button id="done-btn" class="btn-done" onclick="showPopup()">Done</button>
        </div>

        <div id="canvas-container">
            <canvas id="drawingCanvas" width="600" height="400"></canvas>
            
            <div id="popup-overlay">
                <div class="popup-content">
                    <h3>Share your art!</h3>
                    <input type="email" id="sender-email" placeholder="From: name@example.com">
                    <div class="popup-actions">
                        <button class="btn-download" onclick="downloadDrawing()">Download</button>
                        <button id="send-email-btn" onclick="sendEmail()">Send to Sophia</button>
                    </div>
                    <p style="margin-top: 15px; cursor: pointer; font-size: 0.8em; text-decoration: underline;" onclick="hidePopup()">Go back to drawing</p>
                </div>
            </div>
        </div>
        
        <div id="status-msg"></div>
    </div>

    <script>
        const _getK = () => {
            const encoded = "{{ site.env.EMAILJS_PUBLIC_KEY | base64_encode }}";
            return encoded; 
        };
        
        const canvas = document.getElementById('drawingCanvas');
        const ctx = canvas.getContext('2d');
        const statusMsg = document.getElementById('status-msg');
        const popup = document.getElementById('popup-overlay');
        const senderEmail = document.getElementById('sender-email');
        const sendEmailBtn = document.getElementById('send-email-btn');
        
        let painting = false;
        let color = '#000000';

        function getCoords(e) {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        }

        function startPosition(e) { painting = true; draw(e); }
        function finishedPosition() { painting = false; ctx.beginPath(); }

        function draw(e) {
            if (!painting) return;
            e.preventDefault();
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = color;
            const coords = getCoords(e);
            ctx.lineTo(coords.x, coords.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(coords.x, coords.y);
        }

        function setColor(newColor, element) {
            color = newColor;
            document.querySelectorAll('.crayon').forEach(c => c.classList.remove('active'));
            element.classList.add('active');
        }

        function confirmClear() {
            if (confirm("Are you sure you want to clear your drawing?")) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                statusMsg.innerText = "";
            }
        }

        function showPopup() { popup.style.display = 'flex'; }
        function hidePopup() { popup.style.display = 'none'; }

        // Helper function to flatten the canvas onto a white background
        function getFlattenedDataURL() {
            // Create a temporary canvas
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tempCtx = tempCanvas.getContext('2d');

            // 1. Fill the background with white
            tempCtx.fillStyle = '#ffffff';
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

            // 2. Draw the original canvas content on top
            tempCtx.drawImage(canvas, 0, 0);

            return tempCanvas.toDataURL("image/jpeg", 0.9); // JPEG is smaller and doesn't support transparency
        }

        function downloadDrawing() {
            const link = document.createElement('a');
            link.download = 'sophiadg-doodle.jpg';
            link.href = getFlattenedDataURL();
            link.click();
        }

        function sendEmail() {
            const emailValue = senderEmail.value.trim();
            if (!emailValue) {
                alert("Please enter your email address.");
                return;
            }

            // JUST-IN-TIME INITIALIZATION
            // We initialize right before the send call using our "built" key
            emailjs.init(_getK());

            const dataURL = getFlattenedDataURL();
            
            sendEmailBtn.disabled = true;
            sendEmailBtn.innerText = "Sending...";

            const templateParams = {
                from_name: emailValue,
                to_email: 'hi@sophiadg.com',
                drawing_data: dataURL 
            };

            // Pulling IDs from injected environment variables
            const sID = "{{ site.env.EMAILJS_SERVICE_ID }}";
            const tID = "{{ site.env.EMAILJS_TEMPLATE_ID }}";

            emailjs.send(sID, tID, templateParams)
                .then(function() {
                    statusMsg.style.color = "green";
                    statusMsg.innerText = "Drawing sent successfully!";
                    hidePopup();
                    sendEmailBtn.disabled = false;
                    sendEmailBtn.innerText = "Send to Sophia";
                }, function(error) {
                    statusMsg.style.color = "red";
                    statusMsg.innerText = "Failed to send.";
                    sendEmailBtn.disabled = false;
                });
        }

        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', finishedPosition);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('touchstart', startPosition);
        canvas.addEventListener('touchend', finishedPosition);
        canvas.addEventListener('touchmove', draw);
    </script>
</div>