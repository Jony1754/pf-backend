import { Router } from 'express';
import { ProductController } from '../../interfaces/controllers/ProductController';
import { ProductRepository } from '../../interfaces/drivers/ProductRepository';
import { QRCodeRepository } from '../../interfaces/drivers/QRCodeRepository';
const router = Router();

const productRepository = new ProductRepository();
const qrCodeRepository = new QRCodeRepository();
const productController = new ProductController(
  productRepository,
  qrCodeRepository
);

router.get('/products', async (req, res) => {
  try {
    const products = await productController.getAllProducts();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/products/:productId/qr', async (req, res) => {
  try {
    const productId = parseInt(req.params.productId, 10);
    const qr = await productController.getQRByProductId(productId);
    res.json(qr);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
