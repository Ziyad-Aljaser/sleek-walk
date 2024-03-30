import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { getActiveCartId } from "../../utils/FirestoreUtils";

const updateFirebaseAndCreateNewCart = async (userId, db) => {
  try {
    const activeCartId = await getActiveCartId(userId, db);
    if (!activeCartId) {
      throw new Error("No active cart found");
    }

    // Update the existing active cart's status to true
    const cartRef = doc(db, "users", userId, "user_carts", activeCartId);
    await updateDoc(cartRef, {
      status: true,
    });
    console.log("Existing cart marked as completed");

    // Create a new cart for the user with status: false
    const userCartsRef = collection(db, "users", userId, "user_carts");
    const newCart = await addDoc(userCartsRef, {
      status: false,
    });
    console.log(`New cart created with ID: ${newCart.id}`);

    return { oldCartUpdated: true, newCartId: newCart.id };
  } catch (error) {
    console.error("Error updating order status and creating new cart:", error);
    throw error;
  }
};

export default updateFirebaseAndCreateNewCart;
