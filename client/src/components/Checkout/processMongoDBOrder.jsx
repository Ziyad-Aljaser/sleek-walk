import { collection, getDocs } from "firebase/firestore";
import { getActiveCartId } from "../../utils/FirestoreUtils";
import { getUserAddress } from "../../utils/FirestoreUtils";
import UpdateMongoDB from './UpdateMongoDB';


// Function to fetch cart items from the active cart in Firebase
const fetchCartItems = async (userId, activeCartId, db) => {
  const cartItemsRef = collection(db, "users", userId, "user_carts", activeCartId, "cart_items");
  const snapshot = await getDocs(cartItemsRef);
  const items = snapshot.docs.map(doc => doc.data());
  return items;
};

// Revised function to process the order, send it to MongoDB
const processMongoDBOrder = async (userId, userName, db, totalAmount) => {
  try {
    const activeCartId = await getActiveCartId(userId, db);
    if (!activeCartId) {
      throw new Error("No active cart found");
    }

    // Fetch user details
    const address = await getUserAddress(userId, db); // Make sure to await if this is an async function

    // Fetch cart items
    const items = await fetchCartItems(userId, activeCartId, db);

    // Format cart items
    const formattedItems = items.map(item => ({
      productId: item.productID, // Ensure this key is consistent with your database schema
      title: item.title,
      price: Number(item.price),
      size: Number(item.size),
      quantity: Number(item.quantity)
    }));

    // Aggregate order information
    const order = {
      userId,
      userName,
      userAddress: address,
      userOrder: formattedItems,
      totalAmount
    };

    console.log("Order details:", order);

    // Send order to MongoDB
    await UpdateMongoDB(order);
    console.log("Order sent to MongoDB successfully.");

  } catch (error) {
    console.error("Error processing order:", error);
    throw error;
  }
};


export default processMongoDBOrder;