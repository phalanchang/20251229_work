// 認証ルート
import express from 'express';
import { login, logout, getMe } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// ログイン（認証不要）
router.post('/login', login);

// ログアウト（認証必要）
router.post('/logout', authenticate, logout);

// 認証状態確認（認証必要）
router.get('/me', authenticate, getMe);

export default router;

