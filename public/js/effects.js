// Hiệu ứng tương tác cho website

// Hàm tạo hiệu ứng particles khi hover
function initParticlesEffect() {
  const particlesContainers = document.querySelectorAll('.particles-container');
  
  particlesContainers.forEach(container => {
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const particle = document.createElement('span');
      const size = Math.random() * 8 + 2;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      
      container.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 1500);
    });
  });
}

// Hàm tạo hiệu ứng parallax cho các phần tử
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 20;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;
      
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// Hàm tạo hiệu ứng typing cho các text
function initTypingEffect() {
  const typingElements = document.querySelectorAll('.typing-effect');
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
  });
}

// Hàm tạo hiệu ứng reveal khi scroll
function initScrollRevealEffect() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  function checkScroll() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Check on load
}

// Hàm tạo hiệu ứng hover 3D cho các card
function init3DCardEffect() {
  const cards = document.querySelectorAll('.card-3d');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
}

// Khởi tạo các hiệu ứng khi trang đã tải xong
document.addEventListener('DOMContentLoaded', () => {
  initParticlesEffect();
  initParallaxEffect();
  initTypingEffect();
  initScrollRevealEffect();
  init3DCardEffect();
});

// Thêm class cho các phần tử khi chúng xuất hiện trong viewport
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
});