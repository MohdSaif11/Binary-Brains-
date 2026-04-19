# 🚀 Smart Customer Management Portal with AI-Driven Insights

---

## 📌 Overview

A full-stack AI-powered web application that helps businesses **manage customers, predict churn, and gain intelligent insights**.

This system combines **data analytics, AI insights, and a modern UI** to provide a complete customer success platform.

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- React Icons  
- Recharts (for charts)  

### Backend
- Flask (Python)  
- Flask-CORS  

### Data & Storage
- In-memory dataset (customers)  
- JSON-based user storage  

### AI Layer
- Rule-based intelligent chatbot  
- Data-driven insights generation  

---

## ⚙️ Features

---

### 🔐 Authentication System
- Login / Signup  
- Persistent login using localStorage  
- Backend validation  

---

### 🎨 Premium UI/UX (HIGHLIGHT 🚀)

- Glassmorphism design  
- Neon dark theme (blue + purple)  
- Animated glowing blobs  
- Particle background effect  
- Smooth hover animations  
- Fully consistent UI across pages  

---

### 🤖 AI Assistant (ChatGPT-style)

- Chat bubble interface  
- Real-time conversation UI  
- Data-driven responses  

#### Example Queries:
- “Which customers are at risk?”  
- “Why is this customer at risk?”  
- “What actions should we take?”  

---

### 👥 Customer Management

- View all customers  
- Track:
  - Usage 📊  
  - Support tickets 🎫  
  - Region 🌍  
  - Plans  

---

### 📊 Dashboard (Advanced UI)

- Glassmorphism customer cards  
- Clickable customer detail popup  
- Interactive layout  

---

### 📈 Data Visualization

- 📊 Usage Bar Chart  
- 🎫 Tickets Bar Chart  
- Positioned at bottom (real dashboard design)  
- Styled with dark neon theme  

---

### 📌 Customer Details Popup

- Click any customer  
- View detailed information  
- Smooth modal UI  

---

## 📂 Project Structure

```
BinaryBrains/

├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Chatbot
│   │   ├── pages/         # Login, Dashboard
│   │   ├── App.js
│
├── server/                 # Flask Backend
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
- `POST /chat` → AI assistant  

---

## 🎯 Demo Flow

1. Login / Signup  
2. Explore dashboard  
3. View customer cards  
4. Click a customer → see details popup  
5. Scroll to bottom → view charts  
6. Use AI chatbot → ask questions  

---

## 🏆 Key Highlights

- ✅ Full-stack application  
- ✅ AI-powered insights  
- ✅ ChatGPT-style assistant  
- ✅ Neon animated UI  
- ✅ Interactive dashboard  
- ✅ Data visualization  
- ✅ Real-time user interaction  

---

## 🚀 Future Improvements

- Integrate OpenAI API  
- Add database (MongoDB/PostgreSQL)  
- JWT authentication  
- Real-time alerts  
- Export reports (PDF/Email)  

---

## 👩‍💻 Author

**Mehak**  
**Mohammed Saif R** 

---

## ⭐ Demo Line (IMPORTANT)

> “This is an AI-powered customer success platform that predicts churn and provides actionable insights using a modern, interactive dashboard.”
