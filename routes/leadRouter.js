import express from "express";
import * as Lead from '../controllers/LeadController.js';

const router = express.Router();

router.all('/', (req,res)=> Lead.index );
router.all('/create', Lead.create );

export default router;