import express from 'express';
import { CommerceController } from '../../interfaces/controllers/CommerceController';
import { CommerceRepository } from '../../interfaces/drivers/CommerceRepository';

const router = express.Router();
const commerceRepo = new CommerceRepository();
const commerceController = new CommerceController(commerceRepo);

router.post('/', async (req, res) => {
  try {
    const commerce = await commerceController.createCommerce(req.body);
    res.status(201).json(commerce);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_req, res) => {
  try {
    const commerces = await commerceController.getAllCommerces();
    res.json(commerces);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const commerce = await commerceController.getCommerceById(
      Number(req.params.id)
    );
    if (commerce) {
      res.json(commerce);
    } else {
      res.status(404).json({ error: 'Commerce not found' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const commerces = await commerceController.getCommercesByUserId(
      Number(req.params.userId)
    );
    res.json(commerces);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCommerce = await commerceController.updateCommerce(
      Number(req.params.id),
      req.body
    );
    res.json(updatedCommerce);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await commerceController.deleteCommerce(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
