import User from "../models/User.js";
import Lead from "../models/Lead.js";
import { decamelize } from "../helpers/Camelizer.js";

/** ### /admin/login
 * Render login form, or log user in and redirect to dashboard.
 */
export const login = async (req, res, next) => {
  if (req.method === "POST") {
    try {
      const { user } = await User.authenticate()(req.body.username)(
        req.body.password
      );
      res.render("admin/dashboard", { model: user });
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
      const user = new DefaultUser({
        username: req.body.username,
        name: `${req.body.firstname} ${req.body.lastname}`,
        active: false,
      });
      await user.setPassword(req.body.password);
      await user.save();
      res.redirect("/admin/login");
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
    const now = new Date(Date.now());
    const thisMonth = new Date(`${now.getMonth() + 1}/1/${now.getFullYear()}`);
    let models = await Lead.find({ date: { $gte: thisMonth } });
    models.forEach((model) => {
      model.issue = decamelize(model.issue);
    });
    res.render("admin/dashboard", { models: models });
  } catch (err) {
    next(err);
  }
};

export const users = async (req, res, next) => {
  try {
    const models = await User.find({});
    res.render("admin/users", { models: models });
  } catch (err) {
    next(err);
  }
};

export const renderPasswordReset = async (req, res, next) => {
  try {
    const user_id = req.query.id;
    if(!user_id) next(new Error('Invalid request. Reset account with system admin.'))
    const user = await User.findById(user_id);
    res.render("admin/reset", {
      data: {
        user: { username: user.username, id: user.id },
        token: "token",
      },
    });
  } catch (err) {
    next(err);
  }
};
