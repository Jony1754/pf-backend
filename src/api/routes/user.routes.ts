import express from 'express';
import { UserRepository } from '../../interfaces/drivers/UserRepository';
import { UserController } from '../../interfaces/controllers/UserController';
import { CustomRequest } from '../../types/CustomRequest';
const router = express.Router();

// Inicializar controlador y repositorio
const userRepository = new UserRepository();
const userController = new UserController(userRepository);

// Rutas para usuarios
router.post('/register', async (req, res) => {
  try {
    const user = await userController.register(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req: CustomRequest, res) => {
  try {
    const user = await userController.login(req.user);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userController.getUserById(Number(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await userController.updateUser(
      Number(req.params.id),
      req.body
    );
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await userController.deleteUser(Number(req.params.id));
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
