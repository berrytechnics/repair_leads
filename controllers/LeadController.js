import Lead from "../models/Lead.js";
import Pricelist from "../models/PriceList.js";
import { camelize, decamelize } from "../helpers/Camelizer.js";

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

/**
 * ### /leads/update POST
 * Updates lead model.
 */
export const update = async (req, res, next) => {
  try {
    res.send(req.body);
  } catch (err) {
    next(err);
  }
};

export const dataTable = async (req, res, next) => {
  try {
    const now = new Date(Date.now());
    const thisMonth = new Date(`${now.getMonth() + 1}/1/${now.getFullYear()}`);
    let models = await Lead.find({ date: { $gte: thisMonth } });
    models.forEach((model) => {
      model.issue = decamelize(model.issue);
    });
    res.send({ data: models });
  } catch (err) {
    next(err);
  }
};
