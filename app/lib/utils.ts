import mongoose from "mongoose";

export const connectToDB = async () => {
  const connection = {
    isConnected: 0
  }
  try {
    if (!process.env.MONGO_URL) { 
      throw new Error('Mongo Url not defined')
    }
    if (connection.isConnected) {
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URL);
    connection.isConnected = db.connections[0].readyState 
  } catch (error) {
    throw new Error("Mongo DB Connection Error");
  }
};
