import express from 'express';
import {
    createAddress,
    getAddresses,
    getAddressById,
    updateAddress,
    deleteAddress
} from '../controllers/addressController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/', authenticate, createAddress);
router.get('/', authenticate, getAddresses);
router.get('/:id', authenticate, getAddressById);
router.put('/:id', authenticate, updateAddress);
router.delete('/:id', authenticate, deleteAddress);

export default router;
