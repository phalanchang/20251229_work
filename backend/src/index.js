// メインサーバーファイル
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import routes from './routes/routes.js';

// 環境変数の読み込み
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

// ミドルウェア設定
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3003',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルーティング
app.use('/api', routes);

// 404エラーハンドリング
app.use(notFound);

// エラーハンドリング
app.use(errorHandler);

// サーバー起動
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

