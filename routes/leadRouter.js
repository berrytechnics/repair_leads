import express from "express";
import * as Lead from '../controllers/LeadController.js';
import * as Pricelist from '../controllers/PricelistController.js'
const router = express.Router();

router.all(['/','/index'], Lead.index );
router.get('/makes/:type', Pricelist.makes );
router.get('/models/:make', Pricelist.models );
router.get('/repairs/:model', Pricelist.repairs );

export default router;