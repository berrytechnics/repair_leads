import Pricelist from "../models/PriceList.js";

/** ### /pricelist
 * Render list of all Pricelist devices.
 */
export const index = async (req, res, next) => {
  try {
    const models = await Pricelist.find();
    res.render("pricelist/index", { models: models });
  } catch (err) {
    next(err);
  }
};

/** ### /pricelist/view/:id
 * Render single Pricelist device view.
 */
export const view = async (req, res, next) => {
  try {
    const model = await Pricelist.find({ id: req.params.id });
    res.render("pricelist/view", { model: model });
  } catch (err) {
    next(err);
  }
};

/** ### /pricelist/update/:id
 * Render update form, or save form to DB and redirect to view.
 */
export const update = async (req, res, next) => {
  try {
    if (req.method === "POST") {
      const model = await Pricelist.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.render("pricelist/view", { model: model });
    }
    const model = await Pricelist.findById(req.params.id);
    res.render("pricelist/update", { model: model });
  } catch (err) {
    next(err);
  }
};

/** ### /pricelist/create
 *  Render create form, or create new DB entry and redirect to view.
 */
export const create = async (req, res, next) => {
  try {
    if (req.method === "POST") {
      const model = await new Pricelist(req.body).save();
      res.redirect(`pricelist/view/${model.id}`);
    }
    res.render("pricelist/create", { model: [] });
  } catch (err) {
    next(err);
  }
};

/**
 * Returns data for widget.
 * @returns JSON object
 */
export const types = async (req, res, next) => {
  try {
    res.send(await Pricelist.getTypes());
  } catch (err) {
    next(err);
  }
};

/**
 * Returns data for widget.
 * @returns JSON object
 */
export const makes = async (req, res, next) => {
  try {
    res.send(await Pricelist.getMakes(req.params.type));
  } catch (err) {
    next(err);
  }
};

/**
 * Returns data for widget.
 * @returns JSON object
 */
export const models = async (req, res, next) => {
  try {
    res.send(await Pricelist.getModels(req.params.make));
  } catch (err) {
    next(err);
  }
};

/**
 * Returns data for widget.
 * @returns JSON object
 */
export const repairs = async (req, res, next) => {
  try {
    res.send(await Pricelist.getRepairs(req.params.model));
  } catch (err) {
    next(err);
  }
};
