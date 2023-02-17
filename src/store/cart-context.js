import React from "react";

let CartContext = React.createContext({
  items: [
    {
      id: "",
      name: "",
      price: 0,
      amount: 0,
    },
  ],
  totalCost: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
