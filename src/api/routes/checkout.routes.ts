import { Router } from 'express';
import { CheckoutController } from '../../interfaces/controllers/CheckoutController';
import { CheckoutService } from '../../services/checkout.service';
const router = Router();

// Instantiate the service and controller
const checkoutService = new CheckoutService();
const checkoutController = new CheckoutController(checkoutService);

// POST request to handle checkout
router.post('/', (req, res) => checkoutController.checkout(req, res));

export default router;
