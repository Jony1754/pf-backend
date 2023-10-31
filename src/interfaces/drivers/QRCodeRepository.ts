import { QRCodeDB } from '../../infrastructure/database/QRCodeDB';

export class QRCodeRepository {
  async create(data: any): Promise<QRCodeDB> {
    return await QRCodeDB.create(data);
  }

  async findByProductId(productId: number): Promise<QRCodeDB | null> {
    return await QRCodeDB.findOne({ where: { productId } });
  }
}
