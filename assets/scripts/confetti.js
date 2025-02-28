function createConfetti(event) {
    const container = event.target.parentElement;
    
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `${Math.random() * 100}%`;
      confetti.style.animation = `confettiAnimation ${2 + Math.random() * 2}s linear forwards`;
      
      container.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 4000);
    }
  }
  
  function getRandomColor() {
    const colors = ['#ff0', '#ff6347', '#7fff00', '#00ced1', '#ff69b4'];
    return colors[Math.floor(Math.random() * colors.length)];
  }