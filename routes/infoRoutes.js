import express from 'express';
import {
  createInfo,
  getInfo,
  updateInfo
} from '../controllers/infoController.js';

const router = express.Router();

router.post('/', createInfo); // POST /info
router.get('/', getInfo); // GET /info
router.put('/:id', updateInfo); // PUT /info/:id

export default router;
