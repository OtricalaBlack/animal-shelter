"use client";

import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Content() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Страница контента</h1>
            {loading ? (
                <div>
                    <ThreeDots color="#4fa94d" height={80} width={80} />
                    <p>Загрузка...</p>
                </div>
            ) : (
                <h2>Данные загружены!</h2>
            )}
        </div>
    );
}