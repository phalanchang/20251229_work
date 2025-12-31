// JWTトークン生成・検証ユーティリティ
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * JWTトークンを生成
 * @param {Object} payload - トークンに含めるデータ（例: { userId, email }）
 * @returns {string} JWTトークン
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN  // トークンの有効期限を設定（例: '24h' = 24時間、'7d' = 7日間）
  });
};

/**
 * JWTトークンを検証
 * @param {string} token - 検証するトークン
 * @returns {Object|null} デコードされたペイロード、またはnull（無効な場合）
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
