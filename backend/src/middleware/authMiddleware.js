// 認証ミドルウェア
import { verifyToken } from '../utils/jwt.js';

/**
 * JWTトークンを検証するミドルウェア
 * 保護されたルートで使用
 */
export const authenticate = (req, res, next) => {
  try {
    // Authorizationヘッダーからトークンを取得
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: '認証トークンが提供されていません'
      });
    }

    // Bearer を除いたトークンを取得
    const token = authHeader.substring(7);

    // トークンを検証
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: '無効または期限切れのトークンです'
      });
    }

    // リクエストオブジェクトにユーザー情報を追加
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: '認証に失敗しました'
    });
  }
};

