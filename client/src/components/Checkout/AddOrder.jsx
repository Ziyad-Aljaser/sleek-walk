import React, { useState } from 'react';

import SuccessDialog from '../SuccessDialog';
import shopping_bag from '../../assets/shopping_bag.png';

import updateMongoDB from './UpdateMongoDB';
import updateFirebase from './UpdateFirebase';

const AddOrder = () => {
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const handleCompleteOrder = async () => {
        try {
            // Process MongoDB update
            await updateMongoDB();
            // Once MongoDB is updated, process Firebase update
            await updateFirebase();
            // Both updates are complete, show success dialog or notify parent
            setShowSuccessDialog(true);
        } catch (error) {
            console.error("Error completing order:", error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div className="form-control mt-8">
            <button className="btn btn-primary" onClick={handleCompleteOrder}>
                Complete Order
            </button>
            {showSuccessDialog && (
                    <SuccessDialog text={"Your order has been placed successfully"} img={shopping_bag} />
                  )}
        </div>
    );
};

export default AddOrder;

