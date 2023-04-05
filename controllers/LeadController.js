import Lead from "../models/Lead.js";
import Pricelist from "../models/PriceList.js";

export const index = async (req, res, next) => {
  try {
    const models = await Pricelist.getRepairList();
    res.render("lead/index", { models: models });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => res.send(200);
