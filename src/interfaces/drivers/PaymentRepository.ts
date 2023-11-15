// src/interfaces/drivers/payment.repository.ts

import { PaymentMethodDB } from '../../infrastructure/database/PaymentMethodDB';
import crypto from 'crypto';
let tarjetasDePrueba = [
  {
    cardType: 'Visa',
    cardNumber: '4242424242424242',
    lastFourDigits: '4242',
    balance: 100000,
  },
  {
    cardType: 'Visa',
    cardNumber: '4012888888881881',
    lastFourDigits: '1881',
    balance: 120000,
  },
  {
    cardType: 'MasterCard',
    cardNumber: '5555555555554444',
    lastFourDigits: '4444',
    balance: 8000,
  },
  {
    cardType: 'MasterCard',
    cardNumber: '2223003122003222',
    lastFourDigits: '3222',
    balance: 9500,
  },
  {
    cardType: 'American Express',
    cardNumber: '378282246310005',
    lastFourDigits: '0005',
    balance: 11000,
  },
  {
    cardType: 'Discover',
    cardNumber: '6011111111111117',
    lastFourDigits: '1117',
    balance: 730000,
  },
  {
    cardType: 'Diners Club',
    cardNumber: '3056930009020004',
    lastFourDigits: '0004',
    balance: 50000,
  },
  {
    cardType: 'JCB',
    cardNumber: '3530111333300000',
    lastFourDigits: '0000',
    balance: 85050,
  },
  // Tarjetas que simulan casos específicos
  {
    cardType: 'Visa (rechazada)',
    cardNumber: '4000000000000002',
    lastFourDigits: '0002',
    balance: 0,
  },
  {
    cardType: 'MasterCard (sin fondos)',
    cardNumber: '5105105105105100',
    lastFourDigits: '5100',
    balance: 0,
  },
  // Puedes agregar más tarjetas según lo necesites
];

const TARJETAS_PERMITIDAS = tarjetasDePrueba.map(
  (tarjeta) => tarjeta.cardNumber
);

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
    // Verificar si la tarjeta está en la lista permitida
    if (!TARJETAS_PERMITIDAS.includes(cardNumber)) {
      throw new Error('Número de tarjeta no permitido.');
    }

    // Generar el identificador de la tarjeta
    const cardIdentifier = generateCardIdentifier(cardNumber);

    // Verificar si el usuario ya tiene esta tarjeta
    const existingPaymentMethod = await PaymentMethodDB.findOne({
      where: { userId, cardIdentifier },
    });
    if (existingPaymentMethod) {
      throw new Error('El método de pago ya existe para este usuario.');
    }

    // Crear el método de pago
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
