import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);

  const [name, setName] = useState("");
  const [region, setRegion] = useState("");

  const loadCustomers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/customers");
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.error("Error loading customers:", err);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const addCustomer = async () => {
    if (!name || !region) {
      alert("Enter name and region");
      return;
    }

    await fetch("http://127.0.0.1:5000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, region })
    });

    setName("");
    setRegion("");
    loadCustomers();
  };

  const deleteCustomer = async (id) => {
    await fetch(`http://127.0.0.1:5000/customers/${id}`, {
      method: "DELETE"
    });
    loadCustomers();
  };

  const addTicket = async (id) => {
    await fetch(`http://127.0.0.1:5000/customers/${id}/ticket`, {
      method: "POST"
    });
    loadCustomers();
  };

  const addDevice = async (id) => {
    const device = prompt("Enter device name");
    if (!device) return;

    await fetch(`http://127.0.0.1:5000/customers/${id}/device`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ device })
    });

    loadCustomers();
  };

  const getSummary = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/customers/${id}/summary`);
    const data = await res.json();
    alert(data.summary);
  };

  return (
    <div className="dashboard">

      <h1 className="title">🚀 Customer Dashboard</h1>

      {/* ADD CUSTOMER */}
      <div className="input-section">
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
          ➕ Add Customer
        </button>
      </div>

      {/* CARDS */}
      <div className="grid">
        {customers.map(c => {
          const isRisky = c.churn_risk === "High";

          return (
            <div
              key={c.id}
              className="card"
              onClick={() => setSelected(c)}
              style={{
                border: isRisky ? "1px solid red" : undefined,
                boxShadow: isRisky ? "0 0 10px red" : undefined
              }}
            >
              <h3>{c.name}</h3>
              <p>🌍 {c.region}</p>
              <p>📊 Usage: {c.usage}</p>
              <p>🎫 Tickets: {c.tickets}</p>

              <p>💚 Health: {c.health_score}</p>

              <p>
                ⚠️ Churn:
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
                  📧 Summary
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHART */}
      <div className="chart-section">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={customers}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="usage" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* POPUP */}
      {selected && (
        <div className="popup">
          <div className="popup-box">
            <h2>{selected.name}</h2>
            <p>Usage: {selected.usage}</p>
            <p>Tickets: {selected.tickets}</p>
            <p>💚 Health: {selected.health_score}</p>
            <p>⚠️ Churn: {selected.churn_risk}</p>

            <p>
              💻 Devices:
              {selected.devices?.length > 0
                ? selected.devices.join(", ")
                : " None"}
            </p>

            <button onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}

      {/* 🎨 CSS */}
      <style>{`

.dashboard {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background: #0f172a;
  color: white;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.input-section {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.input-section input {
  padding: 8px;
  border-radius: 6px;
  border: none;
}

.main-btn {
  padding: 8px 15px;
  background: linear-gradient(90deg, #3b82f6, #9333ea);
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

/* GRID FIX */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

/* CARD */
.card {
  padding: 18px;
  border-radius: 15px;
  background: rgba(255,255,255,0.06);
  transition: 0.3s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(59,130,246,0.5);
}

/* BUTTONS */
.card-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.card-buttons button {
  flex: 1 1 45%;
  padding: 6px;
  border-radius: 6px;
  border: none;
  background: #3b82f6;
  color: white;
  font-size: 12px;
  cursor: pointer;
}

.card-buttons button:hover {
  background: #2563eb;
}

/* CHART */
.chart-section {
  margin-top: 30px;
}

/* POPUP */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-box {
  background: #1e293b;
  padding: 20px;
  border-radius: 10px;
}

`}</style>

    </div>
  );
}

export default Dashboard;