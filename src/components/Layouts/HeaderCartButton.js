import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const itemCount = cartCtx.items.length;

  const [isButtonHigh, setButtonHigh] = useState(false);
  const buttonClasses = `${classes.button} ${isButtonHigh ? classes.bump : ""}`;
  useEffect(() => {
    if (cartCtx.items.length) setButtonHigh(true);
    const timer = setTimeout(() => {
      setButtonHigh(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);
  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemCount}</span>
    </button>
  );
};

export default HeaderCartButton;
