import { Request, Response } from 'express';
import { CartRepository } from '../drivers/CartRepository';
import { ProductRepository } from '../drivers/ProductRepository';
import { UserRepository } from '../drivers/UserRepository';
import { CustomRequest } from '../../types/CustomRequest';
export class CartController {
  private cartRepository: CartRepository;
  private productRepository: ProductRepository;
  private userRepository: UserRepository;
  constructor(
    cartRepository: CartRepository,
    productRepository: ProductRepository,
    userRepository: UserRepository
  ) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
    this.userRepository = userRepository;
  }

  public async addItemToCart(req: Request, res: Response): Promise<Response> {
    const { userId, productId, quantity } = req.body;

    // TODO: When you add a product to the cart, you first get the QR code and this returns the product you want to add to the cart.
    // You may want to add validation or transformation logic here.
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const price = await this.calculatePrice(productId, quantity); // Assume this is a method to calculate price.
      const cartItem = await this.cartRepository.addItemToCart(
        userId,
        productId,
        quantity,
        price
      );
      const product = await this.productRepository.getById(productId);
      return res.status(201).json({
        message: 'Item added to cart',
        productName: product?.name,
        originalPrice: product?.price,
        cartItem,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async getCart(req: CustomRequest, res: Response): Promise<Response> {
    const user = req.user;
    const userData = await this.userRepository.findByEmail(user.email);
    try {
      const cartItems = await this.cartRepository.getCartByUserId(
        parseInt(userData?.id)
      );
      return res.status(200).json(cartItems);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async updateCartItem(req: Request, res: Response): Promise<Response> {
    const { productId, quantity, price } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const updatedCartItem = await this.cartRepository.updateCartItem(
        productId,
        quantity,
        price
      );
      return res.status(200).json(updatedCartItem);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async removeCartItem(req: Request, res: Response): Promise<Response> {
    const { cartItemId } = req.params;

    try {
      const success = await this.cartRepository.removeCartItem(
        parseInt(cartItemId)
      );
      if (success) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ message: 'Cart item not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  private async calculatePrice(
    productId: number,
    quantity: number
  ): Promise<number> {
    const product = await this.productRepository.getById(productId);
    if (product) {
      return product.price * quantity;
    }

    return 0;
  }
}
