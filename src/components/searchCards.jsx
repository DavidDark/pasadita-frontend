import React, { useState } from "react";

export default function CardSearch() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchCards = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/cards/search_name?name=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setCards(data);
    } catch (err) {
      console.error("Error:", err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Buscar cartas Magic</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Ej: Lightning Bolt"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "8px", width: "250px", marginRight: "10px" }}
        />

        <button onClick={searchCards} style={{ padding: "8px 12px" }}>
          Buscar
        </button>
      </div>

      {loading && <p>Buscando...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 200px)",
          gap: "20px"
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center"
            }}
          >
            {card.image && (
              <img
                src={card.image}
                alt={card.name}
                style={{ width: "100%", borderRadius: "4px" }}
              />
            )}

            <h4>{card.name}</h4>
            <p style={{ margin: 0 }}>{card.set}</p>
            <small>{card.rarity}</small>
          </div>
        ))}
      </div>
    </div>
  );
}