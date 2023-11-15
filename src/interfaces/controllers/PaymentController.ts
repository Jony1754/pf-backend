// src/interfaces/controllers/payment.controller.ts

import { Request, Response } from 'express';
import { PaymentRepository } from '../drivers/PaymentRepository';
import { CustomRequest } from '../../types/CustomRequest';
import { UserRepository } from '../drivers/UserRepository';
export class PaymentController {
  private paymentRepository: PaymentRepository;
  private userReposiory: UserRepository;
  constructor(
    paymentRepository: PaymentRepository,
    userRepository: UserRepository
  ) {
    this.paymentRepository = paymentRepository;
    this.userReposiory = userRepository;
  }

  async addPaymentMethod(req: CustomRequest, res: Response) {
    const {
      cardNumber,
      cardType,
      lastFourDigits,
      balance,
      cvc,
      expirationDay,
      expirationMonth,
    } = req.body;
    const user = req.user;
    const userData = await this.userReposiory.findByEmail(user.email);
    try {
      const paymentMethod = await this.paymentRepository.createPaymentMethod(
        userData?.id,
        cardNumber,
        cardType,
        lastFourDigits,
        balance,
        cvc,
        expirationDay,
        expirationMonth
      );
      return res.status(201).json(paymentMethod);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getPaymentMethods(req: CustomRequest, res: Response) {
    const user = req.user;
    const userData = await this.userReposiory.findByEmail(user.email);
    try {
      const paymentMethods = await this.paymentRepository.getPaymentMethods(
        Number(userData?.id)
      );
      return res.status(200).json(paymentMethods);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deletePaymentMethod(req: Request, res: Response) {
    const { paymentMethodId } = req.params;
    try {
      await this.paymentRepository.deletePaymentMethod(Number(paymentMethodId));
      return res.status(200).json({ message: 'Payment method deleted' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
