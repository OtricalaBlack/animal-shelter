"use client";

import { useEffect, useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

interface Animal {
    id: number;
    title: string;
    description: string;
    email: string;
    image: string;
}

export default function Home() {
    const [animals, setAnimals] = useState<Animal[]>([]);

    useEffect(() => {
        // Загружаем данные из JSON-файла
        fetch("/animals.json")
            .then((res) => res.json())
            .then((data) => setAnimals(data))
            .catch((err) => console.error("Ошибка загрузки данных:", err));
    }, []);

    const sendEmail = (email: string) => {
        // Открываем почтовый клиент с получателем
        window.location.href = `mailto:${email}`;
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h1 style={{ textAlign: "center" }}>Потерянные животные</h1>
            {animals.length > 0 ? (
                <AwesomeSlider>
                    {animals.map((animal) => (
                        <div key={animal.id} style={{ padding: "20px", textAlign: "center", color: "white" }}>
                            <img
                                src={animal.image}
                                alt={animal.title}
                                style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
                            />
                            <h2 style={{ color: "white" }}>{animal.title}</h2>
                            <p style={{ color: "white" }}>{animal.description}</p>
                            <button
                                onClick={() => sendEmail(animal.email)}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Связаться с владельцем
                            </button>
                        </div>
                    ))}
                </AwesomeSlider>
            ) : (
                <p style={{ textAlign: "center" }}>Загрузка данных...</p>
            )}
        </div>
    );
}