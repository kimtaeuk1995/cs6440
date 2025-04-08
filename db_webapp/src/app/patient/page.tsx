"use client";

import { useEffect, useState } from 'react';

export default function PatientPage() {
    const [readings, setReadings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token');
            const username = localStorage.getItem('username');

            if (!token || !username) {
                setError("Not authenticated");
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_data/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Fetch failed");
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
            <h1>Patient Glucose Readings</h1>
            {error && <p>{error}</p>}
            {!error && readings.length === 0 && <p>No readings available.</p>}
            <ul>
                {readings.map((r, i) => (
                    <li key={i}>
                        <strong>{r.blood_sugar}</strong> mg/dL — {new Date(r.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}
