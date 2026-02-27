import mongoose from "mongoose";

export async function connectDB(url) {
  try {
    const conn = await mongoose.connect(url);
    if (conn.connections === 0) {
      throw new Error("database connection failed");
    }

    console.log(`db connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}
