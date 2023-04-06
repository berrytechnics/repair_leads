import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
	name:String,
	location:String,
	email:String,
	phone:String,
	make:String,
	model:String,
	issue:String,
	price:Number,
	respondedDate:Date,
	convertedDate:Date,
	convertedUser:{
		type:String,
		default:""
	},
	respondedUser:{
		type:String,
		default:""
	},
	date:{
		type:Date,
		default: new Date().toISOString()
	},
	modified:{
		type:Date,
		default: new Date().toISOString()
	},
	emailed:{
		type:Boolean,
		default:false
	},
	responded:{
		type:Boolean,
		default:false
	},
	converted:{
		type:Boolean,
		default:false
	},
	hidden:{
		type:Boolean,
		default:false
	}
}); 
export default mongoose.model("Leads",leadSchema);