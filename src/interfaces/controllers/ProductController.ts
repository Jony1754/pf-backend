import { ProductDB } from '../../infrastructure/database/ProductDB';
import { ProductRepository } from '../../interfaces/drivers/ProductRepository';
import { QRCodeRepository } from '../drivers/QRCodeRepository';
import QRCode from 'qrcode';
export class ProductController {
  private productRepository: ProductRepository;
  private qrCodeRepository: QRCodeRepository; // Declara la propiedad
  constructor(
    productRepository: ProductRepository,
    qrCodeRepository: QRCodeRepository
  ) {
    // Modifica el constructor
    this.productRepository = productRepository;
    this.qrCodeRepository = qrCodeRepository; // Inicializa la propiedad
  }
  async createProduct(
    name: string,
    price: number,
    commerceId: number
  ): Promise<ProductDB> {
    const product = await this.productRepository.create({
      name,
      price,
      commerceId,
    });

    // Generamos el QR basado en el ID del producto
    const qrCodeData = await QRCode.toDataURL(product.id.toString());

    // Almacenamos el QR en la base de datos
    await this.qrCodeRepository.create({
      productId: product.id,
      code: qrCodeData,
    });

    return product;
  }

  async getAllProducts() {
    return await this.productRepository.getAllProducts();
  }

  async getQRByProductId(productId: number) {
    return await this.productRepository.getQRByProductId(productId);
  }
}
