/**
 * Common JavaScript functionality shared between pages
 * Carlson Gracie Clapham BJJ Website
 */

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking any nav link
        const navLinksInMenu = navMenu.querySelectorAll('a');
        navLinksInMenu.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Initialize common functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});