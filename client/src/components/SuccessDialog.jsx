import { Link } from "react-router-dom";


const SuccessDialog = ({text, img}) => {
  return (
    <dialog id="order_modal" className="modal" open>
      <form method="dialog" className="modal-box">
        <Link to={"/"} className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </Link>
        <img src={img} alt="Shopping Bag" className="w-1/3 max-w-xs mx-auto" />
        <h1 className="font-bold text-xl text-center py-12">
          {text}
        </h1>
      </form>
    </dialog>
  );
};

export default SuccessDialog;
