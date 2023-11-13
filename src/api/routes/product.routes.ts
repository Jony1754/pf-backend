import { Router } from 'express';
import { ProductController } from '../../interfaces/controllers/ProductController';
import { ProductRepository } from '../../interfaces/drivers/ProductRepository';
import { QRCodeRepository } from '../../interfaces/drivers/QRCodeRepository';
import QRCode from 'qrcode';
const router = Router();

const productRepository = new ProductRepository();
const qrCodeRepository = new QRCodeRepository();
const productController = new ProductController(
  productRepository,
  qrCodeRepository
);

router.get('/', async (req, res) => {
  console.log('got in /products');
  console.log('req.params: ', req.params);
  try {
    const products = await productController.getAllProducts();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:productId/qr', async (req, res) => {
  try {
    const productId = parseInt(req.params.productId, 10);
    const qr = await productController.getQRByProductId(productId);
    res.json(qr);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/test', async (req, res) => {
  const id = 1;
  const options = {
    errorCorrectionLevel: 'H', // you can adjust this as needed
    type: 'image/png',
    quality: 0.3, // lower quality for smaller size
    margin: 1,
    color: {
      dark: '#000', // QR Code color
      light: '#FFF', // Background color
    },
    scale: 2, // Adjust scaling for size
    mode: 'Numeric', // Specify Numeric mode
  };

  const qrData = await QRCode.toDataURL(id.toString(), {
    errorCorrectionLevel: 'H',
  });
});

router.post('/qr', async (req, res) => {
  console.log('req.body: ', req.body.qrcode);
  // res.json({ message: 'got in /products/qr' });

  try {
    const qrcode = req.body.qrcode;
    console.log('qrCode: ', qrcode);
    const product = await productController.getProductIdByQRCode(qrcode);
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
