import express from 'express';
import userRoutes from './routes/user.routes';
import commerceRoutes from './routes/commerce.routes';
import productRoutes from './routes/product.routes';
import transactionRoutes from './routes/transaction.routes';
import qrcodeRoutes from './routes/qrcode.routes';
import checkoutRoutes from './routes/checkout.routes';
const router = express.Router();

router.use('/users', userRoutes);
router.use('/commerces', commerceRoutes);
router.use('/products', productRoutes);
router.use('/transactions', transactionRoutes);
router.use('/qrcodes', qrcodeRoutes);
router.use('/checkout', checkoutRoutes);
export default router;
