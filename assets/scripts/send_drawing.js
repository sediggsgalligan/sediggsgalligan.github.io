function initContactDrawing() {
        const canvas = document.getElementById('drawingCanvas');
        // Only run if the canvas exists on the current page
        if (!canvas || canvas.dataset.initialized) return;
        canvas.dataset.initialized = "true";

        const ctx = canvas.getContext('2d');
        const statusMsg = document.getElementById('status-msg');
        const popup = document.getElementById('popup-overlay');
        const senderEmail = document.getElementById('sender-email');
        const sendEmailBtn = document.getElementById('send-email-btn');
        
        let painting = false;
        let color = '#000000';

        // Coordinates helper
        const getCoords = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        };

        const draw = (e) => {
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
        };

        // Crayon listeners
        document.querySelectorAll('.crayon').forEach(el => {
            el.onclick = function() {
                color = this.style.backgroundColor;
                document.querySelectorAll('.crayon').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            };
        });

        // Button actions
        document.getElementById('clear-btn').onclick = () => {
            if (confirm("Clear your drawing?")) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                statusMsg.innerText = "";
            }
        };
        document.getElementById('done-btn').onclick = () => popup.style.display = 'flex';
        document.getElementById('close-popup').onclick = () => popup.style.display = 'none';

        const getFlattenedData = () => {
            const temp = document.createElement('canvas');
            temp.width = canvas.width; temp.height = canvas.height;
            const tCtx = temp.getContext('2d');
            tCtx.fillStyle = '#fff'; tCtx.fillRect(0,0,temp.width,temp.height);
            tCtx.drawImage(canvas, 0, 0);
            return temp.toDataURL("image/jpeg", 0.9);
        };

        document.getElementById('download-btn').onclick = () => {
            const link = document.createElement('a');
            link.download = 'my-drawing.jpg';
            link.href = getFlattenedData();
            link.click();
        };

        sendEmailBtn.onclick = () => {
            const email = senderEmail.value.trim();
            if (!email) return alert("Please enter your email.");
            
            // Re-fetch keys from the data attributes on the container
            const container = document.getElementById('drawing-app-container');
            const pk = atob(container.dataset.pk); 
            const sID = container.dataset.sid;
            const tID = container.dataset.tid;

            emailjs.init(pk);
            sendEmailBtn.disabled = true;
            sendEmailBtn.innerText = "Sending...";

            emailjs.send(sID, tID, {
                from_name: email,
                to_email: 'hi@sophiadg.com',
                drawing_data: getFlattenedData()
            }).then(() => {
                statusMsg.style.color = "green";
                statusMsg.innerText = "Sent!";
                popup.style.display = 'none';
                sendEmailBtn.disabled = false;
                sendEmailBtn.innerText = "Send to Sophia";
            });
        };

        // Canvas Events
        canvas.onmousedown = (e) => { painting = true; draw(e); };
        window.addEventListener('mouseup', () => { painting = false; ctx.beginPath(); });
        canvas.onmousemove = draw;
        canvas.ontouchstart = (e) => { painting = true; draw(e); };
        canvas.ontouchend = () => { painting = false; ctx.beginPath(); };
        canvas.ontouchmove = draw;
    }

    // Swup Listener
    document.addEventListener('swup:content:replace', initContactDrawing);
    document.addEventListener('swup:page:view', initContactDrawing);
    // Fallback for direct load
    window.addEventListener('load', initContactDrawing);