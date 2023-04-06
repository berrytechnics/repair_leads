import Lead from "../models/Lead.js";
import Pricelist from "../models/PriceList.js";

/** 
 * ### /index 
 * Render leads widget form, or save new lead to DB ,email quote to customer and return status.
 * @returns {object|View}
 */
export const index = async (req, res, next) => {
  if (req.method === "POST") {
    return {
      status: 1,
      message: "Email not yet setup",
    };
  }
  try {
    const models = await Pricelist.getRepairList();
    res.render("lead/widget", { models: models });
  } catch (err) {
    next(err);
  }
};
