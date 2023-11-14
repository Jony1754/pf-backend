// src/interfaces/drivers/payment.repository.ts

import { PaymentMethodDB } from '../../infrastructure/database/PaymentMethodDB';
import crypto from 'crypto';

function generateCardIdentifier(cardNumber: string): string {
  return crypto.createHash('sha256').update(cardNumber).digest('hex');
}
export class PaymentRepository {
  async createPaymentMethod(
    userId: number,
    cardNumber: string,
    cardType: string,
    lastFourDigits: string,
    balance: number
  ) {
    const cardIdentifier = generateCardIdentifier(cardNumber);
    return PaymentMethodDB.create({
      userId,
      cardType,
      lastFourDigits,
      cardIdentifier,
      balance,
    });
  }

  async getPaymentMethods(userId: number) {
    return PaymentMethodDB.findAll({ where: { userId } });
  }

  async deletePaymentMethod(paymentMethodId: number) {
    return PaymentMethodDB.destroy({ where: { id: paymentMethodId } });
  }

  // Aquí puedes agregar más métodos según sea necesario, como actualizar el método de pago, etc.
}
