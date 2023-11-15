// src/interfaces/controllers/checkout.controller.ts

import { Request, Response } from 'express';
import { CheckoutService } from '../../services/checkout.service';
import { CustomRequest } from '../../types/CustomRequest';
import { UserRepository } from '../drivers/UserRepository';
export class CheckoutController {
  private checkoutService: CheckoutService;
  private userReposiory: UserRepository;
  constructor(
    checkoutService: CheckoutService,
    userRepository: UserRepository
  ) {
    this.checkoutService = checkoutService;
    this.userReposiory = userRepository;
  }

  async handleCheckout(req: CustomRequest, res: Response) {
    try {
      const user = req.user;
      const userData = await this.userReposiory.findByEmail(user.email);

      const paymentMethodId = req.body.paymentMethodId;
      const transaction = await this.checkoutService.processCheckout(
        userData?.id,
        paymentMethodId
      );
      return res.status(200).json(transaction);
    } catch (error: any) {
      console.log(error);
      console.log('error en checkout: ', error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  // ... otros métodos según sea necesario
}
