import User from "../models/User.js";

export const login = async (req, res, next) => {
  if (req.method === "POST") {
    try {
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }
  res.render("admin/login", { model: [] });
};

export const register = async (req, res, next) => {
  if (req.method === "POST") {
    try {
      User.register(
        { username: req.body.username },
        req.body.password,
        (err) => {
          next(err);
        }
      );
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }
  res.render("admin/register", { model: [] });
};

export const dashboard = async (req, res, next) => {
  try {
    res.render("admin/dashboard", { data: [] });
  } catch (err) {
    next(err);
  }
};
