import { Fragment } from "react";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { useContext } from "react";

const CurrentCart = (props) => {
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

  const totalAmount = cartCtx.totalCost.toFixed(2);

  return (
    <Fragment>
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
          <button className={classes.button} onClick={props.orderPlacedHandler}>
            {props.isLoading ? "..." : "Order"}
          </button>
        )}
      </div>
    </Fragment>
  );
};
export default CurrentCart;
