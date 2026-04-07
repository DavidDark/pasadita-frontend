import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function DBCards() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const getInventory = () => {
    console.log("Setting Home")

    axios.get(`http://localhost:3000/cards/`, {
      headers: {
        'Content-Type': "application/json"
      }
    }).then((response) => {
      const cards = response.data.cards;
      setCards(cards);
    })
    .catch (err => {
      console.error("Error:", err);
    })
  };

  useEffect(() => {
    getInventory();
  }, []);

  const searchCards = async () => {
    if (!query) return;
    setLoading(true);

    try {
      //Search Cards
      const res = await fetch(
        `http://localhost:3000/cards/stock_name?name=${encodeURIComponent(query)}`
      );
      const cards = await res.json();

      setCards(cards);

    } catch (err) {
      console.error("Error:", err);
    }

    setLoading(false);
  };

  const addtoStock = async (card) => {
    if(!card) return;

    const body = {
      card_id : card._id,
      name: card.name,
      tcg: "MTG",
      released_at: card.released_at,
      type_line: card.type_line,
      colors: card.colors,
      set: card.set,
      set_code: card.set_code,
      set_type: card.set_type,
      set_uri: card.set_uri,
      collector_number: card.collector_number,
      rarity: card.rarity,
      imgurl: card.imgurl,
      finish: card.finish,
      listedprice: 0,
      stock: card.stock,
    }

    await axios.post(`http://localhost:3000/cards/add_inventory`,
      body,
      {
        headers: { 'Content-Type': 'application/json'}
      }
    ).then(response => {
      const data = response.data;
      alert("Card added to stock.");
      console.log(data);

      const update = cards.map( item => 
        item._id === card._id ? { ...item, stock: card.stock + 1 } : item
      );

      setCards(update);
    }).catch(err => {
      console.log(err);
      alert("Error adding card to stock.");
    });
  }

  const removeFromStock = (card) => {
    if(!card) return;

    const body = {
      card_id : card._id,
    }

    axios.patch(
      `http://localhost:3000/cards/remove_inventory`,
      body,
      {
        headers: { 'Content-Type': 'application/json'}
      }
    ).then(response => {
      const data = response.data;
      alert("Card removed from stock.");
      console.log(data);

      const update = cards.map( item => 
        item._id === card._id && card.stock != 0 ? { ...item, stock: card.stock - 1 } : item
      );

      setCards(update);
    }).catch(err => {
      console.log(err);
      alert("Error removing card from stock.");
    });
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar en inventario."
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
        { cards && cards.map((card) => (
          <div
            key={card._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center"
            }}
          >
            {card.imgurl && (
              <img
                src={card.imgurl}
                alt={card.name}
                style={{ 
                  width: "100%",
                  borderRadius: "4px",
                  filter: card.stock === 0 ? "grayscale(100%)" : "grayscale(0%)",
                  opacity: card.stock === 0 ? 0.6 : 1,
                  transition: "all 0.3s ease",
                }}
              />
            )}

            <button onClick={() => addtoStock(card)} style={{ padding: "8px 12px" }}>
              +
            </button>

            <button onClick={() => removeFromStock(card)} 
              disabled = {card.stock === 0}
              style={{ 
                marginLeft: "12px",
                padding: "8px 15px",
                opacity: card.stock === 0 ? 0.5 : 1,
              }}
            >
              -
            </button>

            <h4>{card.name}</h4>
            <p style={{ margin: 0 }}>{card.set}</p>
            <small>{card.finish}</small><br/>
            <small>{card.set_code + " - " + card.collector_number}</small><br/>
            <small>{"Stock: " + card.stock}</small><br/>
          </div>
        ))}
      </div>
    </div>
  );
}