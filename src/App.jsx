import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import "./App.css";

function App() {
  const [inventory, setInventory] = useState([
    { name: "Bananas", quantity: 10 },
    { name: "Apples", quantity: 5 },
    { name: "Oranges", quantity: 3 },
  ]);

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let allEmpty = true;
    inventory.forEach((item) => {
      if (item.quantity !== 0) {
        allEmpty = false;
      }
      if (item.quantity === 0) {
        sendEmail(item.name);
      }
    });
    setShowMessage(allEmpty);
  }, [inventory]);

  function sendEmail(itemName) {
    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          itemName: itemName,
        },
        "YOUR_USER_ID"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  function updateQuantity(name, newQuantity) {
    setInventory((prevInventory) => {
      const itemIndex = prevInventory.findIndex((item) => item.name === name);
      const updatedInventory = [...prevInventory];
      updatedInventory[itemIndex] = {
        ...updatedInventory[itemIndex],
        quantity: newQuantity,
      };
      return updatedInventory;
    });
  }

  return (
    <div className="container">
      <h1 className="title">Inventory</h1>
      {showMessage && (
        <h1 className="empty-message">
          Items are empty, the email has been sent.
        </h1>
      )}
      {inventory.map((item) => (
        <div key={item.name} className="item">
          <h2 className="item-name">{item.name}</h2>
          <p className="item-quantity">Quantity: {item.quantity}</p>
          <button
            className="item-button"
            onClick={() => updateQuantity(item.name, item.quantity + 1)}
          >
            +
          </button>
          <button
            className="item-button"
            onClick={() => updateQuantity(item.name, item.quantity - 1)}
            disabled={item.quantity === 0}
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
