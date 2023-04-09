import express from "express";
import { body } from 'express-validator';
import * as User from "../controllers/UserController.js";
import * as Pricelist from "../controllers/PricelistController.js";
import * as Lead from '../controllers/LeadController.js';

const router = express.Router();

router.all("/login", User.login);
router.all("/register", User.register);
router.get("/dashboard", User.dashboard);

router.all("/pricelist", Pricelist.index);
router.all("/pricelist/create", Pricelist.create);
router.all("/pricelist/view/:id", Pricelist.view);
router.all("/pricelist/update/:id", Pricelist.update);

router.post(
'/lead/update',  
body("name").trim().escape(),
body("email").isEmail().normalizeEmail(),
body("phone").isMobilePhone().trim().escape(),
body("name").trim().escape(),
Lead.update
)

export default router;
