import Location from "../models/Location.js";

export const create = async (req, res, next) => {
  try {
    return await new Location(req.body).save();
  } catch (err) {
    next(err);
  }
};

export const index = async (req, res, next) => {
  try {
    const models = await Location.find();
    res.render("location/index", { models: models });
  } catch (err) {
    next(err);
  }
};
