import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;
const User = new Schema({
  name: String,
  resetToken: {
    type: String,
    default: null
  },
  active: {
    type: Boolean,
    default: false
  }
});

User.plugin(passportLocalMongoose);

export default mongoose.model("userData", User, "userData");
