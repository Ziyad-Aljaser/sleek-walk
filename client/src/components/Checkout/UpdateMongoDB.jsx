/**
 * This file is responsible for adding the order to MongoDB.
 */

const UpdateMongoDB = () => {
  return new Promise((resolve, reject) => {
    // Simulate asynchronous database update operation
    setTimeout(() => {
      console.log("MongoDB updated successfully");
      resolve("MongoDB update complete");
    }, 1000); // Just for demonstration
  });
};

export default UpdateMongoDB;
