const makeOrder = async (cartItems) => {
  try {
    const response = await fetch(
      "https://food-cart-app-fdfc4-default-rtdb.firebaseio.com/cartItems.json",
      {
        method: "POST",
        body: JSON.stringify(cartItems),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.ok;
  } catch {
    return false;
  }
};

export default makeOrder;
