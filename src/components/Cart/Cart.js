import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import makeOrder from "../../server/make-order";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const addItemHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          name={item.name}
          amount={item.amount}
          addItem={addItemHandler.bind(null, item)}
          removeItem={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const orderPlaceHandler = () => {
    const isSuccesful = makeOrder(cartCtx.items);
    if (isSuccesful) {
      props.onHideCart();
      cartCtx.emptyCart();
    } else {
      alert("Something went wrong");
    }
  };
  const totalAmount = cartCtx.totalCost.toFixed(2);
  return (
    <Modal onBackdropClick={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {cartCtx.items.length !== 0 && (
          <button className={classes.button} onClick={orderPlaceHandler}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
