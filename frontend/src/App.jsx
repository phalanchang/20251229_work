// メインアプリケーションコンポーネント
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import AuthGuard from './components/AuthGuard';
import PublicRoute from './components/PublicRoute';

// ページコンポーネント（後で実装）
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProtectedPage from './pages/ProtectedPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* パブリックルート: 認証済みの場合はダッシュボードにリダイレクト */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          {/* 保護されたルート: 認証が必要 */}
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/protected"
            element={
              <AuthGuard>
                <ProtectedPage />
              </AuthGuard>
            }
          />

          {/* エラーページ */}
          <Route path="/error" element={<ErrorPage />} />

          {/* デフォルトルート: ダッシュボードにリダイレクト */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404: エラーページにリダイレクト */}
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

