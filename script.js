/**
 * Carlson Gracie Clapham - BJJ Website JavaScript
 * Clean, readable JavaScript for the BJJ gym website
 */

// Load content from content.json
async function loadContent() {
    try {
        const response = await fetch('content.json');
        const content = await response.json();
        
        // About section
        const aboutBlocks = document.querySelectorAll('.feature-block');
        content.about.blocks.forEach((block, index) => {
            if (aboutBlocks[index]) {
                const textElement = aboutBlocks[index].querySelector('.section-text');
                if (textElement) {
                    textElement.textContent = block.text;
                }
            }
        });
        
        // FAQ section
        const faqItems = document.querySelectorAll('.faq-item');
        content.faq.questions.forEach((question, index) => {
            if (faqItems[index]) {
                const answerElement = faqItems[index].querySelector('.faq-answer-content .section-text');
                if (answerElement) {
                    answerElement.textContent = question.answer;
                }
            }
        });
        
        // Location description
        const locationText = document.querySelector('#location .section-text');
        if (locationText) {
            locationText.textContent = content.location.description;
        }
        
        // Sign-up section
        const signUpTitle = document.querySelector('#sign-up .section-title');
        const signUpText = document.querySelector('#sign-up .section-text');
        if (signUpTitle) {
            signUpTitle.textContent = content.signUp.title;
        }
        if (signUpText) {
            signUpText.textContent = content.signUp.description;
        }
        
        // Footer
        const footerBrand = document.querySelector('.footer-section h3');
        const footerTagline = document.querySelector('.footer-section p:first-of-type');
        const footerLocation = document.querySelector('.footer-section p:nth-of-type(2)');
        const footerCopyright = document.querySelector('.footer-bottom p');
        
        if (footerBrand) {
            footerBrand.textContent = content.footer.brand.name;
        }
        if (footerTagline) {
            footerTagline.textContent = content.footer.brand.tagline;
        }
        if (footerLocation) {
            footerLocation.textContent = content.footer.brand.location;
        }
        if (footerCopyright) {
            footerCopyright.textContent = content.footer.copyright;
        }
        
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Smooth scrolling for navigation links (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
    // Load content from JSON
    loadContent();
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
    
    // Make membership tiles clickable
    const membershipPlans = document.querySelectorAll('.membership-plan');
    
    membershipPlans.forEach(plan => {
        plan.addEventListener('click', function(e) {
            // Prevent multiple clicks if clicking the button itself
            if (e.target.classList.contains('btn')) {
                return;
            }
            
            // Find the sign-up button within this plan and click it
            const signUpBtn = this.querySelector('.btn');
            if (signUpBtn) {
                signUpBtn.click();
            }
        });
    });
    
    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const faqContent = faqItem.querySelector('.faq-answer-content');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items smoothly
            document.querySelectorAll('.faq-item').forEach(item => {
                const answer = item.querySelector('.faq-answer');
                const question = item.querySelector('.faq-question');
                
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                answer.style.height = '0px';
            });
            
            // Toggle the clicked item
            if (!isActive) {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                
                // Calculate and set the actual height
                const contentHeight = faqContent.scrollHeight;
                faqAnswer.style.height = contentHeight + 'px';
            }
        });
    });
    
    // Mobile menu functionality is now in common.js
    
    // Copy email to clipboard functionality
    const copyEmailBtn = document.querySelector('.copy-email');
    
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async function() {
            const email = this.getAttribute('data-email');
            const copyText = this.querySelector('.copy-text');
            const copiedText = this.querySelector('.copied-text');
            
            try {
                await navigator.clipboard.writeText(email);
                
                // Show success message
                copyText.style.display = 'none';
                copiedText.style.display = 'inline';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    copyText.style.display = 'inline';
                    copiedText.style.display = 'none';
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                const tempInput = document.createElement('input');
                tempInput.value = email;
                tempInput.style.position = 'fixed';
                tempInput.style.left = '-9999px';
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                // Show success message
                copyText.style.display = 'none';
                copiedText.style.display = 'inline';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    copyText.style.display = 'inline';
                    copiedText.style.display = 'none';
                }, 2000);
            }
        });
    }
    
    
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