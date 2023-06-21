import Modal from "./Modal";
const Cart = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div>User not found</div>
      <div>
        <button onClick={props.onClose}>Close </button>
      </div>
    </Modal>
  );
};
export default Cart;
