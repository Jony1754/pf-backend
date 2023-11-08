import { TransactionRepository } from '../../interfaces/drivers/TransactionRepository';
import { UserRepository } from '../../interfaces/drivers/UserRepository';
import { CommerceRepository } from '../../interfaces/drivers/CommerceRepository';
import { ProductRepository } from '../../interfaces/drivers/ProductRepository';

export class TransactionController {
  private transactionRepository: TransactionRepository;
  private userRepository: UserRepository;
  private commerceRepository: CommerceRepository;
  private productRepository: ProductRepository;

  constructor(
    transactionRepository: TransactionRepository,
    userRepository: UserRepository,
    commerceRepository: CommerceRepository,
    productRepository: ProductRepository
  ) {
    this.transactionRepository = transactionRepository;
    this.userRepository = userRepository;
    this.commerceRepository = commerceRepository;
    this.productRepository = productRepository;
  }

  async getAllTransactions(userEmail: string) {
    return this.transactionRepository.getAll(userEmail);
  }

  async createTransaction(
    userId: number,
    commerceId: number,
    productId: number
  ) {
    // 1. Obtener el producto por ID y determinar su precio.
    const product = await this.productRepository.getById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    const price = product.price;

    // 2. Obtener el saldo del usuario y verificar si tiene suficiente saldo.
    const user = await this.userRepository.getById(userId);
    if (!user || user.balance < price) {
      throw new Error('Insufficient funds');
    }

    // 3. Deduce el precio del producto del saldo del usuario y añádelo al saldo del dueño del comercio.
    user.balance -= price;
    await this.userRepository.updateBalance(userId, user.balance);

    const commerce = await this.commerceRepository.getById(commerceId);
    if (commerce) {
      const owner = await this.userRepository.getById(commerce.userId);
      if (owner) {
        owner.balance += price;
        await this.userRepository.updateBalance(owner.id, owner.balance);
      }
    }

    // 4. Crea un registro de transacción.
    const transaction = await this.transactionRepository.create({
      userId,
      commerceId,
      productId,
      date: new Date(),
      amount: price,
      status: 'completed',
    });

    return transaction;
  }

  async getUserTransactions(userId: number) {
    return this.transactionRepository.getByUserId(userId);
  }
}
