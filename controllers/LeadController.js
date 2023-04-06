import Lead from "../models/Lead.js";
import Pricelist from "../models/PriceList.js";

/**
 * ### /index
 * Render leads widget form, or save new lead to DB ,email quote to customer and return status.
 * @returns {object|View}
 */
export const index = async (req, res, next) => {
  if (req.method === "POST") {
    res.json({
      status: 1,
      message: "Email not yet setup",
      originalBody: req.body
    });
  } else {
    try {
      const types = await Pricelist.getTypes();
      res.render("lead/widget", { types });
    } catch (err) {
      next(err);
    }
  }
};
