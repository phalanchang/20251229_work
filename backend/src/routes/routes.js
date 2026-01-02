// ルート設定
import express from 'express';
import authRoutes from './authRoutes.js';
import todoRoutes from './todoRoutes.js';

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

// やりたいことルート
router.use('/todos', todoRoutes);

export default router;

