import React, { useEffect, useState } from "react";
import axios from 'axios';

import { FaRegTrashCan } from 'react-icons/fa6';

export default function Carrito() {
  const [cards, setCards] = useState([]);

  const getCar = () => {

    axios.get(`http://localhost:3000/cards/shoppingcar`, {
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
    getCar();
  }, []);

  const addtoCar = async (card) => {
    if(!card) return;

    const body = {
      card_id : card._id,
      name: card.name,
      finish: card.finish,
    }

    await axios.post(`http://localhost:3000/cards/add_car`,
      body,
      {
        headers: { 'Content-Type': 'application/json'}
      }
    ).then(response => {
      const data = response.data;
      alert("Card added car.");
      console.log(data);

      const update = cards.map( item => 
        item._id === card._id ? { ...item, stock: card.stock + 1 } : item
      );

      setCards(update);
    }).catch(err => {
      console.log(err);
      alert("Error adding card to car.");
    });
  }

  const removeFromCar = (card) => {
    if(!card) return;

    const body = {
      card_id : card._id,
    }

    axios.patch(
      `http://localhost:3000/cards/remove_car`,
      body,
      {
        headers: { 'Content-Type': 'application/json'}
      }
    ).then(response => {
      const data = response.data;
      alert("Card removed from car.");
      console.log(data);

      const update = cards.map( item => 
        item._id === card._id && card.stock != 0 ? { ...item, stock: card.stock - 1 } : item
      );

      setCards(update);
    }).catch(err => {
      console.log(err);
      alert("Error removing card from car.");
    });
  }

  const deleteFromCar = (card) => {
    if(!card) return;

    axios.delete(
      `http://localhost:3000/cards/delete_car`,
      {
        data: { card_id: card._id }
      }
    ).then(response => {
      const data = response.data;
      alert(data.msg);
      console.log(data);

      const update = cards.filter( item => item._id != card._id )

      setCards(update);
    }).catch(err => {
      console.log(err);
      alert("Error removing card from car.");
    });
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        { cards && cards.map((card) => (
          <div
            key={card._id}
            style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
                height: "300px",
            }}
          >
            {card.imgurl && (
              <img
                src={card.imgurl}
                alt={card.name}
                style={{ 
                  maxWidth: "250px",
                  borderRadius: "4px",
                  filter: card.stock === 0 ? "grayscale(100%)" : "grayscale(0%)",
                  opacity: card.stock === 0 ? 0.6 : 1,
                  transition: "all 0.3s ease",
                }}
              />
            )}

            <div
                style={{
                    textAlign: "center",
                }}
            >
                <h4>{card.name}</h4>
                <p style={{ margin: 0 }}>{card.set}</p>
                <small>{card.finish}</small><br/>
                <small>{card.set_code + " - " + card.collector_number}</small><br/>
                <small>{"Stock: " + card.stock}</small><br/>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "14px",
                }}
            >
                <button onClick={() => addtoStock(card)} style={{ padding: "8px 12px" }}>
                    +
                </button>

                <button onClick={() => removeFromStock(card)} 
                disabled = {card.stock === 0}
                style={{
                    padding: "8px 15px",
                    opacity: card.stock === 0 ? 0.5 : 1,
                }}
                >
                    -
                </button>

                <button onClick={() => deleteFromStock(card)} 
                style={{ 
                    padding: "7.3px 11px"
                }}
                >
                    <FaRegTrashCan color="white"/>
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}