import Modal from "./Modal";
const Cart = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div>User not found</div>
      <button onClick={props.onClose}>Close </button>
    </Modal>
  );
};
export default Cart;
