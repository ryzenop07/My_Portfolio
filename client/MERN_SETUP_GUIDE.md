# MERN Portfolio - Complete Setup Guide

## ✅ Backend Structure Created

```
server/
├── config/
│   └── db.js                 # MongoDB connection
├── models/
│   ├── Admin.js              # Admin model with bcrypt
│   ├── Skill.js              # Skills model
│   ├── Project.js            # Projects model
│   ├── Experience.js         # Experience model
│   └── Certificate.js        # Certificates model
├── controllers/
│   ├── authController.js     # Login/Register logic
│   ├── skillController.js    # Skills CRUD
│   ├── projectController.js  # Projects CRUD
│   ├── experienceController.js
│   └── certificateController.js
├── routes/
│   ├── auth.js               # Auth routes
│   ├── skills.js             # Skills routes
│   ├── projects.js           # Projects routes
│   ├── experiences.js        # Experience routes
│   └── certificates.js       # Certificate routes
├── middleware/
│   └── auth.js               # JWT authentication
├── server.js                 # Main Express server
├── package.json
├── .env.example
└── README.md
```

## 🚀 Next Steps

### 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### 2. Frontend Updates Needed

Update your Next.js frontend to fetch from backend APIs:

**Create API service file:**
```javascript
// lib/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchSkills = async () => {
  const res = await fetch(`${API_URL}/skills`);
  return res.json();
};

export const fetchProjects = async () => {
  const res = await fetch(`${API_URL}/projects`);
  return res.json();
};

// Add more API calls...
```

**Update hooks to use backend:**
```javascript
// hooks/usePortfolioData.ts
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r => r.json());

export function useSkills() {
  return useSWR('http://localhost:5000/api/skills', fetcher);
}

export function useProjects() {
  return useSWR('http://localhost:5000/api/projects', fetcher);
}
```

### 3. Environment Variables

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend (.env):**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_key
```

### 4. Admin Panel Updates

Update admin login to use JWT:

```javascript
// Admin login component
const handleLogin = async (email, password) => {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const { token } = await res.json();
  localStorage.setItem('token', token);
};
```

### 5. Protected API Calls

```javascript
const token = localStorage.getItem('token');

await fetch('http://localhost:5000/api/skills', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(skillData)
});
```

## 🎨 UI/UX Improvements (Already Applied)

✅ Modern dark theme with gradients
✅ Animated background with particles
✅ GSAP scroll animations
✅ Smooth hover effects
✅ Professional typography
✅ Glassmorphism effects
✅ Typewriter effect on hero
✅ Premium card designs

## 📦 Tech Stack

**Frontend:**
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- GSAP + Framer Motion
- SWR for data fetching

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

## 🔐 Security Features

✅ JWT-based authentication
✅ Password hashing with bcrypt
✅ Protected admin routes
✅ CORS enabled
✅ Environment variables

## 📝 Database Schema

**Skills:**
- category, skills[], description, order

**Projects:**
- title, description, technologies[], image, github, link, featured, order

**Experience:**
- company, position, startDate, endDate, isCurrently, description, technologies[], order

**Certificates:**
- title, issuer, issueDate, credentialUrl, credentialId, description, order

**Admin:**
- email, password (hashed)

## 🎯 Features

✅ Full CRUD operations
✅ JWT authentication
✅ Protected admin routes
✅ RESTful API design
✅ MongoDB integration
✅ Scalable folder structure
✅ Error handling
✅ Input validation ready

## 🚀 Deployment

**Backend:** Deploy to Heroku, Railway, or Render
**Frontend:** Deploy to Vercel
**Database:** MongoDB Atlas (cloud)

Update API_URL in production to your deployed backend URL.
