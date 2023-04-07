import Lead from "../models/Lead.js";
import Pricelist from "../models/PriceList.js";
import { camelize } from "../helpers/Camelizer.js";

/**
 * ### /index
 * Render leads widget form, or save new lead to DB ,email quote to customer and return status.
 * @returns {JSON|View}
 */
export const index = async (req, res, next) => {
  if (req.method === "POST") {
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
  } else {
    try {
      const types = await Pricelist.getTypes();
      res.render("lead/widget", { types });
    } catch (err) {
      next(err);
    }
  }
};
