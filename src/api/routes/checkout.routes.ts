// src/api/routes/checkout.routes.ts

import { Router } from 'express';
import { CheckoutController } from '../../interfaces/controllers/CheckoutController';
import { CheckoutService } from '../../services/checkout.service';
import { UserRepository } from '../../interfaces/drivers/UserRepository';
const router = Router();
const checkoutService = new CheckoutService();
const userReposiory = new UserRepository();
const checkoutController = new CheckoutController(
  checkoutService,
  userReposiory
);

router.post('/', (req, res) => checkoutController.handleCheckout(req, res));

export default router;
