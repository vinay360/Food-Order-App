import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
  items: [],
  totalCost: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const newItems = [...state.items];
    const ind = newItems.findIndex((item) => item.id === action.value.id);
    if (ind !== -1) {
      newItems[ind].amount += action.value.amount;
    } else {
      newItems.push(action.value);
    }
    return {
      items: newItems,
      totalCost: state.totalCost + action.value.amount * action.value.price,
    };
  }

  if (action.type === "REMOVE") {
    const newState = { ...state };
    const ind = newState.items.findIndex((item) => item.id === action.value);
    newState.totalCost -= newState.items[ind].price;
    newState.items[ind].amount--;
    if (newState.items[ind].amount === 0) {
      newState.items.splice(ind, 1);
    }
    return newState;
  }
  return defaultState;
};

const CartProvider = (props) => {
  const [cartState, dispatcherCartState] = useReducer(
    cartReducer,
    defaultState
  );

  const cartContext = {
    items: cartState.items,
    totalCost: cartState.totalCost,
    addItem: (item) => {
      dispatcherCartState({ type: "ADD", value: item });
    },
    removeItem: (id) => {
      dispatcherCartState({ type: "REMOVE", value: id });
    },
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
