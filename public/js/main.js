document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('photo');
    const photoUpload = document.getElementById('photoUpload');
    const photoPreview = document.getElementById('photoPreview');
    const previewImage = document.getElementById('previewImage');
    const removePhotoBtn = document.getElementById('removePhoto');
    
    // Logo upload elements
    const logoInput = document.getElementById('logo');
    const logoUpload = document.getElementById('logoUpload');
    const logoPreview = document.getElementById('logoPreview');
    const logoPreviewImage = document.getElementById('logoPreviewImage');
    const removeLogoBtn = document.getElementById('removeLogo');
    
    const cardForm = document.getElementById('cardForm');

    // Photo upload functionality
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                photoPreview.style.display = 'block';
                photoUpload.querySelector('.upload-placeholder').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    // Logo upload functionality
    logoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                logoPreviewImage.src = e.target.result;
                logoPreview.style.display = 'block';
                logoUpload.querySelector('.upload-placeholder').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    // Remove photo functionality
    removePhotoBtn.addEventListener('click', function() {
        photoInput.value = '';
        photoPreview.style.display = 'none';
        photoUpload.querySelector('.upload-placeholder').style.display = 'block';
    });

    // Remove logo functionality
    removeLogoBtn.addEventListener('click', function() {
        logoInput.value = '';
        logoPreview.style.display = 'none';
        logoUpload.querySelector('.upload-placeholder').style.display = 'block';
    });

    // Drag and drop functionality for photo
    photoUpload.addEventListener('dragover', function(e) {
        e.preventDefault();
        photoUpload.style.borderColor = '#667eea';
        photoUpload.style.background = '#f8f9ff';
    });

    photoUpload.addEventListener('dragleave', function(e) {
        e.preventDefault();
        photoUpload.style.borderColor = '#ddd';
        photoUpload.style.background = 'white';
    });

    photoUpload.addEventListener('drop', function(e) {
        e.preventDefault();
        photoUpload.style.borderColor = '#ddd';
        photoUpload.style.background = 'white';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                photoInput.files = files;
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    photoPreview.style.display = 'block';
                    photoUpload.querySelector('.upload-placeholder').style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        }
    });

    // Drag and drop functionality for logo
    logoUpload.addEventListener('dragover', function(e) {
        e.preventDefault();
        logoUpload.style.borderColor = '#667eea';
        logoUpload.style.background = '#f8f9ff';
    });

    logoUpload.addEventListener('dragleave', function(e) {
        e.preventDefault();
        logoUpload.style.borderColor = '#ddd';
        logoUpload.style.background = 'white';
    });

    logoUpload.addEventListener('drop', function(e) {
        e.preventDefault();
        logoUpload.style.borderColor = '#ddd';
        logoUpload.style.background = 'white';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                logoInput.files = files;
                const reader = new FileReader();
                reader.onload = function(e) {
                    logoPreviewImage.src = e.target.result;
                    logoPreview.style.display = 'block';
                    logoUpload.querySelector('.upload-placeholder').style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        }
    });

    // Form validation
    cardForm.addEventListener('submit', function(e) {
        const requiredFields = cardForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff4757';
                field.focus();
            } else {
                field.style.borderColor = '#ddd';
            }
        });

        if (!isValid) {
            e.preventDefault();
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Show loading state
        const submitBtn = cardForm.querySelector('.generate-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Card...';
        submitBtn.disabled = true;

        // Reset button after form submission (in case of error)
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 10000);
    });

    // Input formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/(\d{3})/, '($1)');
            }
            e.target.value = value;
        });
    });

    // Student ID formatting
    const studentIdInput = document.getElementById('studentId');
    studentIdInput.addEventListener('input', function(e) {
        let value = e.target.value.toUpperCase();
        e.target.value = value;
    });

    // Set default card expiry date (4 years from today)
    const today = new Date();
    const fourYearsLater = new Date(today.getFullYear() + 4, today.getMonth(), today.getDate());
    document.getElementById('cardExpiry').value = fourYearsLater.toISOString().split('T')[0];
    
    // Set default issue date to today
    document.getElementById('issueDate').value = today.toISOString().split('T')[0];

    // Real-time validation feedback
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ff4757';
            } else {
                this.style.borderColor = '#ddd';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
        });
    });

    // Date validation for card expiry
    const cardExpiryInput = document.getElementById('cardExpiry');
    cardExpiryInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const issueDate = new Date(document.getElementById('issueDate').value);
        
        if (selectedDate <= issueDate) {
            this.style.borderColor = '#ff4757';
            showNotification('Card expiry date must be after issue date', 'error');
        } else {
            this.style.borderColor = '#ddd';
        }
    });

    // Date validation for issue date
    const issueDateInput = document.getElementById('issueDate');
    issueDateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const expiryDate = new Date(document.getElementById('cardExpiry').value);
        
        if (selectedDate >= expiryDate) {
            this.style.borderColor = '#ff4757';
            showNotification('Issue date must be before expiry date', 'error');
        } else {
            this.style.borderColor = '#ddd';
        }
    });

    // Date of birth validation
    const dobInput = document.getElementById('dateOfBirth');
    dobInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        
        if (selectedDate >= today) {
            this.style.borderColor = '#ff4757';
            showNotification('Date of birth cannot be in the future', 'error');
        } else if (selectedDate > eighteenYearsAgo) {
            this.style.borderColor = '#ff9f43';
            showNotification('Note: Student appears to be under 18', 'info');
        } else {
            this.style.borderColor = '#ddd';
        }
    });
});

// Utility function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff4757' : '#2ecc71'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Download functionality for generated cards
function downloadCard() {
    const card = document.querySelector('.student-card');
    if (!card) return;

    // Use html2canvas library if available, otherwise fallback to basic method
    if (typeof html2canvas !== 'undefined') {
        html2canvas(card, {
            backgroundColor: null,
            scale: 2,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'student_id_card.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    } else {
        // Fallback method
        showNotification('Right-click on the card and select "Save image as..."', 'info');
    }
}