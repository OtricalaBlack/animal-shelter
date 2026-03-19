"use client";

import { useEffect, useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

interface Animal {
    id: number;
    name: string;
    location: string;
    image: string;
}

export default function Home() {
    const [animals, setAnimals] = useState<Animal[]>([]);

    useEffect(() => {
        fetch("/animals.json")
            .then((res) => res.json())
            .then((jsonData) => {
                const stored = localStorage.getItem("addedAnimals");
                const addedAnimals: Animal[] = stored ? JSON.parse(stored) : [];
                const allAnimals = [...jsonData, ...addedAnimals].sort((a, b) => a.id - b.id);
                setAnimals(allAnimals);
            })
            .catch((err) => console.error("Ошибка загрузки данных:", err));
    }, []);

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            {/* Шапка с заголовком и кнопкой */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h1 style={{ margin: 0 }}>Потерянные животные</h1>
                <a
                    href="/add"
                    style={{
                        textDecoration: "none",
                        backgroundColor: "#2196F3",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "4px",
                    }}
                >
                    Добавить карточку
                </a>
            </div>

            {animals.length > 0 ? (
                <AwesomeSlider>
                    {animals.map((animal) => (
                        <div key={animal.id} style={{ padding: "20px", textAlign: "center", color: "white" }}>
                            <img
                                src={animal.image}
                                alt={animal.name}
                                style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
                            />
                            <h2 style={{ color: "white" }}>{animal.name}</h2>
                            <p style={{ color: "white" }}>
                                <strong>Место:</strong> {animal.location}
                            </p>
                        </div>
                    ))}
                </AwesomeSlider>
            ) : (
                <p style={{ textAlign: "center" }}>Загрузка данных...</p>
            )}
        </div>
    );
}