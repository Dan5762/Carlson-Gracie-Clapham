/**
 * Carlson Gracie Clapham - BJJ Website JavaScript
 * Clean, readable JavaScript for the BJJ gym website
 */

// Smooth scrolling for navigation links (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Optional: Add active navigation highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav a[href^="#"]');
    
    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', highlightNavigation);
    
    // Optional: Add mobile menu functionality if needed
    // This is a placeholder for future mobile menu implementation
    
    console.log('Carlson Gracie Clapham website loaded successfully');
});

// Framer tracking script (from original export)
// This maintains the original Framer analytics if needed
(function() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://events.framer.com/script?v=2';
    script.setAttribute('data-fid', '8079b8aa5b0502805b5498e73a3c0a3c7b1ab21fee176948deffb81f011571a3');
    script.setAttribute('data-no-nt', '');
    document.head.appendChild(script);
})();