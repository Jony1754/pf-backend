import { TransactionDB } from '../../infrastructure/database/TransactionDB';

export class TransactionRepository {
  // Crear una nueva transacción
  async create(transactionData: any): Promise<TransactionDB> {
    return await TransactionDB.create(transactionData);
  }

  async getAll(): Promise<TransactionDB[]> {
    return await TransactionDB.findAll();
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
