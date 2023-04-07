import User from "../models/User.js";

/** ### /admin/login 
 * Render login form, or log user in and redirect to dashboard. 
 */
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

/** ### /admin/register 
 * Render registration form, or add user to DB and redirect to login. 
 */
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

/** ### /admin/dashboard 
 * Render admin dashboard. 
 */
export const dashboard = async (req, res, next) => {
  try {
    res.render("admin/dashboard", { model: [] });
  } catch (err) {
    next(err);
  }
};
