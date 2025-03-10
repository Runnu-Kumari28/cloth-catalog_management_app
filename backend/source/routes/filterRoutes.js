import { Router } from 'express';
import Product from '../models/productModel.js';

const router = Router();

router.get('/products/filters', async (req, res) => {
  try {
    const filters = {
      style_code: await Product.distinct('style_code'),
      option_code: await Product.distinct('option_code'),
      MRP: await Product.distinct('MRP'),
      Brick: await Product.distinct('Brick'),
      Sleeve: await Product.distinct('Sleeve'),
      option_code_count: await Product.aggregate([
        { $group: { _id: '$option_code', count: { $sum: 1 } } },
      ]),
    };
    res.json(filters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;