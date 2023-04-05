import Pricelist from "../models/PriceList.js";

export const index = async (req, res, next) => {
  try {
    const models = await Pricelist.find();
    res.render("admin/pricelist/index", { models: models });
  } catch (err) {
    next(err);
  }
};

export const view = async (req, res, next) => {
  try {
    const model = await Pricelist.find({ id: req.params.id });
    res.render("admin/pricelist/view", { model: model });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    if (req.method === "POST") {
      const model = await Pricelist.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.render("admin/pricelist/view", { model: model });
    }
    const model = await Pricelist.findById(req.params.id);
    res.render("admin/pricelist/update", { model: model });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    if (req.method === "POST") {
      const model = await new Pricelist(req.body).save();
      res.redirect(`admin/pricelist/view/${model.id}`);
    }
    res.render("admin/pricelist/create", { model: [] });
  } catch (err) {
    next(err);
  }
};
