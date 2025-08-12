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

// Shared footer functionality
function createSharedFooter() {
    const footerHTML = `
        <div class="footer-content">
            <div class="footer-section">
                <h3>Carlson Gracie Clapham</h3>
                <p>Brazilian Jiu-Jitsu • Self-Defense • Fitness</p>
                <p><a href="https://maps.app.goo.gl/vy4i7ijTR22P4Lw86" target="_blank" style="color: #b4b4b4; text-decoration: none;">68 St Rule St, Nine Elms<br>London SW8 3ED</a></p>
            </div>
            
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="index.html#about">About</a></li>
                    <li><a href="index.html#timetable">Timetable</a></li>
                    <li><a href="index.html#membership">Membership</a></li>
                    <li><a href="index.html#location">Location</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Follow Us</h3>
                <div class="footer-social">
                    <a href="https://www.facebook.com/carlsongracieclapham" target="_blank" rel="noopener" aria-label="Facebook">Facebook</a>
                    <a href="https://www.instagram.com/carlsongracieclapham" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2025 Carlson Gracie Clapham. All rights reserved.</p>
        </div>
    `;
    
    const footer = document.querySelector('.site-footer');
    if (footer) {
        footer.innerHTML = footerHTML;
    }
}

// Initialize common functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    createSharedFooter();
});