import { CartDB } from '../../infrastructure/database/CartDB';
import { ProductDB } from '../../infrastructure/database/ProductDB';
export class CartRepository {
  async addItemToCart(
    userId: number,
    productId: number,
    quantity: number,
    price: number
  ): Promise<CartDB> {
    const cartItem = await CartDB.create({
      userId,
      productId,
      quantity,
      price,
    });
    return cartItem;
  }

  async getCartByUserId(userId: number): Promise<CartDB[]> {
    const cartItems = await CartDB.findAll({
      where: { userId },
      include: [
        {
          model: ProductDB,
          as: 'product',
        },
      ], // Depending on your relations, you might want to include related entities here.
    });
    return cartItems;
  }

  async updateCartItem(
    productId: number,
    quantity: number,
    userId: number
  ): Promise<CartDB> {
    // Buscar el ítem en el carrito
    const cartItem = await CartDB.findOne({
      where: { userId, productId },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    // Buscar el producto para obtener el precio unitario
    const product = await ProductDB.findByPk(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Calcular el nuevo precio total
    const newPrice = product.price * quantity;

    // Actualizar la cantidad y el precio en el carrito
    cartItem.quantity = quantity;
    cartItem.price = newPrice;

    await cartItem.save();

    return cartItem;
  }
  async removeCartItem(cartItemId: number): Promise<boolean> {
    console.log('removeCartItem: ', cartItemId);
    const deleted = await CartDB.destroy({
      where: { id: cartItemId },
    });

    return deleted > 0;
  }

  // ... You can add more methods as needed
}
