// API通信ユーティリティ
import axios from 'axios';

// APIのベースURL（環境変数から取得、デフォルトはlocalhost:3004）
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3004';

// axiosインスタンスを作成
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター: トークンを自動的に付与
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター: エラーハンドリング
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401エラー（認証エラー）の場合、トークンを削除してログインページにリダイレクト
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // ログインページ以外の場合のみリダイレクト
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

