// 認証コントローラー
import pool from '../config/database.js';
import { comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

/**
 * ログアウト処理
 * POST /api/auth/logout
 */
export const logout = async (req, res, next) => {
  try {
    // JWT方式の場合、サーバー側での特別な処理は不要
    // クライアント側でトークンを削除すれば十分
    // ただし、セッション管理が必要な場合は、ここでsessionsテーブルから削除する
    
    res.status(200).json({
      success: true,
      message: 'ログアウトしました'
    });
  } catch (error) {
    console.error('Logout error:', error);
    next(error);
  }
};

/**
 * 認証状態確認（現在のユーザー情報取得）
 * GET /api/auth/me
 */
export const getMe = async (req, res, next) => {
  try {
    // ミドルウェアで検証済みのユーザー情報を取得
    const userId = req.user.userId;

    // データベースから最新のユーザー情報を取得
    const [users] = await pool.execute(
      'SELECT id, email, username, created_at FROM users WHERE id = ?',
      [userId]
    );

    // ユーザーが存在しない場合（トークンは有効だが、ユーザーが削除された場合）
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'ユーザーが見つかりません'
      });
    }

    const user = users[0];

    // レスポンス返却
    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error('GetMe error:', error);
    next(error);
  }
};

/**
 * ログイン処理
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // バリデーション
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'メールアドレスとパスワードを入力してください'
      });
    }

    // メールアドレス形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: '有効なメールアドレス形式で入力してください'
      });
    }

    // データベースからユーザー情報を取得
    const [users] = await pool.execute(
      'SELECT id, email, username, password_hash FROM users WHERE email = ?',
      [email]
    );

    // ユーザーが存在しない場合
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'メールアドレスまたはパスワードが正しくありません'
      });
    }

    const user = users[0];

    // パスワード検証
    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'メールアドレスまたはパスワードが正しくありません'
      });
    }

    // JWTトークン生成
    const token = generateToken({
      userId: user.id,
      email: user.email
    });

    // レスポンス返却
    res.status(200).json({
      success: true,
      token: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

