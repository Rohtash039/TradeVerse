import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/session', authController.createSession);
router.post('/logout', authController.logout);

// Remaining auth routes require Firebase session authentication
router.use(authMiddleware);

router.post('/sync', authController.syncUser);
router.get('/me', authController.getMe);

export default router;
