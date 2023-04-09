import User from "../models/User.js";
import Lead from '../models/Lead.js';

/** ### /admin/login 
 * Render login form, or log user in and redirect to dashboard. 
 */
export const login = async (req, res, next) => {
  if (req.method === "POST") {
    try {
      const { user } = await User.authenticate()(req.body.username)(req.body.password);
      res.render('admin/dashboard', {model: user});
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
        active: false
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
    const thisMonth = new Date(`${now.getMonth()}/1/${now.getFullYear()}`);
    let models = await Lead.find({date: {$gte: thisMonth}});
    console.log(models)
    res.render("admin/dashboard", { models: models });
  } catch (err) {
    next(err);
  }
};
