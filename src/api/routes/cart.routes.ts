import { Router } from 'express';
import { CartController } from '../../interfaces/controllers/CartController';
import { CartRepository } from '../../interfaces/drivers/CartRepository';
const router = Router();

// Instantiate the repository and controller
const cartRepository = new CartRepository();
const cartController = new CartController(cartRepository);

// POST request to add an item to the cart
router.post('/cart', (req, res) => cartController.addItemToCart(req, res));

// GET request to retrieve a user's cart
router.get('/cart/:userId', (req, res) => cartController.getCart(req, res));

// PUT request to update a cart item's quantity
router.put('/cart/item/:cartItemId', (req, res) =>
  cartController.updateCartItem(req, res)
);

// DELETE request to remove a cart item
router.delete('/cart/item/:cartItemId', (req, res) =>
  cartController.removeCartItem(req, res)
);

// Export the router to be mounted by the main Express application
export default router;
