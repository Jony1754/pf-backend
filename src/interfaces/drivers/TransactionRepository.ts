import { TransactionDB } from '../../infrastructure/database/TransactionDB';
import { UserDB } from '../../infrastructure/database/UserDB';

export class TransactionRepository {
  // Crear una nueva transacción
  async create(transactionData: any): Promise<TransactionDB> {
    return await TransactionDB.create(transactionData);
  }

  async getAll(userEmail: string): Promise<TransactionDB[]> {
    const user = await UserDB.findOne({
      where: {
        email: userEmail,
      },
    });

    return await TransactionDB.findAll({
      where: {
        userId: user?.id,
      },
    });
  }
  // Obtener transacciones por ID de usuario
  async getByUserId(userId: number): Promise<TransactionDB[]> {
    return await TransactionDB.findAll({
      where: {
        userId: userId,
      },
    });
  }
}
