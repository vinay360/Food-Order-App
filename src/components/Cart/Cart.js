import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
// import classes from "./Cart.module.css";
import makeOrder from "../../server/make-order";
import CurrentCart from "./CurrentCart";
import OrderPlaced from "./OrderPlaced";

const Cart = (props) => {
  const [currentOrder, setCurrentOrder] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const cartCtx = useContext(CartContext);

  const orderPlacedHandler = async () => {
    setIsLoading(true);
    const isSuccesful = await makeOrder(cartCtx.items);
    setIsLoading(false);
    if (isSuccesful) {
      cartCtx.emptyCart();
      setCurrentOrder(false);
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <Modal onBackdropClick={props.onHideCart}>
      {currentOrder && (
        <CurrentCart
          onHideCart={props.onHideCart}
          orderPlacedHandler={orderPlacedHandler}
          isLoading={isLoading}
        />
      )}
      {!currentOrder && <OrderPlaced onClose={props.onHideCart} />}
    </Modal>
  );
};

export default Cart;
