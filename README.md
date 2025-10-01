# Sport Field Reservation App

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-black?logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-6-52B0E7?logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000?logo=jsonwebtokens)
![Passport](https://img.shields.io/badge/Passport-JWT-34E27A?logo=passport)
![Multer](https://img.shields.io/badge/Multer-uploads-2B2E3A)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=000)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=react-router)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-Validation-3068B7)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-7-EC5990)

A full‑stack web application to browse sport fields, manage images, and create reservations. Features admin management for field types/fields/images and JWT‑based authentication, with a React + Vite frontend communicating with an Express backend over REST.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Communication](#architecture--communication)
- [Project Structure](#project-structure)
- [Quickstart](#quickstart)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Scripts](#scripts)

## Features

- **Authentication**: Register, login, token validation (`/auth/*`) using JWT stored client‑side; `withCredentials` for cookie support if needed.
- **Admin Management**: Create/update/delete field types, sport fields, and images (protected by auth + admin role).
- **Reservations**: Create, update, delete reservations (user auth), list all (public).
- **Users**: Admin/user endpoints to manage user profiles.
- **Media**: Image upload via `multer`, served as static files from `backend/uploads`.
- **Validation**: Request validation via `express-validator` schemas.
- **DX**: ESLint + Prettier, nodemon in dev; TypeScript + Vite on frontend.

## Tech Stack

- **Backend**: Node.js, Express, Sequelize (MySQL), Passport JWT, express‑validator, Multer, CORS, Morgan
- **Frontend**: React 18, TypeScript, Vite, Axios, React Router, React Hook Form + Zod, Bootstrap/React‑Bootstrap, Lightbox/Photo album
- **Auth**: JWT (Authorization: `Bearer <token>`), optional cookies via `cookie-parser`
- **Database**: MySQL 8

## Architecture & Communication

- **Communication**: REST over HTTP. The frontend Axios client uses `BASE_URL = BACKEND_API_URL` and prefixes endpoints with `/api/*` (e.g., `/api/sport-fields`).
  - Backend CORS origin defaults to `http://localhost:5173` and enables `credentials: true`.
  - Requests include `Authorization: Bearer <token>` header when a token exists in `localStorage`.
- **Static Files**: Images are served from `backend/uploads` via Express static middleware.

## Project Structure

```text
  backend/
    config/            # env, enums, forms, texts
    controllers/       # route controllers (auth, users, fields, reservations, images)
    db/                # Sequelize setup and models
    middlewares/       # auth (jwt/admin), validators, upload
    routes/            # /auth and /api/* routers
    uploads/           # uploaded images (served statically)
    index.js           # Express app entry
  frontend/
    src/
      components/      # UI components
      pages/           # route pages
      services/        # Axios services (http, entities, auth)
      config/env.ts    # BACKEND_API_URL, IMAGE_BASE_URL
      hooks/, contexts/, providers/
    vite.config.ts
    index.html
  README.md
```

## Quickstart

### Backend Setup

1. Create a MySQL database and user.
2. Create `.env` in `backend/`:
   ```env
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=db_name
   DB_HOST=127.0.0.1
   JWT_SECRET=replace_with_strong_secret
   PORT=8080
   ```
3. Install deps and run:
   ```bash
   cd backend
   npm install
   npm run dev
   # Server: http://localhost:8080
   ```

### Frontend Setup

1. Configure `frontend/src/config/env.ts` if needed:
   ```ts
   export const BACKEND_API_URL = "http://localhost:8080";
   export const IMAGE_BASE_URL = "http://localhost:8080";
   ```
2. Install deps and run:
   ```bash
   cd frontend
   npm install
   npm run dev
   # App: http://localhost:5173
   ```

## Environment Variables

- Backend (`backend/.env`): `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_HOST`, `JWT_SECRET`, `PORT`
- Frontend (`env.ts`): `BACKEND_API_URL`, `IMAGE_BASE_URL`

## API Overview

- `GET /auth/validate` — validate token
- `POST /auth/login` — login
- `POST /auth/register` — register

- `GET /api/field-types` — list field types
- `POST /api/field-types` — create (auth + admin)
- `PUT /api/field-types/:id` — update (auth + admin)
- `DELETE /api/field-types/:id` — delete (auth + admin)

- `GET /api/sport-fields` — list fields
- `GET /api/sport-fields/:id` — get field
- `POST /api/sport-fields` — create (auth + admin)
- `PUT /api/sport-fields/:id` — update (auth + admin)
- `DELETE /api/sport-fields/:id` — delete (auth + admin)

- `POST /api/sport-field-images` — upload image (auth + admin, multipart `image`)
- `PUT /api/sport-field-images/:id` — update (auth + admin)
- `DELETE /api/sport-field-images/:id` — delete (auth + admin)

- `GET /api/reservations` — list
- `POST /api/reservations` — create (auth)
- `PUT /api/reservations/:id` — update (auth + admin)
- `DELETE /api/reservations/:id` — delete (auth)

- `GET /api/users` — list (auth + admin)
- `GET /api/users/:id` — get (auth)
- `PUT /api/users/:id` — update (auth)
- `DELETE /api/users/:id` — delete (auth + admin)

## Scripts

- Backend:
  - `npm run dev` — start with nodemon
  - `npm start` — start server
  - `npm run lint` — lint backend code
- Frontend:
  - `npm run dev` — Vite dev server
  - `npm run build` — TypeScript check + build
  - `npm run preview` — preview build
  - `npm run lint` — lint frontend code
