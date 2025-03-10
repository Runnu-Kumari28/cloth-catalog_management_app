import { Router } from 'express';
import Product from '../models/productModel.js';

const router = Router();

router.get('/products', async (req, res) => {
  const { style_code, option_code, MRP, Brick, Sleeve } = req.query;
  const query = {};
  if (style_code) query.style_code = style_code;
  if (option_code) query.option_code = option_code;
  if (MRP) query.MRP = parseFloat(MRP);
  if (Brick) query.Brick = Brick;
  if (Sleeve) query.Sleeve = Sleeve;

  try {
    const products = await Product.aggregate([
      { $match: query },
      { $group: { _id: '$option_code', items: { $push: '$$ROOT' } } },
    ]);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;