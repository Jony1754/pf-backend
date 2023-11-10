import { CommerceDB } from '../../infrastructure/database/CommerceDB';
import { ProductDB } from '../../infrastructure/database/ProductDB';
import { TransactionDB } from '../../infrastructure/database/TransactionDB';
import { TransactionDetailDB } from '../../infrastructure/database/TransactionDetailDB';
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

    const transactions = await TransactionDB.findAll({
      where: { userId: user?.id }, // Reemplaza con el ID del usuario deseado

      include: [
        {
          model: CommerceDB,
          attributes: ['name', 'nit'], // Incluye solo el nombre del comercio
        },
        {
          model: TransactionDetailDB,
          attributes: ['quantity', 'price'],
          include: [
            {
              model: ProductDB,
              attributes: ['name', 'price'],
            },
          ],
        },
        {
          model: TransactionDetailDB,
          attributes: ['quantity', 'price'], // Incluye solo la cantidad y el precio
          include: [
            {
              model: ProductDB,
              attributes: ['name', 'price'], // Incluye solo el nombre y el precio del producto
            },
          ],
        },
      ],
      attributes: ['id', 'date', 'amount', 'status'], // Atributos específicos de la transacción
    });

    for (const transaction of transactions) {
      let totalQuantity = 0;
      transaction.details.forEach((detail) => {
        totalQuantity += detail.quantity;
      });
      transaction.dataValues.totalQuantity = totalQuantity; // Add totalQuantity to the transaction object
    }

    return transactions;

    // return await TransactionDB.findAll({
    //   where: {
    //     userId: user?.id,
    //   },
    // });
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
