import React, { useState } from 'react';

import { useAuth } from "../../contexts/AuthContext";

import SuccessDialog from '../SuccessDialog';
import shopping_bag from '../../assets/shopping_bag.png';

import updateMongoDB from './UpdateMongoDB';
import updateFirebase from './UpdateFirebase';

const AddOrder = () => {
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const { currentUser } = useAuth();

    const handleCompleteOrder = async () => {
        try {
            // Indicates the start of the order completion process
            setLoading(true);
    
            // Once MongoDB is updated, process Firebase update
            await updateFirebase(currentUser.uid);

            // Process MongoDB update
            await updateMongoDB();
    
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
            {showSuccessDialog && (
                    <SuccessDialog text={"Your order has been placed successfully"} img={shopping_bag} />
                  )}
        </div>
    );
};

export default AddOrder;
