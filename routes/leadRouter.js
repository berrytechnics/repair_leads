import express from "express";
import { body, validationResult } from "express-validator";
import * as Lead from "../controllers/LeadController.js";
import * as Pricelist from "../controllers/PricelistController.js";
const router = express.Router();

router.get(["/", "/index"], Lead.index);
router.post(
  ["/", "/index"],
  body("firstname").isAlpha().trim().escape(),
  body("lastname").isAlpha().trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("phone").isMobilePhone().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    } else next();
  },
  Lead.index
);

router.get("/makes/:type", Pricelist.makes);
router.get("/models/:make", Pricelist.models);
router.get("/repairs/:model", Pricelist.repairs);

export default router;
