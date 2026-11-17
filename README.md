# PlatformPilot — Food Delivery UI Refresh

This is a **UI upgrade of the connected PlatformPilot React dashboard**, not a replacement backend. All prior screens are retained: dashboard, trip logging/history, vehicles, recommendations, goals, analytics, and role-limited admin insights. Includes warm orange/yellow/red brand accents, a custom delivery rider illustration, subtle motion (respects reduced-motion), platform identification badges, responsive navigation, secure sign-up/login UI.

## Windows / VS Code — run locally
1. Back up your old frontend folder. Keep `platformpilot-backend` unchanged.
2. Extract this ZIP. Open the folder containing `package.json` in VS Code.
3. Create `.env` next to `package.json`: `VITE_API_URL=http://localhost:4000`. Do not put backend secrets here.
4. In terminal: `npm install` then `npm run dev`.
5. In a second terminal run the **existing backend** (`npm run dev` in its folder); ensure PostgreSQL is running and its own `.env` is configured.
6. Open `http://localhost:5173` (or the port Vite prints).
7. Use **Create your free account** for a new rider; log in and explore the left sidebar.

## User accounts and security
The existing Express backend uses bcrypt password hashes and signed JWTs for login. The frontend checks the stored token with `/api/me` on refresh, hides the password by default, and enforces a minimum 8-character password when signing up. **It cannot guarantee production-grade security without backend changes.** The backend currently stores JWTs in browser localStorage via this frontend, and allows permissive CORS. For public hosting, implement HTTPS, secure httpOnly cookies, rate limiting, server-side password policy, input validation and restricted CORS. The frontend never contains `JWT_SECRET` or database secrets.

## Scope / limits
Platform identification badges are **custom name/initial badges**, not official trademark logos. The application does not connect to live delivery-platform accounts. Recommendation values come from logged trips. Fuel-price database records are required for trip creation; backend currently has no edit/delete APIs. Existing API request formats and functions are preserved.

Illustration: AI-generated specifically for this UI; stored locally in `public/images/delivery-rider.webp`, no remote image fetch required.
