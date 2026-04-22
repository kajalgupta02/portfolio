// Navigation bar sticky effect on scroll
window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  header.classList.toggle('sticky', window.scrollY > 0);
});

// Responsive navigation sidebar menu toggle
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
const navigationItems = document.querySelectorAll(".navigation a");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navigation.classList.toggle("active");
});

navigationItems.forEach((navigationItem) => {
  navigationItem.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navigation.classList.remove("active");
  });
});

// Scroll to top button visibility
const scrollBtn = document.querySelector(".scrollToTop-btn");

window.addEventListener("scroll", function() {
  scrollBtn.classList.toggle("active", window.scrollY > 500);
});

// Scroll to top functionality
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === 'light') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

// Reveal website elements on scroll
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

// Magnetic button effect for that "sassy" feel
const magneticBtns = document.querySelectorAll('.btn, .media-icons a');
magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = `translate(0px, 0px)`;
  });
});

// Custom cursor (optional, but adds to the modern look)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.classList.add('expand'));
document.addEventListener('mouseup', () => cursor.classList.remove('expand'));

// Add cursor styling to CSS via JS for simplicity or update CSS later
const style = document.createElement('style');
style.textContent = `
  .custom-cursor {
    width: 20px;
    height: 20px;
    border: 2px solid var(--secondary-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 1000;
    transition: transform 0.1s ease;
    transform: translate(-50%, -50%);
  }
  .custom-cursor.expand {
    transform: translate(-50%, -50%) scale(2);
    background: rgba(0, 212, 255, 0.2);
  }
  @media (max-width: 1040px) {
    .custom-cursor { display: none; }
  }
`;
document.head.appendChild(style);

window.addEventListener("scroll", reveal);
// Run reveal once on load to show elements already in view
window.addEventListener("load", reveal);

// Highlight active navigation item on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".navigation a");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (current && item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
});

// Contact form handler with validation and feedback
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnIcon = submitBtn.querySelector('i');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Simulation of form submission
      setLoading(true);

      const formData = { name, email, subject, message };
      console.log('Sassy Contact Form Submission:', formData);

      // Simulate network delay
      setTimeout(() => {
        setLoading(false);
        showStatus('✨ Magic sent! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        // Clear status after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }, 5000);
      }, 1500);
    });
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
  }

  function setLoading(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';
      btnIcon.className = 'fas fa-spinner fa-spin';
    } else {
      submitBtn.disabled = false;
      btnText.textContent = 'Send Magic';
      btnIcon.className = 'fas fa-paper-plane';
    }
  }
});
