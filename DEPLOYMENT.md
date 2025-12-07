Deployment guide — frontend (Vite), admin, and backend

Overview
- This repo contains three deployable pieces:
  - `frontend` (Vite React app)
  - `admin` (Vite React app)
  - `backend` (Express + MongoDB)

Goal
- Host `frontend` and `admin` on Vercel as static sites.
- Host `backend` on a Node host (Render, Railway, Heroku, or Docker on any provider).
- Wire `frontend` and `admin` to the backend via `VITE_API_URL`.

1) Vercel: create projects for `frontend` and `admin`
- Option A (recommended): create two separate Vercel projects.
  - Project 1: set Root Directory to `/frontend`.
  - Project 2: set Root Directory to `/admin`.
- Settings (for each project):
  - Framework Preset: Vite
  - Build command: `npm run build`
  - Output directory: `dist`

2) Environment variables (in Vercel dashboard)
- Add these production envs (Production scope):
  - `VITE_API_URL` = `https://your-backend.example.com` (replace with actual backend URL)
  - `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_live_...` or `pk_test_...`
- Note: Client env names must start with `VITE_`.

Local test of built files
```bash
cd frontend
npm install
npm run build
npm run preview
```
Repeat for `admin`.

3) Backend deployment options
- Option 1 (Render / Railway / Heroku): connect the repository and set the start command to `npm start` and add env vars.
- Option 2 (Docker): use the included `backend/Dockerfile` and push to any container host.
- Required backend env vars (set securely on host):
  - `MONGODB_URI` = mongodb+srv://... (URL-encode special characters in password)
  - `JWT_SECRET` = your_jwt_secret
  - `STRIPE_SECRET_KEY` = sk_live_... or sk_test_...
  - `PORT` = 4000 (or use default)

Heroku quick deploy (example)
```bash
# from repo root
cd backend
heroku create your-app-name
git push heroku main
# set config vars
heroku config:set MONGODB_URI="..." JWT_SECRET="..." STRIPE_SECRET_KEY="..."
```

Render quick deploy (example)
- Create a new Web Service, connect GitHub repo, select `backend` folder as the root, build command: `npm install && npm run build` (if you need build) and start command: `npm start`.
- Add env vars in the Render dashboard.

4) Verify after deploy
- Frontend: visit the Vercel URL and confirm app loads.
- Admin: visit `https://<your-vercel-domain>/admin`.
- API: curl the health endpoint (if you add one) or test an API path, for example:
```bash
curl -v "$VITE_API_URL/api/food/list" -H "Content-Type: application/json"
```

Troubleshooting
- If backend fails to connect to MongoDB: ensure `MONGODB_URI` has special characters URL-encoded (e.g. `@` -> `%40`).
- If frontend shows `import.meta.env.VITE_API_URL` undefined in production: ensure env var is set in Vercel and rebuild.
- Check build logs in Vercel for missing script errors and in the backend host for runtime exceptions.

If you want, I can:
- Convert one backend endpoint to a Vercel Serverless function as a demo.
- Help deploy the backend to Render (I can prepare the Render service template file).
- Walk through setting the environment variables in the Vercel dashboard step-by-step.
