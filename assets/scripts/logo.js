gsap.registerPlugin(Draggable);

let draggableInstances = [];
const SOPHIA = "SOPHIADIGGS-GALLIGAN";

// --- PERSISTENCE STATE ---
let currentOrder = null; 
let lastInteractionTime = Date.now();
let hasInteracted = false;
let idleCheckInterval;

function initSignature() {
  draggableInstances.forEach(d => d.kill());
  draggableInstances = [];

  const svg = document.querySelector('.site-title svg');
  const characters = Array.from(document.querySelectorAll('.char'));
  if (!svg || characters.length === 0) return;

  // Prevent mobile browser bouncing/scrolling while dragging
  svg.style.touchAction = "none";

  if (!currentOrder) {
    currentOrder = characters.map((_, i) => i);
  }

  gsap.set(characters, { x: 0, y: 0 });

  const charData = characters.map((el, i) => {
    const box = el.getBBox();
    
    // INCREASE HITBOX SIZE HERE
    // 15-20px is generally the "sweet spot" for finger precision
    const hitboxPadding = 15; 

    if (!el.querySelector('rect.hitbox')) {
      const hitBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      hitBox.setAttribute("class", "hitbox");
      
      // Expand the rectangle dimensions beyond the natural bounding box
      hitBox.setAttribute("x", box.x - hitboxPadding);
      hitBox.setAttribute("y", box.y - hitboxPadding);
      hitBox.setAttribute("width", box.width + (hitboxPadding * 2));
      hitBox.setAttribute("height", box.height + (hitboxPadding * 2));
      
      hitBox.setAttribute("fill", "transparent");
      hitBox.style.pointerEvents = "all";
      
      // Tip: Change "transparent" to "rgba(255,0,0,0.2)" to visualize the hitboxes while testing
      el.insertBefore(hitBox, el.firstChild);
    }

    return {
      el: el,
      width: box.width,
      naturalX: box.x,
      nextGap: (i < characters.length - 1) 
        ? (characters[i+1].getBBox().x - (box.x + box.width)) 
        : 0
    };
  });

  const originX = charData[0].naturalX;
  let draggingEl = null;
  const animState = characters.map((_, i) => {
    const slots = getDynamicPositions(currentOrder);
    const charIdxInOrder = currentOrder.indexOf(i);
    return { current: slots[charIdxInOrder] - charData[i].naturalX };
  });

  function getDynamicPositions(orderArr) {
    let cursor = originX;
    return orderArr.map((charIdx, i) => {
      const xPos = cursor;
      const charWidth = charData[charIdx].width;
      const gap = charData[i] ? charData[i].nextGap : 0;
      cursor += charWidth + gap;
      return xPos;
    });
  }

  function updatePositions() {
    const slotXPositions = getDynamicPositions(currentOrder);
    currentOrder.forEach((charIdx, slotIdx) => {
      if (characters[charIdx] === draggingEl) return;
      const char = charData[charIdx];
      const targetOffset = slotXPositions[slotIdx] - char.naturalX;
      
      const diff = targetOffset - animState[charIdx].current;
      if (Math.abs(diff) > 0.01) {
        animState[charIdx].current += diff * 0.18;
        gsap.set(char.el, { x: animState[charIdx].current });
      }
    });
    requestAnimationFrame(updatePositions);
  }
  requestAnimationFrame(updatePositions);

  currentOrder.forEach((charIdx, slotIdx) => {
    const slots = getDynamicPositions(currentOrder);
    gsap.set(characters[charIdx], { 
      x: slots[slotIdx] - charData[charIdx].naturalX,
      opacity: 1 
    });
  });

  draggableInstances = Draggable.create(characters, {
    type: "x,y",
    onDragStart: function() {
      draggingEl = this.target;
      gsap.set(this.target, { zIndex: 100 });
      // Visual feedback: pop the letter up slightly when grabbed
      gsap.to(this.target, { scale: 1.1, duration: 0.2 });
      resetIdleTimer();
    },
    onDrag: function() {
      const charIdx = characters.indexOf(this.target);
      const currentVisualX = charData[charIdx].naturalX + gsap.getProperty(this.target, "x");
      const slots = getDynamicPositions(currentOrder);
      
      let nearestSlot = 0;
      let minDistance = Infinity;
      slots.forEach((slotX, i) => {
        const dist = Math.abs(slotX - currentVisualX);
        if (dist < minDistance) { minDistance = dist; nearestSlot = i; }
      });

      const currentSlot = currentOrder.indexOf(charIdx);
      if (nearestSlot !== currentSlot) {
        currentOrder.splice(currentSlot, 1);
        currentOrder.splice(nearestSlot, 0, charIdx);
      }
    },
    onDragEnd: function() {
      const charIdx = characters.indexOf(this.target);
      const slots = getDynamicPositions(currentOrder);
      const slotIdx = currentOrder.indexOf(charIdx);
      const finalOffset = slots[slotIdx] - charData[charIdx].naturalX;
      
      gsap.to(this.target, {
        x: finalOffset, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          animState[charIdx].current = finalOffset;
          gsap.set(this.target, { zIndex: "" });
          draggingEl = null;
          check_resorted_for_easter_eggs(currentOrder.map(i => SOPHIA[i]).join(''));
        }
      });
    }
  });

  startIdleDetection();
}

// --- IDLE ANIMATION LOGIC ---
function resetIdleTimer() {
  lastInteractionTime = Date.now();
  hasInteracted = true;
}

function triggerAttentionJump() {
  const characters = document.querySelectorAll('.char');
  if (characters.length === 0) return;
  const randomIdx = Math.floor(Math.random() * characters.length);
  const char = characters[randomIdx];
  gsap.timeline()
    .to(char, { y: -30, duration: 0.25, ease: "power2.out" })
    .to(char, { y: 0, duration: 0.45, ease: "bounce.out" });
}

function startIdleDetection() {
  if (idleCheckInterval) clearInterval(idleCheckInterval);
  idleCheckInterval = setInterval(() => {
    const now = Date.now();
    const idleTime = now - lastInteractionTime;
    const threshold = hasInteracted ? 60000 : 30000;
    if (idleTime >= threshold) {
      triggerAttentionJump();
      lastInteractionTime = now - (threshold - 5000);
    }
  }, 1000);
}

// --- UTILITIES & EASTER EGGS ---
function check_resorted_for_easter_eggs(orderStr) {
  let order_no_dash = orderStr.replace(/-/g, '');
  if (orderStr === "NAGILLAG-SGGIDAIHPOS") {
    gsap.to("body", { scaleX: -1, duration: 1, ease: "power2.inOut" });
  }
  if (order_no_dash === "AAADGGGGHIIILLNOPSS" || order_no_dash === "SSPONLLIIIHGGGGDAAA") {
    const chars = document.querySelectorAll('.char');
    resetSignaturePositions(); 
    chars.forEach((char, i) => {
      const letterColor = `hsl(${(i * 30) % 360}, 80%, 60%)`;
      const paths = char.querySelectorAll('path');
      gsap.to(paths, {
        y: -20, stroke: letterColor, duration: 0.6, ease: "sine.inOut", 
        repeat: -1, yoyo: true, delay: i * 0.1
      });
    });
  }
}

function triggerWelcomeWiggle() {
  const characters = document.querySelectorAll('.char');
  const charArray = Array.from(characters);

  const ordered_chars = charArray.sort((a, b) => {
    const idA = charArray.indexOf(a);
    const idB = charArray.indexOf(b);
    return currentOrder.indexOf(idA) - currentOrder.indexOf(idB);
  });

  ordered_chars.forEach((char, i) => {
    const tl = gsap.timeline({ delay: i * 0.08 });
    tl.to(char, { y: -7, duration: 0.2, ease: "sine.out" })
      .to(char, { y: 3, duration: 0.35, ease: "sine.inOut" })
      .to(char, { y: 0, duration: 0.4, ease: "back.out(2)" });
  });
}

function resetSignaturePositions() {
  const characters = document.querySelectorAll('.char');
  if (!characters.length) return;

  currentOrder = Array.from(characters).map((_, i) => i);
  lastInteractionTime = Date.now();
  hasInteracted = false;

  gsap.to(characters, {
    x: 0,
    y: 0,
    duration: 0.8,
    ease: "elastic.out(1, 0.75)",
    stagger: 0.02,
    onComplete: () => {
      characters.forEach((_, i) => {
        if (typeof animState !== 'undefined' && animState[i]) {
          animState[i].current = 0;
        }
      });
    }
  });
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initSignature, 150);
});

if (document.readyState === "complete") { initSignature(); } 
else { window.addEventListener("load", initSignature); }

window.addEventListener('load', triggerWelcomeWiggle);

if (typeof swup !== 'undefined') {
  swup.hooks.on('page:view', initSignature);
}