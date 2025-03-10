import { Router } from 'express';
import productRoutes from './productRoutes.js';
import filterRoutes from './filterRoutes.js';
import uploadRoutes from './uploadRoutes.js';

const router = Router();

router.use(productRoutes);
router.use(filterRoutes);
router.use(uploadRoutes);

export default router;