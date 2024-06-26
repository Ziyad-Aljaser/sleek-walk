import React, { useState } from "react";

import { db } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";

import useTotal from "../../hooks/useTotal";

import SuccessDialog from "../SuccessDialog";
import shopping_bag from "../../assets/shopping_bag.png";

import processMongoDBOrder from "./processMongoDBOrder";
import updateFirebase from "./UpdateFirebase";


const ConfirmUserCheckout = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  const totalAmount = useTotal(currentUser.uid, db);

  const userEmail = currentUser.email;

  const handleCompleteOrder = async () => {
    try {
      // Indicates the start of the order completion process
      setLoading(true);

      // Process MongoDB update
      await processMongoDBOrder(currentUser.uid, userEmail, currentUser.displayName, db, totalAmount);

      // Once MongoDB is updated, process Firebase update
      await updateFirebase(currentUser.uid, db);

      // Both updates are complete, show success dialog or notify parent
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Error completing order:", error);
    } finally {
      // Ensures loading state is cleared whether the operation succeeds or fails
      setLoading(false);
    }
  };

  return (
    <div className="form-control mt-8">
      <button className="btn btn-primary" onClick={handleCompleteOrder}>
        Complete Order
      </button>
      {loading && (
            <dialog id="loading_modal" className="modal" open>
            <div className="modal-box flex flex-col items-center justify-center">
              {/* Close button removed for loading dialog */}
              <span className="loading loading-spinner text-primary py-12"></span>
              <h1 className="font-bold text-xl text-center py-12">
                Placing your order...
              </h1>
            </div>
          </dialog>
      )}
      {showSuccessDialog && (
        <SuccessDialog
          text={"Your order has been placed successfully"}
          img={shopping_bag}
        />
      )}
    </div>
  );
};

export default ConfirmUserCheckout;
