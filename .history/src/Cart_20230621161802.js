import Modal from "./Modal";
import styles from "./Cart.module.css";
const Cart = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div className={styles.actions}>
        <div>User not found</div>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close{" "}
        </button>
      </div>
    </Modal>
  );
};
export default Cart;
