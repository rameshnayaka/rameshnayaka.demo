document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  // 1. Sticky header shadow on scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case page loads scrolled down

  // 2. Mobile navigation toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('nav--open');
      navToggle.classList.toggle('nav-toggle--open', isOpen);
      
      // Accessibility attributes
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // 3. Navigation interaction (active states & placeholder scroll handling)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Remove active states from all links
      navLinks.forEach(item => item.classList.remove('nav__link--active'));
      
      // Set active state on the clicked link
      link.classList.add('nav__link--active');
      
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        
        if (!targetElement) {
          // If the section doesn't exist on the wireframe home page, prevent default action
          e.preventDefault();
          
          // Smooth scroll to top of page as a feedback gesture
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          
          // Log click for verification
          console.log(`Navigated to placeholder section: ${targetId}`);
        }
      }
    });
  });

  // Handle CTA buttons click feedback
  const ctaButtons = document.querySelectorAll('.hero__actions .btn');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) {
          e.preventDefault();
          console.log(`CTA clicked for placeholder section: ${targetId}`);
        }
      }
    });
  });
});
