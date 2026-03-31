#  Tournament Management System API + Frontend

##  Date

March 30, 2026

---

## Project Overview

This project is a full-stack Tournament Management System built using:

 **Backend:** Node.js, Express, MongoDB
 **Frontend:** Next.js (React)
 **Deployment:** Vercel

The application allows users to:

 Create tournaments
View tournaments
 Edit tournaments
 Delete tournaments
 Register players
 View tournament details

---

##  Backend API (Express)

The backend provides RESTful APIs for managing tournaments and players.

###  Base URL

```
http://localhost:5000/api
```

###  Routes

####  Tournaments

 `GET /api/tournaments` → Get all tournaments
`GET /api/tournaments/:id` → Get single tournament
 `POST /api/tournaments` → Create tournament
 `PUT /api/tournaments/:id` → Update tournament
 `DELETE /api/tournaments/:id` → Delete tournament

####  Players

 `GET /api/players` → Get all players
 `POST /api/players` → Register player

---

##  Swagger Documentation

Swagger API documentation is available at:

```
http://localhost:5000/api-docs
```

 (Replace with deployed URL after Vercel deployment)

---

## 💻 Frontend (Next.js)

The frontend was built using Next.js and exported as a static site.

###  Important Implementation Notes

 Used `output: "export"` in Next.js
Dynamic routes were replaced with **static pages**
 Query parameters are used instead of dynamic routing

###  Static Pages

`/index.html`
 `/home.html`
 `/tournaments.html`
 `/add-tournaments.html`
 `/register.html`
 `/edit.html?id=...`
 `/tournament-details.html?id=...`

---

##  Integration

The frontend communicates with the backend using:

```
http://localhost:5000/api
```

Axios is used for API requests.

---

##  Deployment

The application is deployed using **Vercel**.

###  Production URL

```
(PASTE YOUR VERCEL LINK HERE)
```

###  Deployment Settings

 Deployment Protection: **Disabled** (for public access)

---

##  Project Structure

### Backend (ASSIGNMENT01)

```
src/
routes/
controllers/
models/
public/  ← contains frontend build
```

### Frontend (assignment2-client)

```
src/app/
components/
utils/
```

---

##  How to Run Locally

### Backend

```
cd ASSIGNMENT01
npm install
npm run dev
```

### Frontend (Development)

```
cd assignment2-client
npm install
npm run dev
```

---

##  Features Implemented

 Full CRUD for tournaments
 Player registration
 Static frontend export
 Backend + frontend integration
 Deployment-ready structure

---

##  Notes

 Dynamic routes were converted to static pages due to Next.js export limitations
Query parameters (`?id=`) are used for edit and detail pages
 Frontend build is served from backend `/public` folder

---

##  Author

Student Name: Dawa Angchuk Sherpa
Student Number: 200591283
Course: JavaScript Frameworks
Assignment: Assignment 2

---
