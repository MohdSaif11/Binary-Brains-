# 🚀 Smart Customer Management Portal with AI-Driven Insights

---

## 📌 Overview

A full-stack AI-powered web application that helps businesses **manage customers, predict churn, and gain intelligent insights**.

This system provides:

- 👥 Customer data management  
- 📊 AI-based health scoring  
- 🔮 Churn prediction  
- 🤖 ChatGPT-style AI assistant  
- 📈 Interactive analytics dashboard  
- 🔐 Authentication system (Login/Signup)  
- 🎨 Modern glassmorphism UI  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- React Icons  
- Recharts  

### Backend
- Flask (Python)  
- Flask-CORS  

### Storage
- JSON file (user data)  
- In-memory customer dataset  

### AI Logic
- Rule-based intelligent responses  
- Data-driven chatbot insights  

---

## ⚙️ Features

### 🔐 Authentication System
- Login / Signup  
- Persistent login using localStorage  
- Secure backend validation  

---

### 🎨 Premium UI/UX
- Glassmorphism login page  
- Animated glowing blobs  
- Particle background effect  
- Neon hover effects  
- ChatGPT-style chatbot UI  

---

### 👥 Customer Management
- View all customers  
- Track:
  - Usage  
  - Support tickets  
  - Region  
  - Plans  

---

### 📊 Health Score
- Score range: 0–100  
- Based on:
  - Usage  
  - Tickets  
  - NPS  
  - Engagement  

---

### 🔮 Churn Prediction
- Predicts if a customer may leave  
- Based on:
  - Low usage  
  - High support tickets  
- Displays risk level  

---

### 🤖 AI Assistant (Chatbot)
- ChatGPT-style chat interface  
- Ask questions like:
  - “Which customers are at risk?”  
  - “Why is this customer at risk?”  
  - “What actions should we take?”  

✅ Uses **real customer data**  
✅ Provides **actionable insights**  

---

### 📈 Dashboard
- Customer cards  
- Data visualization  
- Clean and modern layout  

---

## 📂 Project Structure

```
BinaryBrains/

├── client/                # React Frontend
│   ├── src/
│   │   ├── components/   # Chatbot
│   │   ├── pages/        # Login, Dashboard
│   │   ├── App.js
│
├── server/                # Flask Backend
│   ├── routes/
│   │   ├── auth.py
│   │   ├── chat.py
│   │   ├── customers.py
│   │   ├── churn.py
│   │   ├── health.py
│   │
│   ├── data/
│   │   ├── customers.py
│   │
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
npm install axios react-icons recharts
npm start
```

Frontend runs on:  
http://localhost:3000  

---

## 📊 Sample API Endpoints

- `POST /login` → Login user  
- `POST /signup` → Register user  
- `GET /customers` → Get all customers  
- `GET /health/<id>` → Health score  
- `GET /churn/<id>` → Churn prediction  
- `POST /chat` → AI chatbot  

---

## 🎯 Demo Flow

1. Open application  
2. Login / Signup  
3. View dashboard  
4. Check:
   - Customer data  
   - Health score  
   - Churn prediction  
5. Use AI assistant:
   - Ask insights  
   - Get recommendations  

---

## 🏆 Key Highlights

- ✅ Full-stack application  
- ✅ AI-powered insights  
- ✅ ChatGPT-style assistant  
- ✅ Modern animated UI  
- ✅ Real-time dashboard  
- ✅ Data-driven decision support  

---

## 🚀 Future Improvements

- Integrate real AI (OpenAI API)  
- Add MongoDB database  
- Implement JWT authentication  
- Real-time notifications  
- Export reports (PDF/Email)  

---

## 👩‍💻 Author

**Mehak**  
**Mohammed Saif R**  

---

## ⭐ Demo Line

> “This is an AI-powered customer success platform that predicts churn and provides actionable insights to help businesses retain customers.”
