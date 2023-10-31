import { QRCodeRepository } from '../drivers/QRCodeRepository';

export class QRCodeController {
  private qrCodeRepository: QRCodeRepository;

  constructor(qrCodeRepository: QRCodeRepository) {
    this.qrCodeRepository = qrCodeRepository;
  }

  async getQRCodeByProductId(productId: number) {
    return await this.qrCodeRepository.findByProductId(productId);
  }
}
