// src/services/CheckoutService.ts
import sequelize from '../infrastructure/database/database';
import { TransactionDB } from '../infrastructure/database/TransactionDB';
import { TransactionDetailDB } from '../infrastructure/database/TransactionDetailDB';
import { UserDB } from '../infrastructure/database/UserDB';
import { CartDB } from '../infrastructure/database/CartDB';

export class CheckoutService {
  // Injecting repositories might be required here
  async checkout(userId: number, commerceId: number): Promise<void> {
    const transaction = await sequelize.transaction();

    try {
      // Fetch user's cart items
      const cartItems = await CartDB.findAll({
        where: { userId },
        transaction,
      });

      // Calculate the total amount
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Create a new transaction
      const newTransaction = await TransactionDB.create(
        {
          userId,
          commerceId,
          status: 'pending',
          totalAmount,
        },
        { transaction }
      );

      // Create transaction details
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

      // Deduct the total amount from the user's balance
      const user = await UserDB.findByPk(userId, { transaction });
      if (!user) throw new Error('User not found');
      if (user.balance < totalAmount) throw new Error('Insufficient funds');

      user.balance -= totalAmount;
      await user.save({ transaction });

      // Optional: Increment commerce's balance here if required

      // Update transaction to 'completed'
      newTransaction.status = 'completed';
      await newTransaction.save({ transaction });

      // Clear the user's cart
      await CartDB.destroy({ where: { userId }, transaction });

      // Commit the transaction
      await transaction.commit();
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw error;
    }
  }
}
