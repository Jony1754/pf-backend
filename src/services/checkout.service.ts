// src/services/CheckoutService.ts
import { formatDate } from '../utils/formatDate';
import { CartDB } from '../infrastructure/database/CartDB';
import { TransactionDB } from '../infrastructure/database/TransactionDB';
import { PaymentMethodDB } from '../infrastructure/database/PaymentMethodDB';
import { TransactionDetailDB } from '../infrastructure/database/TransactionDetailDB';
import sequelize from '../infrastructure/database/database';

export class CheckoutService {
  async processCheckout(userId: number, paymentMethodId: number) {
    const transaction = await sequelize.transaction();

    try {
      // Verificar y obtener los ítems del carrito
      const cartItems = await CartDB.findAll({
        where: { userId },
        transaction,
      });

      if (cartItems.length === 0) {
        throw new Error('No hay ítems en el carrito');
      }

      console.log('cartItems: ', cartItems);
      const auxProduct = cartItems[0].product;
      const commerceId = auxProduct?.commerceId;

      // Calcular el total
      const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

      // Obtener el método de pago
      const paymentMethod = await PaymentMethodDB.findByPk(paymentMethodId, {
        transaction,
      });
      if (!paymentMethod || paymentMethod.balance < totalAmount) {
        throw new Error(
          `Método de pago inválido o saldo insuficiente, balance: ${paymentMethod?.balance}, totalAmount: ${totalAmount}`
        );
      }

      // Crear la transacción
      const newTransaction = await TransactionDB.create(
        {
          userId,
          status: 'pending',
          amount: totalAmount,
          commerceId,
          date: formatDate(new Date()),
        },
        { transaction }
      );

      // Crear los detalles de la transacción
      for (const item of cartItems) {
        await TransactionDetailDB.create(
          {
            transactionId: newTransaction.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          },
          { transaction }
        );
      }

      // Actualizar el saldo del método de pago
      paymentMethod.balance -= totalAmount;
      await paymentMethod.save({ transaction });

      // Actualizar el estado de la transacción
      newTransaction.status = 'completed';
      await newTransaction.save({ transaction });

      // Limpiar el carrito
      await CartDB.destroy({ where: { userId }, transaction });

      await transaction.commit();
      return newTransaction;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
