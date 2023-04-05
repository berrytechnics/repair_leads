import express from "express";
import * as Pricelist from '../controllers/PricelistController.js';

const router = express.Router();

// import * as svgCaptcha from "svg-captcha";

router.get('/pricelist', Pricelist.index )

export default router;
