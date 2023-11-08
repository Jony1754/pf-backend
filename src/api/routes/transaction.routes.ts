import { Router } from 'express';
import { TransactionController } from '../../interfaces/controllers/TransactionController';
import { TransactionRepository } from '../../interfaces/drivers/TransactionRepository';
import { UserRepository } from '../../interfaces/drivers/UserRepository';
import { CommerceRepository } from '../../interfaces/drivers/CommerceRepository';
import { ProductRepository } from '../../interfaces/drivers/ProductRepository';
import { CustomRequest } from '../../types/CustomRequest';

// Middleware para autenticación (deberías tenerlo en algún lugar de tu código)
// import { authenticate } from './middleware/authenticate';

const router = Router();

// Inicializa los repositorios
const transactionRepo = new TransactionRepository();
const userRepo = new UserRepository();
const commerceRepo = new CommerceRepository();
const productRepo = new ProductRepository();

// Inicializa el controlador
const transactionController = new TransactionController(
  transactionRepo,
  userRepo,
  commerceRepo,
  productRepo
);

// Rutas
router.post(
  '/create',
  /* authenticate, */ async (req, res) => {
    try {
      const { userId, commerceId, productId } = req.body;

      const transaction = await transactionController.createTransaction(
        userId,
        commerceId,
        productId
      );
      res.status(201).json(transaction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);
router.get('/', async (req: CustomRequest, res) => {
  try {
    const transactions = await transactionController.getAllTransactions(
      req.user.email
    );
    console.log('req.user en transaction.routes: ', req.user);
    res.json(transactions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
