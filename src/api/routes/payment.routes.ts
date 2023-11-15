// src/api/routes/payment.routes.ts

import { Router } from 'express';
import { PaymentController } from '../../interfaces/controllers/PaymentController';
import { PaymentRepository } from '../../interfaces/drivers/PaymentRepository';
import { UserRepository } from '../../interfaces/drivers/UserRepository';
const router = Router();
const paymentRepository = new PaymentRepository();
const userReposiory = new UserRepository();
const paymentController = new PaymentController(
  paymentRepository,
  userReposiory
);

router.post('/', (req, res) => paymentController.addPaymentMethod(req, res));
router.get('/', (req, res) => paymentController.getPaymentMethods(req, res));
router.delete('/:paymentMethodId', (req, res) =>
  paymentController.deletePaymentMethod(req, res)
);

export default router;
