import { useContext, useState } from "react";
import CartContext from "../../../store/cart-context";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [itemCount, setItemCount] = useState(1);
  const itemCountHandler = (event) => setItemCount(event.target.value);
  const cartCtx = useContext(CartContext);

  const addItemHandler = (event) => {
    event.preventDefault();
    cartCtx.addItem({
      name: props.name,
      price: props.price,
      id: props.id,
      amount: Number(itemCount),
    });
  };
  return (
    <form className={classes.form} onSubmit={addItemHandler}>
      <Input
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
        onChange={itemCountHandler}
      />
      <button>+ Add</button>
    </form>
  );
};
export default MealItemForm;
