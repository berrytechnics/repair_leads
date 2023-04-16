import express from "express";
import { body } from "express-validator";
import * as User from "../controllers/UserController.js";
import * as Pricelist from "../controllers/PricelistController.js";
import * as Lead from "../controllers/LeadController.js";
import * as Location from "../controllers/LocationController.js";

const router = express.Router();

router.all("/login", User.login);
router.get("/dashboard", User.dashboard);
router.get("/password-reset", User.renderPasswordReset);

router.all("/pricelist", Pricelist.index);
router.all("/pricelist/create", Pricelist.create);
router.all("/pricelist/view", Pricelist.view);
router.all("/pricelist/edit", Pricelist.update);

router.get("/location", Location.index);

router.post(
  "/lead/update",
  body("name").trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("phone").isMobilePhone().trim().escape(),
  body("make").trim().escape(),
  body("model").trim().escape(),
  body("issue").trim().escape(),
  body("price").trim().escape(),
  Lead.update
);

router.get("/users", User.users);

router.get("/lead/dataTable", Lead.dataTable);

export default router;
