import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name : String,
  address: {
    street: String,
    city: String,
    state: String,
    zip:String
  },
  phone: Number,
  email: String
});
export default mongoose.model("Location", locationSchema);
