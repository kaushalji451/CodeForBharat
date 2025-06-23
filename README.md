# 🚀 Talent Unlocked

**Talent Unlocked** is a full-stack **Candidate Management System** built using a **Node.js backend** and a **Vite + React frontend**. It enables candidates to register, take company-assigned quizzes, and manage their profiles through a personalized dashboard. Admins have a separate panel to oversee, manage, and analyze candidate data and quiz performance.

---

## 🧩 Tech Stack

- **Frontend:** Vite + React + TailwindCSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (via Mongoose)
- **Authentication:** Custom authentication with hashed passwords (JWT or session-based)
- **Deployment:** Vercel (frontend) + Render (backend)

---

## 🔑 Admin Credentials

To log in as an admin, use the following default credentials:

- **Username:** `Admin`
- **Password:** `Password@123`

## 📁 Folder Structure

project-root/
│
├── backend/ # Node.js + Express backend
│ ├── src/
│ │ ├──config/ # file uploader on google drive
│ │ ├──middleware/ #middleware for auth , multer and role middleware
│ │ ├── models/ # MongoDB schemas
│ │ ├── routes/ # Express routes
│ │ ├── uploads/ # uploaded files store
│ │ ├── utils/ # email send routes
│ │ ├── validationSchema/ #validatation for signup and login using zod
│ │ └── app.js # Entry point
│ ├── .env
│ └── package.json
│
├── frontend/ # Vite + React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── context/ # authcontext
│ │ ├── pages/ # Routes & views
│ │ ├── types/ # form validation
│ │ └── main.jsx # App entry
│ ├── .env
│ └── package.json

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash

git clone https://github.com/kaushalji451/CodeForBharat
cd CodeForBharat

2. Backend Setup
   cd backend
   npm install
   node src/app.js
   Make sure MongoDB is running or provide a MongoDB URI in your .env file.

3. Frontend Setup
   cd ../frontend
   npm install
   npm run dev
   The frontend will run at http://localhost:5173

📌 Features
👤 Candidate Panel
Candidate registration and login

Take company-assigned quizzes

View quiz scores and results

Update personal details via dashboard

🛡️ Admin Panel
Secure login with credentials

Manage all candidates

Track quiz results and statistics

Update or delete candidate data

💻 General Features
🔐 Role-based authentication (Admin & Candidate)

📂 Protected routes

📊 Interactive dashboards

🌐 Modern UI built with TailwindCSS

🌍 Deployment
Frontend: Vercel

Backend: Render

Configure CORS, environment variables, and domains correctly

🤝 Contributions
Feel free to fork the project and submit pull requests!

📄 License
This project is licensed under the MIT License.
