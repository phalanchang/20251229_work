// やりたいことルート
import express from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// すべてのルートで認証が必要
router.use(authenticate);

// やりたいこと一覧取得
router.get('/', getTodos);

// やりたいこと新規登録
router.post('/', createTodo);

// やりたいこと更新
router.put('/:id', updateTodo);

// やりたいこと削除
router.delete('/:id', deleteTodo);

export default router;

