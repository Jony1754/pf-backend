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

  async create(data: any): Promise<ProductDB> {
    return await ProductDB.create(data);
  }
}
