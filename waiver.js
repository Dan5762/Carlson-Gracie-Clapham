/**
 * Waiver page specific JavaScript
 * Carlson Gracie Clapham BJJ Website
 */

// Initialize waiver functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as default for signature date
    const signatureDate = document.getElementById('signatureDate');
    if (signatureDate) {
        const today = new Date();
        const todayISO = today.toISOString().split('T')[0];
        signatureDate.value = todayISO;
        
        // Also populate the hidden Google Form date fields
        const signatureDateDay = document.getElementById('signatureDateDay');
        const signatureDateMonth = document.getElementById('signatureDateMonth');
        const signatureDateYear = document.getElementById('signatureDateYear');
        
        if (signatureDateDay && signatureDateMonth && signatureDateYear) {
            signatureDateDay.value = today.getDate();
            signatureDateMonth.value = today.getMonth() + 1; // getMonth() returns 0-11
            signatureDateYear.value = today.getFullYear();
        }
    }
    
    // Populate year dropdown for date of birth
    const dobYear = document.getElementById('dobYear');
    if (dobYear) {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 100; // Allow up to 100 years ago
        const endYear = currentYear - 13; // Minimum age 13
        
        for (let year = endYear; year >= startYear; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            dobYear.appendChild(option);
        }
    }
});

// Handle waiver form submission
async function handleWaiverSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitWaiverBtn');
    const formStatus = document.getElementById('waiverFormStatus');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnCheckmark = submitBtn.querySelector('.btn-checkmark');
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Submitting...';
    
    // Get form data
    const formData = new FormData(document.getElementById('waiverSignForm'));
    // Google Form ID for waiver form
    const GOOGLE_FORM_ID = '1FAIpQLSdQ9vNA_rabl-guWsz5RjW2obZXxze4bKVHUbnEEeZeHqzfRA';
    const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
    
    // Create URL-encoded form data for Google Forms
    const urlEncodedData = new URLSearchParams();
    for (const pair of formData) {
        urlEncodedData.append(pair[0], pair[1]);
    }
    
    // Debug: Log the form data being sent
    console.log('Form data being sent:');
    for (const [key, value] of urlEncodedData) {
        console.log(`${key}: ${value}`);
    }
    
    try {
        // Submit to Google Forms
        const response = await fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            mode: 'no-cors', // This bypasses CORS but we won't get response details
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: urlEncodedData
        });
        
        // Show success state on button
        submitBtn.classList.add('success');
        btnText.textContent = 'Waiver Signed';
        btnCheckmark.style.display = 'inline-block';
        
        // Show success message
        formStatus.className = 'form-status success';
        formStatus.innerHTML = '<strong>Waiver signed successfully!</strong><br>Thank you for completing the waiver form. We look forward to training with you.';
        formStatus.style.display = 'block';
        
        // Scroll to success message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Keep button in success state (don't reset since waiver should only be signed once)
        
    } catch (error) {
        // Show error message
        formStatus.className = 'form-status error';
        formStatus.innerHTML = 'There was an error submitting your waiver. Please try again or contact us directly.';
        formStatus.style.display = 'block';
        
        // Reset button to original state
        submitBtn.disabled = false;
        btnText.textContent = 'Sign Waiver';
        
        console.error('Waiver form submission error:', error);
    }
    
    return false;
}