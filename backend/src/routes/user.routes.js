import express from 'express';
import * as userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Require authentication for all profile operations
router.use(authMiddleware);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.post('/deposit', userController.deposit);
router.post('/withdraw', userController.withdraw);

export default router;
