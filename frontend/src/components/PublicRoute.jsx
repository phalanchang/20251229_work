// パブリックルート: 認証済みの場合はダッシュボードにリダイレクト
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * PublicRoute: 認証済みの場合はダッシュボードにリダイレクト
 * @param {React.ReactNode} children - 表示するコンポーネント
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // ローディング中は何も表示しない
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>読み込み中...</div>
      </div>
    );
  }

  // 認証済みの場合はダッシュボードにリダイレクト
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // 未認証の場合は子コンポーネントを表示
  return <>{children}</>;
};

export default PublicRoute;

