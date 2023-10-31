import { Router } from 'express';
import { QRCodeController } from '../../interfaces/controllers/QRCodeController';
import { QRCodeRepository } from '../../interfaces/drivers/QRCodeRepository';

const router = Router();
const qrCodeRepository = new QRCodeRepository();
const qrCodeController = new QRCodeController(qrCodeRepository);

router.get('/:productId', async (req, res) => {
  try {
    const qrCode = await qrCodeController.getQRCodeByProductId(
      Number(req.params.productId)
    );
    if (!qrCode) {
      return res.status(404).json({ error: 'QRCode not found' });
    }
    res.status(200).json(qrCode);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
