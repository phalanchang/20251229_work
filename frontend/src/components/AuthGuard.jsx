// 認証ガード: 保護されたルート用コンポーネント
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * AuthGuard: 認証が必要なページを保護するコンポーネント
 * @param {React.ReactNode} children - 保護するコンポーネント
 */
const AuthGuard = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // ローディング中は何も表示しない（またはローディング表示）
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

  // 認証されていない場合はログインページにリダイレクト
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 認証されている場合は子コンポーネントを表示
  return <>{children}</>;
};

export default AuthGuard;

