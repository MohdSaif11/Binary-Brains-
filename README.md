# 🚀 Smart Customer Management Portal with AI-Driven Insights

## 📌 Overview

A full-stack web application that helps businesses manage customers and gain intelligent insights using AI.

The system provides:
- Customer data management  
- AI-based health scoring  
- Churn prediction  
- AI chatbot for insights  
- Search and filtering  
- Interactive analytics dashboard  
- Authentication system (Login/Signup)  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Recharts  
- React Icons  

### Backend
- Flask (Python)  
- Flask-CORS  

### Database / Storage
- JSON file (users)  
- In-memory / generated customer data  

### AI / Logic
- Rule-based AI logic  
- (Optional) OpenAI integration  

---

## ⚙️ Features

### 👥 Customer Management
- View customer details  
- Track usage, tickets, and region  
- Search and filter customers  

### 📊 Health Score
- Score range: 0–100  
- Based on:
  - Usage  
  - Support tickets  
  - NPS  
  - Contract duration  

### 🔮 Churn Prediction
- Predicts if a customer is likely to churn  
- Displays:
  - Yes / No  
  - Risk indication  

### 🤖 AI Chatbot
- Ask questions like:
  - “Why is customer at risk?”  
  - “How to reduce churn?”  
- Provides intelligent responses and suggestions  

### 📈 Analytics Dashboard
- Customer cards (modern UI)  
- Ticket-based charts  
- Real-time data display  

### 🔐 Authentication
- Login / Signup system  
- Persistent login using localStorage  
- Backend validation  
- User data stored in JSON  

---

## 📂 Project Structure

```
BinaryBrains/

├── client/                # React Frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Dashboard, Login
│   │   ├── services/     # API calls
│   │   ├── App.js
│   │   └── index.js
│
├── server/                # Flask Backend
│   ├── routes/           # API routes
│   ├── data/             # Sample data
│   ├── users.json        # Stored users
│   └── app.py
```

---

## ▶️ How to Run

### 1️⃣ Backend Setup

```bash
cd server
pip install flask flask-cors
python app.py
```

Backend runs on:  
http://127.0.0.1:5000  

---

### 2️⃣ Frontend Setup

```bash
cd client
npm install
npm install axios recharts react-icons
npm start
```

Frontend runs on:  
http://localhost:3000  

---

## 📊 Sample API Endpoints

- GET /customers → Get all customers  
- GET /health/<id> → Get health score  
- GET /churn/<id> → Get churn prediction  
- POST /chat → AI chatbot  
- POST /signup → Create user  
- POST /login → Login user  

---

## 🎯 Demo Flow

1. Open application  
2. Signup / Login  
3. View dashboard  
4. Explore:
   - Customer cards  
   - Health score  
   - Churn prediction  
5. Use chatbot for insights  
6. Search customers  
7. View analytics chart  

---

## 🏆 Key Highlights

- ✅ Full-stack application  
- ✅ AI-powered insights  
- ✅ Interactive dashboard  
- ✅ Authentication system  
- ✅ Clean and modern UI  
- ✅ Modular architecture  

---

## 🚀 Future Improvements

- Integrate real AI (OpenAI API)  
- Add MongoDB database  
- Implement JWT authentication  
- Add real-time alerts  
- Export reports (PDF/Email)  

---

## 👨‍💻 Author

Mehak  

Mohammed Saif R  

---

## ⭐ Demo Line

“This is an AI-powered customer success platform that predicts churn and provides actionable insights to improve customer retention.”
