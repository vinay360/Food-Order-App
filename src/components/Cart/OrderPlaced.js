import classes from "./Cart.module.css";

const OrderPlaced = (props) => {
  return (
    <div className={classes.actions}>
      <h2>Order Has Been Placed</h2>
      <button onClick={props.onClose}>Close</button>
    </div>
  );
};
export default OrderPlaced;
