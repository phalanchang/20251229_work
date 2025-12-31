// 認証コンテキスト
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

// AuthContextを作成
const AuthContext = createContext(null);

/**
 * AuthProvider: 認証状態を管理するプロバイダー
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 初期化: ローカルストレージからトークンを確認
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          // トークンが有効か確認（/api/auth/meを呼び出し）
          const response = await api.get('/api/auth/me');
          if (response.data.success) {
            setUser(response.data.user);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          } else {
            // トークンが無効な場合
            clearAuth();
          }
        } catch (error) {
          // エラーが発生した場合（トークンが無効など）
          clearAuth();
        }
      } else {
        clearAuth();
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * 認証情報をクリア
   */
  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  /**
   * ログイン処理
   * @param {string} email - メールアドレス
   * @param {string} password - パスワード
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user: userData } = response.data;
        
        // トークンとユーザー情報を保存
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        return {
          success: false,
          message: response.data.message || 'ログインに失敗しました',
        };
      }
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          'ログインに失敗しました。ネットワークエラーが発生した可能性があります。',
      };
    }
  };

  /**
   * ログアウト処理
   */
  const logout = async () => {
    try {
      // サーバー側にログアウトを通知（エラーが発生しても続行）
      await api.post('/api/auth/logout').catch(() => {
        // エラーが発生しても無視（JWT方式のため）
      });
    } finally {
      // クライアント側の認証情報をクリア
      clearAuth();
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth: 認証コンテキストを使用するフック
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

