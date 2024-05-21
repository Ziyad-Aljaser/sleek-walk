const UpdateMongoDB = async (orderData) => {
  const jsonString = JSON.stringify(orderData);
  console.log("Sending JSON to server:", jsonString); // Log the JSON string
  try {
    const response = await fetch("https://sleek-walk.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      // If the server responds with an error status, throw an error to be caught by the catch block
      throw new Error('Failed to save order to MongoDB');
    }

    const result = await response.json();
    console.log("Order successfully saved", result);
    return result; // Return the result for further processing if needed
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default UpdateMongoDB;
