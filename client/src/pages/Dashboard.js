import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [filterRisk, setFilterRisk] = useState("");
const [filterRegion, setFilterRegion] = useState("");
const [sortByUsage, setSortByUsage] = useState(false);
 // ONLY URL + syntax fixes done
const [toast, setToast] = useState("");

const BASE_URL = "https://binary-brains-uttd.onrender.com";

// eslint-disable-next-line no-unused-vars
const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };



const loadCustomers = async () => {
  setLoading(true);
  try {
    const res = await fetch(`${BASE_URL}/customers`);
    const data = await res.json();
    setCustomers(data);
  } catch (err) {
    console.error(err);
  }
  setLoading(false);
};
useEffect(() => {
    loadCustomers();
  }, []);


const addCustomer = async () => {
  if (!name || !region) {
    showToast("Enter name and region");
    return;
  }
  try {
    await fetch(`${BASE_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, region })
    });

    setName("");
    setRegion("");
    loadCustomers();
  }catch (err) {
      showToast("Something went wrong ");
      
    }
  };

const deleteCustomer = async (id) => {
  try {
    await fetch(`${BASE_URL}/customers/${id}`, {
      method: "DELETE"
    });
    loadCustomers();
  } catch (err) {
    showToast("Something went wrong ");
    
  }
};

const addTicket = async (id) => {
  try {
    await fetch(`${BASE_URL}/customers/${id}/ticket`, {
      method: "POST"
    });
    loadCustomers();
  } catch (err) {
    showToast("Something went wrong ");
  }
};

const addDevice = async (id) => {
  const device = prompt("Enter device name");
  if (!device) return;

  try {
    await fetch(`${BASE_URL}/customers/${id}/device`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ device })
    });
    loadCustomers();
  } catch (err) {
    showToast("Something went wrong ");
  }
};

const getSummary = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/customers/${id}/summary`);
    const data = await res.json();
    alert(data.summary);
  } catch (err) {
    showToast("Something went wrong ");
  }
};

    //✅ ONLY ADDED THIS
  const churnData = [
    { name: "High", value: customers.filter(c => c.churn_risk === "High").length },
    { name: "Medium", value: customers.filter(c => c.churn_risk === "Medium").length },
    { name: "Low", value: customers.filter(c => c.churn_risk === "Low").length }
  ];

  const COLORS = ["#ef4444", "#f97316", "#22c55e"];

  return (
    <div className="dashboard">

      <h1 className="title"> Customer Dashboard</h1>

      {/* 🔥 TOP BAR */}
      <div className="top-bar">

  <input
    className="search"
    placeholder=" Search customer..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <input
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <input
    placeholder="Region"
    value={region}
    onChange={(e) => setRegion(e.target.value)}
  />

  <button className="main-btn" onClick={addCustomer}>
    ➕ Add
  </button>

  {/* ✅ ADD FILTERS HERE 👇 */}

  <select onChange={(e) => setFilterRisk(e.target.value)}>
    <option value="">All Risk</option>
    <option value="High">High Risk</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>

  <select onChange={(e) => setFilterRegion(e.target.value)}>
    <option value="">All Regions</option>
    <option value="India">India</option>
    <option value="US">US</option>
    <option value="UK">UK</option>
    <option value="Germany">Germany</option>
    <option value="Canada">Canada</option>
  </select>

  <button onClick={() => setSortByUsage(!sortByUsage)}>
    Sort by Usage 
  </button>

</div>
      

      {/* 🚨 RISK PANEL */}
      <div className="risk-panel">
        <h2> High Risk Customers</h2>

        <div className="risk-list">
          {customers
            .filter(c => c.churn_risk === "High")
            .slice(0, 5)
            .map(c => (
              <div key={c.id} className="risk-card">
                <span>{c.name}</span>
                <span>{c.usage}%</span>
              </div>
            ))}
        </div>
      </div>
{/* 📊 INSIGHTS PANEL */}
<div className="insights">

  <div className="insight-card">
    <h3>Total Customers</h3>
    <p>{customers.length}</p>
  </div>

  <div className="insight-card">
    <h3>High Risk</h3>
    <p>
      {customers.filter(c => c.churn_risk === "High").length}
    </p>
  </div>

  <div className="insight-card">
    <h3>Avg Usage</h3>
    <p>
      {customers.length > 0
        ? Math.round(
            customers.reduce((sum, c) => sum + c.usage, 0) / customers.length
          )
        : 0}%
    </p>
  </div>

</div>
      {/* 🧾 CARDS */}
      {loading ? (
  <div className="loader"></div>
) : (
      <div className="grid">
      {customers
  .filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter(c =>
    filterRisk ? c.churn_risk === filterRisk : true
  )
  .filter(c =>
    filterRegion ? c.region === filterRegion : true
  )
  .sort((a, b) =>
    sortByUsage ? b.usage - a.usage : 0
  )
  .map(c => {

            const isRisky = c.churn_risk === "High";

            return (
              <div
                key={c.id}
                className="card"
                onClick={() => setSelected(c)}
                style={{
                  border: isRisky ? "1px solid red" : undefined,
                  boxShadow: isRisky ? "0 0 25px rgba(255,0,0,0.6)" : undefined
                }}
              >
                <h3>{c.name}</h3>
                <p> {c.region}</p>
                <p> Usage: {c.usage}</p>
                <p> Tickets: {c.tickets}</p>

                <p> Health: {c.health_score}</p>

                <p>
                   Churn:
                  <span style={{
                    color:
                      c.churn_risk === "High" ? "red" :
                      c.churn_risk === "Medium" ? "orange" :
                      "lightgreen"
                  }}>
                    {" "}{c.churn_risk}
                  </span>
                </p>

                <div className="card-buttons">
                  <button onClick={(e) => {
                    e.stopPropagation();
                    addTicket(c.id);
                  }}>+ Ticket</button>

                  <button onClick={(e) => {
                    e.stopPropagation();
                    deleteCustomer(c.id);
                  }}>Delete</button>

                  <button onClick={(e) => {
                    e.stopPropagation();
                    addDevice(c.id);
                  }}>+ Device</button>

                  <button onClick={(e) => {
                    e.stopPropagation();
                    getSummary(c.id);
                  }}>
                     Summary
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      )
      }

      {/* 📊 CHART */}
      {/* 📊 PREMIUM CHART DASHBOARD */}
<div className="chart-section">

  {/* 📊 USAGE + TICKETS */}
  <div className="chart-card">
    <h3> Usage & Tickets</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={customers}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="usage" fill="#3b82f6" />
        <Bar dataKey="tickets" fill="#9333ea" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* 🥧 CHURN PIE */}
  <div className="chart-card">
    <h3> Churn Distribution</h3>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
  data={churnData}
  dataKey="value"
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          label
        >{churnData.map((entry, index) => (
  <Cell key={index} fill={COLORS[index % COLORS.length]} />
))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>

</div>

      {/* 📌 POPUP */}
      {selected && (
        <div className="popup">
          <div className="popup-box">
            <h2>{selected.name}</h2>
            <p>Usage: {selected.usage}</p>
            <p>Tickets: {selected.tickets}</p>
            <p> Health: {selected.health_score}</p>
            <p> Churn: {selected.churn_risk}</p>

            <p>
               Devices:
              {selected.devices?.length > 0
                ? selected.devices.join(", ")
                : " None"}
            </p>

            <button onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}

      {/* 🎨 FINAL CSS */}
      <style>{`

.dashboard {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background: linear-gradient(135deg, #020617, #0f172a);
  color: white;
}

.title {
  text-align: center;
  margin-bottom: 25px;
}

/* TOP BAR */
.top-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;   /* ✅ FIX alignment */
}


.search {
  min-width: 240px;
}

/* BUTTON */

button {
  transition: all 0.2s ease;
}

.main-btn {
  padding: 12px 20px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(90deg, #3b82f6, #9333ea);
  color: white;
  cursor: pointer;
}

.main-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(147,51,234,0.5);
}

/* RISK PANEL */
.risk-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.risk-card {
  background: rgba(255, 0, 0, 0.15);
  border: 1px solid rgba(255, 0, 0, 0.5);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  display: flex;
  gap: 6px;
}

/* CARDS */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 22px;
  min-height: 300px;   /* ✅ prevents jump */
}

.card {
  padding: 20px;
  border-radius: 20px;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.08);
  transition: all 0.3s ease;   /* ✅ smoother */
}

.card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 0 30px rgba(59,130,246,0.4);
}

/* BUTTONS */
.card-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.card-buttons button {
  flex: 1 1 45%;
  padding: 10px;              /* ✅ equal size */
  border-radius: 10px;
  border: none;
  background: #3b82f6;
  color: white;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* POPUP */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.85);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-box {
  background: rgba(30,41,59,0.95);
  padding: 25px;
  border-radius: 15px;
}
  /* PREMIUM CHART DASHBOARD */
.chart-section {
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

/* CHART CARD */
.chart-card {
  background: rgba(255,255,255,0.05);
  border-radius: 20px;
  padding: 20px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.08);
  transition: 0.3s;
}

.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 25px rgba(59,130,246,0.25);
}

.chart-card h3 {
  margin-bottom: 10px;
  text-align: center;
}
.top-bar input,
.top-bar select {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.06);
  color: white;
  outline: none;
  height: 42px;              /* ✅ SAME HEIGHT */
}
  .top-bar select option {
  background: #0f172a;   /* dark background */
  color: white;          /* visible text */
}
  .top-bar select:hover {
  border-color: #3b82f6;
}

button:hover {
  opacity: 0.95;
  transform: translateY(-2px) scale(1.03);
}

.loader {
  border: 5px solid rgba(255,255,255,0.1);
  border-top: 5px solid #3b82f6;
  border-radius: 50%;
  width: 50px;
  height: 50px;

  animation: spin 1s linear infinite;

  margin: 80px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.insights {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.insight-card {
  flex: 1;
  min-width: 200px;
  background: rgba(255,255,255,0.05);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.08);
  transition: 0.3s;
}

.insight-card h3 {
  margin-bottom: 10px;
  font-size: 16px;
  color: #94a3b8;
}

.insight-card p {
  font-size: 24px;
  font-weight: bold;
}

.insight-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(59,130,246,0.3);
}
  .toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #1e293b;
  color: white;
  padding: 14px 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,0.4);
  animation: slideIn 0.3s ease;
  max-width: 300px;
  z-index: 999;
}

/* animation */
@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
`}</style>
{toast && <div className="toast">{toast}</div>}
    </div>
   
  );
}
export default Dashboard;