# InternHub Registration Portal - Task 2 Upgrade

This is a complete project for the **Cognifyz Technologies Full Stack Development Internship - Task 2**. It expands upon a basic registration portal by implementing advanced forms, client-side validation, server-side validation, and temporary server-side data storage.

## Features

- **Complex Registration Form**: Collects personal, academic, and professional details.
- **Client-Side Validation**: Real-time validation using JavaScript for instant feedback without page reload.
- **Server-Side Validation**: Secure validation using Express to ensure data integrity and prevent malicious submissions.
- **Temporary Server-Side Data Storage**: Stores valid registrations in-memory (`const users = []`) to persist across the session.
- **Admin Dashboard**: View total registrations, a formatted table of all registered users, and a search functionality.
- **Success & Error Handling**: Dedicated pages for successful registrations and error reporting.
- **Professional UI**: Modern, responsive, and mobile-friendly design using HTML and CSS3 with Google Fonts (Inter).

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Templating**: EJS

## Project Structure

```
Task2-InternHub/
├── app.js                 # Main application file & server setup
├── package.json           # Dependencies and scripts
├── README.md              # Project documentation
├── views/                 # EJS Templates
│   ├── index.ejs          # Registration form page
│   ├── dashboard.ejs      # Admin dashboard page
│   ├── success.ejs        # Success message page
│   └── error.ejs          # Error message page
└── public/                # Static files
    ├── css/
    │   └── style.css      # Custom styling
    └── js/
        └── validation.js  # Client-side validation logic
```

## Setup Instructions

1. **Ensure Node.js is installed**: Download and install from [nodejs.org](https://nodejs.org/).
2. **Open Terminal/Command Prompt** in the project directory.
3. **Install Dependencies**:
   ```bash
   npm install
   ```

## Run Commands

To start the server in production mode:
```bash
npm start
```

To start the server in development mode (using nodemon):
```bash
npm run dev
```

The server will start on `http://localhost:3000`. Open this URL in your web browser.

## Validation Details

**Client-Side (JavaScript)**:
- Name: Letters only.
- Email: Valid format checking.
- Phone: Exactly 10 digits.
- Password: Minimum 8 characters, at least one uppercase, lowercase, number, and special character.
- Confirm Password: Must match password field.

**Server-Side (Express)**:
- Checks for presence of all required fields.
- Re-evaluates Regex patterns to prevent tampering.
- Collects all errors and renders an error view if validation fails.
