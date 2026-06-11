document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    
    // Select all inputs
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    // Regular Expressions
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Utility function to set error
    function setError(element, message) {
        const errorElement = document.getElementById(`${element.id}Error`);
        if(errorElement) {
            errorElement.innerText = message;
        }
        element.classList.add('invalid');
        element.classList.remove('valid');
    }

    // Utility function to set success
    function setSuccess(element) {
        const errorElement = document.getElementById(`${element.id}Error`);
        if(errorElement) {
            errorElement.innerText = '';
        }
        element.classList.remove('invalid');
        element.classList.add('valid');
    }

    // Live Validation Listeners
    if(fullName) {
        fullName.addEventListener('input', () => {
            if (!fullName.value.trim()) {
                setError(fullName, 'Name is required');
            } else if (!nameRegex.test(fullName.value)) {
                setError(fullName, 'Name must contain only letters');
            } else {
                setSuccess(fullName);
            }
        });
    }

    if(email) {
        email.addEventListener('input', () => {
            if (!email.value.trim()) {
                setError(email, 'Email is required');
            } else if (!emailRegex.test(email.value)) {
                setError(email, 'Enter a valid email address');
            } else {
                setSuccess(email);
            }
        });
    }

    if(phone) {
        phone.addEventListener('input', () => {
            if (!phone.value.trim()) {
                setError(phone, 'Phone number is required');
            } else if (!phoneRegex.test(phone.value)) {
                setError(phone, 'Phone number must be exactly 10 digits');
            } else {
                setSuccess(phone);
            }
        });
    }

    if(password) {
        password.addEventListener('input', () => {
            if (!password.value) {
                setError(password, 'Password is required');
            } else if (!passwordRegex.test(password.value)) {
                setError(password, 'Password must be 8+ chars with uppercase, lowercase, number, and special char');
            } else {
                setSuccess(password);
            }
            // Re-validate confirm password if password changes
            if(confirmPassword.value) {
                if (password.value !== confirmPassword.value) {
                    setError(confirmPassword, 'Passwords do not match');
                } else {
                    setSuccess(confirmPassword);
                }
            }
        });
    }

    if(confirmPassword) {
        confirmPassword.addEventListener('input', () => {
            if (!confirmPassword.value) {
                setError(confirmPassword, 'Please confirm your password');
            } else if (password.value !== confirmPassword.value) {
                setError(confirmPassword, 'Passwords do not match');
            } else {
                setSuccess(confirmPassword);
            }
        });
    }

    // Form Submit Validation
    if(form) {
        form.addEventListener('submit', (e) => {
            let isValid = true;

            // Trigger all input events to show errors if fields are empty
            const inputs = form.querySelectorAll('input[required], select[required]');
            inputs.forEach(input => {
                const event = new Event('input');
                input.dispatchEvent(event);
                
                if(input.classList.contains('invalid') || !input.value) {
                    isValid = false;
                    if(!input.value) {
                        setError(input, 'This field is required');
                    }
                }
            });

            if (!isValid) {
                e.preventDefault(); // Prevent form submission if there are errors
            }
        });
    }
});
