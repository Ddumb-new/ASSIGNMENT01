# Personal Portfolio API

## Description
This project is a REST-style Personal Portfolio API built using TypeScript and Express.  
It provides JSON endpoints to serve portfolio data including profile information, about me details, projects, and contact messages.  

This API is designed to demonstrate backend development using Node.js, TypeScript, and Express, and is fully deployed **live on Render**.

---

## Live Deployed API
You can access the live API here:  
[https://portfolioapi-levc.onrender.com](https://portfolioapi-levc.onrender.com)

---

## Project Structure

ASSIGNMENT01/
├─ package.json
├─ tsconfig.json
├─ src/
│ ├─ server.ts # Main server file
│ ├─ routes/
│ │ └─ index.ts # All API routes
│ ├─ controllers/
│ │ └─ portfolioController.ts # Logic for each endpoint
│ └─ middleware/
│ └─ logger.ts # Custom middleware for logging requests


---

## API Endpoints

| Method | Endpoint             | Description                            |
|--------|--------------------|----------------------------------------|
| GET    | `/api/profile`       | Returns basic profile information      |
| GET    | `/api/about`         | Returns about me information           |
| GET    | `/api/projects`      | Returns a list of projects             |
| POST   | `/api/contact`       | Accepts a contact message in JSON      |

---

## Example Requests

### 1️. GET `/api/profile`

**Browser / Postman / curl:**

```markdown
curl https://portfolioapi-levc.onrender.com/api/profile

## Response

{
  "name": "Dawa Angchuk Sherpa",
  "title": "Full-Stack Developer",
  "summary": "Aspiring web developer with a passion for building interactive web applications."
}

### 2️. GET '/api/about'
```bash
curl https://portfolioapi-levc.onrender.com/api/about


Response:

{
  "bio": "I am a student at Georgian College, learning JavaScript frameworks and backend development. I enjoy coding, music, and creative hobbies.",
  "hobbies": ["Music", "Sketching", "Nature walks"]
}
```
### 3️. GET /api/projects
```bash
curl https://portfolioapi-levc.onrender.com/api/projects


Response:

[
  {
    "id": 1,
    "name": "Personal Portfolio Website",
    "description": "A responsive portfolio website built with HTML, CSS, and JS.",
    "url": "https://github.com/Ddumb/portfolio"
  },
  {
    "id": 2,
    "name": "Todo API",
    "description": "A RESTful API for managing todo tasks using Node.js and Express.",
    "url": "https://github.com/Ddumb/todo-api"
  }
]
```
## 4️. POST /api/contact
```bash
Send a contact message:

curl -X POST https://portfolioapi-levc.onrender.com/api/contact \
-H "Content-Type: application/json" \
-d '{
  "name": "Nho",
  "email": "nho@example.com",
  "message": "Hello! Testing contact endpoint."
}'


Successful Response:

{
  "message": "Contact message received successfully."
}

```
## Error Response (empty fields):
```bash
{
  "error": "Name, email, and message are required."
}
```
## Running Locally
```bash
1.Clone the repo:

git clone https://github.com/Ddumb-new/COMP2068JSFrameworks.git


2.Navigate to the project folder:

cd COMP2068JSFrameworks/ASSIGNMENT01


3.Install dependencies:

npm install


4.Build TypeScript:

npm run build


5.Start the server:

npm start


6.Open in browser or Postman:

http://localhost:5000/api/profile

```

## Middleware
```bash
express.json() – parses incoming JSON requests

Custom logger middleware – logs request method, URL, and timestamp for every request

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
```
## Error Handling
```bash
404 – Invalid route returns:

 {"error": "Route not found"}  


400 – Missing required fields in POST /api/contact:

{ "error": "Name, email, and message are required." }


500 – Any server error:

{ "error": "Something went wrong!" }
```
## Version Control
```bash
Minimum 3 descriptive commits

Pushed to GitHub before deployment

References / External Code
```
## External resources used:
```bash
Express.js Documentation

TypeScript Documentation

ChatGPT was used for guidance and also in this readme file, took help to make those file structure and table for ebdpoint functions(cited here)

Author: Dawa Angchuk Sherpa
Course: COMP 2068 – JavaScript Frameworks
Date: February 2026