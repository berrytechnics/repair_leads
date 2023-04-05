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

Pricelist.getRepairList = async () => {
  const models = await Pricelist.find();
  const filteredModels = models.map((model) => {
    {
      const filteredRepairs = Object.keys(model.repairs);
      filteredRepairs.forEach((repair, i) => {
        filteredRepairs[i] =
          repair.toLowerCase() === "lcd"
            ? Camelizer.decamelize(repair, true)
            : Camelizer.decamelize(repair);
      });
      return {
        repairs: filteredRepairs,
        type: model.type,
        make: model.make,
        model: model.model,
      };
    }
  });
  return JSON.stringify(filteredModels);
};

export default Pricelist;
