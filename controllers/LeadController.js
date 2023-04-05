import Lead from '../models/Lead.js';
// import Pricelist from '../models/PriceList.js';

export const index = async (req,res,next) => {
    // const data = await Pricelist.getRepairlist()
    res.send(200);
};

export const create = async (req,res,next) => res.send(200);
