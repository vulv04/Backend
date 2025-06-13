import mongoose from "mongoose";

function connectDB() {
  mongoose
    .connect(DB_URI)
    .then(() => console.log("MongoDB connected sucssefully"))
    .catch((er) => console.log("MongoDB connection error", err));
}
export default connectDB;
