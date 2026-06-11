const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Temporary in-memory storage for users
const users = [];

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Server-side validation middleware
const validateRegistration = (req, res, next) => {
    const { 
        fullName, email, phone, college, branch, 
        year, domain, password, confirmPassword 
    } = req.body;
    
    const errors = [];

    // Check required fields
    if (!fullName || !email || !phone || !college || !branch || !year || !domain || !password || !confirmPassword) {
        errors.push("All required fields must be filled.");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        errors.push("Invalid email format.");
    }

    // Phone validation (exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (phone && !phoneRegex.test(phone)) {
        errors.push("Phone number must be exactly 10 digits.");
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (password && !passwordRegex.test(password)) {
        errors.push("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
    }

    // Confirm password matching
    if (password !== confirmPassword) {
        errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
        return res.status(400).render('error', { errors, formData: req.body });
    }

    next();
};

// Routes

// Home page (Registration Form)
app.get('/', (req, res) => {
    res.render('index');
});

// Registration submission
app.post('/register', validateRegistration, (req, res) => {
    const newUser = {
        id: 'REG' + Date.now().toString().slice(-6),
        ...req.body,
        registrationDate: new Date().toLocaleString()
    };
    
    // Store user temporarily
    users.push(newUser);
    
    // Redirect to success page with data
    res.render('success', { user: newUser });
});

// Dashboard page
app.get('/dashboard', (req, res) => {
    // Search functionality
    let displayedUsers = users;
    const searchQuery = req.query.search;
    
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        displayedUsers = users.filter(u => 
            u.fullName.toLowerCase().includes(lowerQuery) || 
            u.email.toLowerCase().includes(lowerQuery) ||
            u.id.toLowerCase().includes(lowerQuery)
        );
    }
    
    res.render('dashboard', { 
        users: displayedUsers, 
        totalUsers: users.length,
        searchQuery: searchQuery || ''
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
