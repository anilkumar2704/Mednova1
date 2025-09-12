# MedNova Backend (Express + MongoDB + Socket.IO)

## Setup
1. Copy files into a folder `mednova-backend`.
2. `npm install`
3. Create `.env` from `.env.example` and fill MONGODB_URI and JWT_SECRET.
4. `npm run dev` (requires nodemon) or `npm start`

## API
- POST /api/auth/register  { name,email,password,phone,role,metadata }
- POST /api/auth/login     { email,password }
- POST /api/requests       (auth) { type, coordinates: [lng,lat], notes }
- GET  /api/requests       (auth)
- PATCH /api/requests/:id  (auth) { status, assignedTo }
- POST /api/chatbot/message (auth) { message }
- Socket.IO: join_request, driver_location, request_status_change

## React integration
- Base URL: `http://localhost:5000`
- Use Authorization: `Bearer <token>` header after login
- Socket: connect to `http://localhost:5000` with socket.io-client

## Notes
- Add production hardening (rate-limit, validation, logging rotation).
- Replace chatbot placeholder with OpenAI or your preferred service.
