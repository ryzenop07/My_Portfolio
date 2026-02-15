# MERN Portfolio

## Quick Start

```bash
# Install all dependencies
npm run install-all

# Run both client and server
npm run dev
```

## Separate Commands

```bash
# Run only server (port 5001)
npm run server

# Run only client (port 3000)
npm run client
```

## Environment Setup

**Server (.env in /server):**
- Already configured with MongoDB Atlas
- JWT_SECRET is for admin authentication

**Client (.env.local in /client):**
```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## Deployment

**Vercel (Frontend):**
- Deploy /client folder
- Add NEXT_PUBLIC_API_URL environment variable

**Render/Railway (Backend):**
- Deploy /server folder
- Add environment variables from .env

## Structure

```
mern-portfolio/
├── client/          # Next.js frontend
├── server/          # Express backend
└── package.json     # Root commands
```
