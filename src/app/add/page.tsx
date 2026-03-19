"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAnimal() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageBase64(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !location || !imageBase64) {
            alert("Заполните все поля и выберите фото");
            return;
        }

        setLoading(true);

        // Загружаем существующие добавленные карточки из localStorage
        const stored = localStorage.getItem("addedAnimals");
        const addedAnimals = stored ? JSON.parse(stored) : [];

        // Генерируем новый id (на основе текущего времени + сдвиг, чтобы не пересекаться с JSON)
        const newId = Date.now(); // или можно использовать uuid

        const newAnimal = {
            id: newId,
            name,
            location,
            image: imageBase64,
        };

        const updated = [...addedAnimals, newAnimal];
        localStorage.setItem("addedAnimals", JSON.stringify(updated));

        setLoading(false);
        // Переходим на главную
        router.push("/");
    };

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
    <h1>Добавить карточку потерянного животного</h1>
    <form onSubmit={handleSubmit}>
    <div style={{ marginBottom: "15px" }}>
    <label htmlFor="name">Кличка животного:</label>
    <input
    type="text"
    id="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
    />
    </div>

    <div style={{ marginBottom: "15px" }}>
    <label htmlFor="location">Место потери:</label>
    <input
    type="text"
    id="location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    required
    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
    />
    </div>

    <div style={{ marginBottom: "15px" }}>
    <label htmlFor="image">Фотография животного:</label>
    <input
    type="file"
    id="image"
    accept="image/*"
    onChange={handleImageUpload}
    required
    style={{ marginTop: "5px" }}
    />
    </div>

    {imageBase64 && (
        <div style={{ marginBottom: "15px" }}>
        <p>Предпросмотр:</p>
    <img src={imageBase64} alt="preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />
    </div>
    )}

    <button
        type="submit"
    disabled={loading}
    style={{
        padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
    }}
>
    {loading ? "Сохранение..." : "Добавить карточку"}
    </button>
    </form>
    </div>
);
}