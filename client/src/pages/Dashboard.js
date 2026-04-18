import React, { useEffect, useState } from "react";
import { getCustomers } from "../services/api";
import CustomerCard from "../components/CustomerCard";
import Charts from "../components/Charts";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCustomers()
      .then(res => setCustomers(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>📊 Dashboard</h2>

      {/* 🔍 Search */}
      <input
        placeholder="Search customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "12px",
          marginBottom: "20px",
          width: "100%",
          borderRadius: "10px",
          border: "none"
        }}
      />

      {/* 🧩 Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {filteredCustomers.map(c => (
          <CustomerCard key={c.id} customer={c} />
        ))}
      </div>

      {/* 📊 Charts */}
      <Charts data={filteredCustomers} />
    </div>
  );
}

export default Dashboard;