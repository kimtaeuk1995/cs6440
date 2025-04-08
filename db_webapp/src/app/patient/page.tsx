"use client";

import { useEffect, useState } from "react";

export default function PatientPage() {
  const [readings, setReadings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No access token found.");
      return;
    }
  
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setReadings(data);
        } else {
          setError("No readings available.");
        }
      })
      .catch(() => {
        setError("Failed to fetch data");
      });
  }, []);

  return (
    <div>
      <h1>Patient Glucose Readings</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {readings.map((reading, idx) => (
          <li key={idx}>
            {reading.timestamp}: {reading.blood_sugar} mg/dL
          </li>
        ))}
      </ul>
    </div>
  );
}
