import React, { useEffect, useState } from "react";
import { getHealth, getChurn } from "../services/api";

function CustomerCard({ customer }) {
  const [health, setHealth] = useState({});
  const [churn, setChurn] = useState({});

  useEffect(() => {
    getHealth(customer.id).then(res => setHealth(res.data));
    getChurn(customer.id).then(res => setChurn(res.data));
  }, [customer.id]);

  return (
    <div style={{
      background: "#1e293b",
      padding: "15px",
      borderRadius: "10px"
    }}>
      <h3>{customer.name}</h3>
      <p>{customer.region}</p>

      <p>Health: {health.score}</p>

      <p style={{
        color: health.status === "Good" ? "green" : "orange"
      }}>
        {health.status}
      </p>

      <p style={{
        color: churn.churn === "Yes" ? "red" : "green"
      }}>
        Churn: {churn.churn}
      </p>

      {churn.churn === "Yes" && <p>⚠️ High Risk</p>}
    </div>
  );
}

export default CustomerCard;