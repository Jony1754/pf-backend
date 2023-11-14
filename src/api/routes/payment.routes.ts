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

router.post('/payment', (req, res) =>
  paymentController.addPaymentMethod(req, res)
);
router.get('/payment', (req, res) =>
  paymentController.getPaymentMethods(req, res)
);
router.delete('/payment/:paymentMethodId', (req, res) =>
  paymentController.deletePaymentMethod(req, res)
);

export default router;
