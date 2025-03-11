import { Router } from 'express';
import Product from '../models/productModel.js';

const router = Router();

router.get('/products/filters', async (req, res) => {
  try {
    const filters = {
      style_code: await Product.aggregate([
        { $group: { _id: '$style_code', option_codes: { $addToSet: '$option_code' } } },
        { $project: { value: '$_id', count: { $size: '$option_codes' }, _id: 0 } }
      ]),
      option_code: await Product.aggregate([
        { $group: { _id: '$option_code', count: { $sum: 1 } } },
        { $project: { value: '$_id', count: '$count', _id: 0 } }
      ]),
      MRP: await Product.aggregate([
        { $group: { _id: '$MRP', option_codes: { $addToSet: '$option_code' } } },
        { $project: { value: '$_id', count: { $size: '$option_codes' }, _id: 0 } }
      ]),
      Brick: await Product.aggregate([
        { $group: { _id: '$Brick', option_codes: { $addToSet: '$option_code' } } },
        { $project: { value: '$_id', count: { $size: '$option_codes' }, _id: 0 } }
      ]),
      Sleeve: await Product.aggregate([
        { $group: { _id: '$Sleeve', option_codes: { $addToSet: '$option_code' } } },
        { $project: { value: '$_id', count: { $size: '$option_codes' }, _id: 0 } }
      ])
    };
    res.json(filters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;