import { Router } from 'express';
import fs from 'fs';
import csv from 'csv-parser';
import { v4 as uuidv4 } from 'uuid';
import Product from '../models/productModel.js';
import upload from '../middleware/upload.js';

const router = Router();

router.post('/products/upload', upload.single('file'), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        style_code: data.style_code,
        option_code: data.option_code,
        EAN_code: uuidv4(),
        MRP: parseFloat(data.MRP),
        Brick: data.Brick,
        Sleeve: data.Sleeve,
      });
    })
    .on('end', async () => {
      try {
        await Product.insertMany(results);
        fs.unlinkSync(req.file.path);
        res.status(201).json({ message: 'Data uploaded successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
});

export default router;