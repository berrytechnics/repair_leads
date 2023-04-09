import Lead from "../models/Lead.js";
import Pricelist from "../models/PriceList.js";
import { camelize } from "../helpers/Camelizer.js";

/**
 * ### /index GET
 * Render quote widget form.
 * @returns JSON obj
 */
export const index = async (req, res, next) => {
  try {
    const types = await Pricelist.getTypes();
    res.render("lead/widget", { types });
  } catch (err) {
    next(err);
  }
};

/**
 * ### /index POST
 * Create a new lead from form and email quote to customer.
 * @returns JSON obj
 */
export const create = async (req, res, next) => {
  try {
    let repairPrice;
    const prices = await Pricelist.findOne(
      { model: req.body.model },
      "repairs"
    );
    repairPrice = parseFloat(prices.repairs[`${camelize(req.body.repair)}`]);
    repairPrice ? null : (repairPrice = "Not available");
    // await new Lead(req.body).save();
    // TODO: Send quote to customer
    res.json({
      success: "success",
      message: "Thank you for your request.",
    });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    return false
  } catch (err) {
    next(err);
  }
};
