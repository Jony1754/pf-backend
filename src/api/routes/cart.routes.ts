import { Router } from 'express';
import { CartController } from '../../interfaces/controllers/CartController';
import { CartRepository } from '../../interfaces/drivers/CartRepository';
import { ProductRepository } from '../../interfaces/drivers/ProductRepository';
import { UserRepository } from '../../interfaces/drivers/UserRepository';
const router = Router();

// Instantiate the repository and controller
const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const userRepository = new UserRepository();
const cartController = new CartController(
  cartRepository,
  productRepository,
  userRepository
);

// POST request to add an item to the cart
router.post('/', (req, res) => cartController.addItemToCart(req, res));

// GET request to retrieve a user's cart
router.get('/:userId', (req, res) => cartController.getCart(req, res));

// PUT request to update a cart item's quantity
router.put('/item/:cartItemId', (req, res) =>
  cartController.updateCartItem(req, res)
);

// DELETE request to remove a cart item
router.delete('/item/:cartItemId', (req, res) =>
  cartController.removeCartItem(req, res)
);

// Export the router to be mounted by the main Express application
export default router;
