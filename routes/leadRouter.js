import express from "express";
import * as Lead from '../controllers/LeadController.js';

const router = express.Router();

router.all(['/','/index'], Lead.index );
router.all('/create', Lead.create );

export default router;