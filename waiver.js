/**
 * Waiver page specific JavaScript
 * Carlson Gracie Clapham BJJ Website
 */

// Initialize waiver functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as default for signature date
    const signatureDate = document.getElementById('signatureDate');
    if (signatureDate) {
        const today = new Date().toISOString().split('T')[0];
        signatureDate.value = today;
    }
});

// Handle waiver form submission
function handleWaiverSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitWaiverBtn');
    const formStatus = document.getElementById('waiverFormStatus');
    
    // Show loading state
    submitBtn.classList.add('success');
    submitBtn.querySelector('.btn-text').textContent = 'Submitting...';
    
    // Simulate form submission
    setTimeout(function() {
        // Show success message
        formStatus.innerHTML = '<strong>Waiver signed successfully!</strong><br>Thank you for completing the waiver form. We look forward to training with you.';
        formStatus.className = 'form-status success';
        
        // Update button
        submitBtn.querySelector('.btn-text').textContent = 'Waiver Signed';
        submitBtn.disabled = true;
        
        // Scroll to status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 2000);
    
    return false;
}