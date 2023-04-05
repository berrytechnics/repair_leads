import express from "express";
import * as User from '../controllers/UserController.js';
import * as Pricelist from '../controllers/PricelistController.js';

const router = express.Router();

router.all('/login', User.login );
router.all('/register', User.register );
router.all('/dashboard', User.dashboard );

router.all('/pricelist', Pricelist.index );
router.all('/pricelist/create', Pricelist.create );
router.all('/pricelist/view/:id', Pricelist.view );
router.all('/pricelist/update/:id', Pricelist.update);

export default router;
