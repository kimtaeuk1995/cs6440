"use client";

import { useEffect, useState } from "react";

export default function PatientPage() {
    const [readings, setReadings] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("access_token");
            const username = localStorage.getItem("username");

            if (!token || !username) {
                setError("Not logged in.");
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_data/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                setReadings(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to fetch data");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="patient-container">
            <h1>Blood Glucose Readings</h1>
            {error && <p className="error-message">{error}</p>}
            {readings.length > 0 ? (
                <ul>
                    {readings.map((reading, index) => (
                        <li key={index}>
                            <strong>{reading.blood_sugar} mg/dL</strong> on{" "}
                            {new Date(reading.timestamp).toLocaleString()}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No readings available.</p>
            )}
        </div>
    );
}
