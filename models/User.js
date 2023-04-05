import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
// Create Model
const Schema = mongoose.Schema;
const User = new Schema({
	name:String,
	admin:{
		type:Boolean,
		default:false
	},
	leads:{
		type:Boolean,
		default:false
	}
});
// Export Model
User.plugin(passportLocalMongoose);

export default mongoose.model("userData", User, "userData");