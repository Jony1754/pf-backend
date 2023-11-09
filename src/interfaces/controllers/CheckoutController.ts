import { Request, Response } from 'express';
import { CheckoutService } from '../../services/checkout.service';
import { CustomRequest } from '../../types/CustomRequest';
export class CheckoutController {
  private checkoutService: CheckoutService;

  constructor(checkoutService: CheckoutService) {
    this.checkoutService = checkoutService;
  }

  public async checkout(req: CustomRequest, res: Response): Promise<Response> {
    const userId = req.user.id; // Assuming you have user information available in the request object, typically added by a middleware after authentication
    const commerceId = req.body.commerceId; // The ID of the commerce would be sent in the request body, or determined in some other way depending on your application logic

    try {
      await this.checkoutService.checkout(userId, commerceId);
      return res.status(200).json({ message: 'Checkout successful' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
