"use client";

import { useEffect, useState } from 'react';

export default function PatientPage() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setError("Not authenticated.");
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_data/testuser`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(json => {
                if (Array.isArray(json)) {
                    setData(json);
                } else {
                    setError("Failed to fetch data");
                }
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setError("Fetch error.");
            });
    }, []);

    return (
        <div className="patient-container">
            <h1>Patient Glucose Readings</h1>
            {error && <p>{error}</p>}
            {data.length === 0 && !error && <p>Loading...</p>}
            {data.length > 0 && (
                <ul>
                    {data.map((entry, idx) => (
                        <li key={idx}>
                            {entry.timestamp} - {entry.blood_sugar} mg/dL
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
