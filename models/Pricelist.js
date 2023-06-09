import mongoose from "mongoose";
import * as Camelizer from "../helpers/Camelizer.js";

const Pricelist = mongoose.model(
  "Pricelist",
  new mongoose.Schema({
    type: String,
    make: String,
    model: String,
    repairs: {
      rearGlass: {
        type: String,
        default: "0",
      },
      battery: {
        type: String,
        default: "0",
      },
      frontCamera: {
        type: String,
        default: "0",
      },
      rearCamera: {
        type: String,
        default: "0",
      },
      chargePort: {
        type: String,
        default: "0",
      },
      earSpeaker: {
        type: String,
        default: "0",
      },
      lcd: {
        type: String,
        default: "0",
      },
      screen: {
        type: String,
        default: "0",
      },
      loudSpeaker: {
        type: String,
        default: "0",
      },
      liquidDamage: {
        type: String,
        default: "0",
      },
    },
  })
);

/** Returns all device types */
Pricelist.getTypes = async () => {
  try {
    return Pricelist.find().distinct("type");
  } catch (err) {
    next(err);
  }
};
Pricelist.getMakes = async (type) => {
  try {
    return Pricelist.find({ type: type }).distinct("make");
  } catch (err) {
    next(err);
  }
};
Pricelist.getModels = async (make, type) => {
  try {
    return await Pricelist.find({ type: type, make: make }).distinct("model");
  } catch (err) {
    next(err);
  }
};
Pricelist.getRepairs = async (model) => {
  try {
    const repairList = await Pricelist.findOne({ model: model }).select(
      "repairs"
    );
    let repairs = Object.keys(repairList.repairs);
    let repairArr = [];
    repairs.forEach((repair) => {
      repairArr.push(Camelizer.decamelize(repair));
    });
    return repairArr;
  } catch (err) {
    next(err);
  }
};

export default Pricelist;
