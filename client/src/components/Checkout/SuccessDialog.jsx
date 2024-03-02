import { Link } from "react-router-dom";
import shopping_bag from "../../assets/shopping_bag.png";

const SuccessDialog = () => {
  return (
    <div className="form-control mt-8">
      <button
        className="btn btn-primary"
        onClick={() => window.order_modal.showModal()}
      >
        Complete Order
      </button>
      <dialog id="order_modal" className="modal">
        <form method="dialog" className="modal-box">
          <Link
            to={"/"}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
          <img
            src={shopping_bag}
            alt="Shopping Bag"
            className="w-1/3 max-w-xs mx-auto"
          />
          <h1 className="font-bold text-xl text-center py-12">
            Your order has been placed successfully!
          </h1>
        </form>
      </dialog>
    </div>
  );
};

export default SuccessDialog;
