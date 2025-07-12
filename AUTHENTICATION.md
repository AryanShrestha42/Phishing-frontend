# Authentication System

## Overview

The application now implements a complete authentication system that requires users to be logged in to access any protected routes.

## How It Works

### 1. Authentication Flow

- **Unauthenticated users** are automatically redirected to `/login`
- **Authenticated users** can access all protected routes
- **Login success** redirects users to the page they were trying to access, or the landing page

### 2. Protected Routes

All routes except `/login`, `/signup`, and `/verify-otp` are protected and require authentication.

### 3. User Session Management

- User data and session tokens are stored in localStorage
- Session persists across browser refreshes
- Logout clears all session data

### 4. Available Test Users

The following users are available in the database:

**Active Users (Can Login):**

- Username: `aryanshrrr`, Email: `aryan.201408@ncit.edu.np`
- Username: `rukstha`, Email: `ruksana.201430@ncit.edu.np`

**Inactive Users (Need OTP Verification):**

- Username: `AryanShrrr`, Email: `ryanshrestha56@gmail.com`
- Username: `ruksana`, Email: `ruksanastha71@gmail.com`

## Features

### Login Page

- Username/password authentication
- Error handling for invalid credentials
- Redirect to intended page after successful login
- Link to signup page

### Navigation

- User account menu with username and email
- Logout functionality
- Protected navigation links

### Landing Page

- Welcome message with user's username
- Access to all application features

## Technical Implementation

### Components

- `AuthContext`: Manages authentication state
- `ProtectedRoute`: Wraps protected components
- `Login`: Handles user authentication
- `AccountMenu`: User account management
- `DetectURL`: URL phishing detection component
- `DetectIntention`: Intent analysis component

### API Endpoints

- `POST /api/auth/login`: User login
- `POST /api/auth/logout`: User logout
- `POST /api/auth/signup`: User registration
- `POST /api/auth/verify-otp`: OTP verification

## Usage

1. **Start the backend server:**

   ```bash
   cd backend/GUI
   source ../venv/bin/activate
   python app.py
   ```

2. **Start the frontend server:**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application:**
   - Navigate to `http://localhost:5173`
   - You'll be redirected to the login page
   - Use one of the test credentials to log in
   - After login, you'll have access to all features

## Security Features

- Session-based authentication
- Protected route access
- Automatic logout on session expiry
- Secure password handling
- OTP verification for new accounts
