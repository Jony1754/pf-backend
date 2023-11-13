import { ProductDB } from '../../infrastructure/database/ProductDB';
import { QRCodeDB } from '../../infrastructure/database/QRCodeDB';

export class ProductRepository {
  async getAllProducts() {
    return await ProductDB.findAll();
  }

  async getById(productId: number) {
    return await ProductDB.findByPk(productId);
  }

  async getQRByProductId(productId: number) {
    return await QRCodeDB.findOne({ where: { productId: productId } });
  }

  async getProductIdByQRCode(qrCode: string) {
    const qrCodeDB = await QRCodeDB.findOne({ where: { code: qrCode } });
    if (!qrCodeDB) {
      throw new Error('QR Code not found');
    }
    const product = await ProductDB.findByPk(qrCodeDB.productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async create(data: any): Promise<ProductDB> {
    return await ProductDB.create(data);
  }
}
