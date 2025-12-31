// パスワードハッシュ化・検証ユーティリティ
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * パスワードをハッシュ化
 * @param {string} password - 平文のパスワード
 * @returns {Promise<string>} ハッシュ化されたパスワード
 */
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * パスワードを検証
 * @param {string} password - 平文のパスワード
 * @param {string} hash - ハッシュ化されたパスワード
 * @returns {Promise<boolean>} 一致する場合true
 */
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

