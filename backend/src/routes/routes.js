// ルート設定
import express from 'express';
import authRoutes from './authRoutes.js';

const router = express.Router();

// ヘルスチェックエンドポイント
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 認証ルート
router.use('/auth', authRoutes);

export default router;

