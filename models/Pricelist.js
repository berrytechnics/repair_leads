import mongoose from "mongoose";

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
      return {
        repairs: Object.keys(model.repairs),
        type: model.type,
        make: model.make,
        model: model.model,
      };
    }
  });

  return JSON.stringify(filteredModels);
};

export default Pricelist;
