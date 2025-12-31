// ダッシュボード
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  /**
   * ログアウト処理
   */
  const handleLogout = async () => {
    // 確認ダイアログ（オプション）
    if (!window.confirm('ログアウトしますか？')) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await logout();
      // ログアウト成功: ログインページにリダイレクト
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // エラーが発生しても、ローカルのトークンは削除されているので
      // ログインページにリダイレクト
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* ヘッダー */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>ダッシュボード</h1>
          <div style={styles.headerActions}>
            {user && (
              <div style={styles.userInfo}>
                <span style={styles.userName}>{user.username || user.email}</span>
              </div>
            )}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              style={{
                ...styles.logoutButton,
                ...(isLoggingOut ? styles.logoutButtonDisabled : {}),
              }}
            >
              {isLoggingOut ? 'ログアウト中...' : 'ログアウト'}
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main style={styles.main}>
        <div style={styles.content}>
          {/* ウェルカムメッセージ */}
          <div style={styles.welcomeCard}>
            <h2 style={styles.welcomeTitle}>
              ようこそ、{user?.username || user?.email}さん
            </h2>
            <p style={styles.welcomeText}>
              ログインに成功しました。ダッシュボードからアプリケーションの主要機能にアクセスできます。
            </p>
          </div>

          {/* ユーザー情報カード */}
          {user && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>アカウント情報</h3>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>ユーザーID:</span>
                  <span style={styles.infoValue}>{user.id}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>メールアドレス:</span>
                  <span style={styles.infoValue}>{user.email}</span>
                </div>
                {user.username && (
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>ユーザー名:</span>
                    <span style={styles.infoValue}>{user.username}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ナビゲーションカード */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>ナビゲーション</h3>
            <div style={styles.navGrid}>
              <button
                onClick={() => navigate('/protected')}
                style={styles.navButton}
              >
                保護されたページへ
              </button>
            </div>
          </div>

          {/* クイックアクションカード */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>クイックアクション</h3>
            <div style={styles.actionGrid}>
              <div style={styles.actionItem}>
                <div style={styles.actionIcon}>📊</div>
                <div style={styles.actionText}>
                  <div style={styles.actionTitle}>統計情報</div>
                  <div style={styles.actionDescription}>
                    アプリケーションの統計情報を確認
                  </div>
                </div>
              </div>
              <div style={styles.actionItem}>
                <div style={styles.actionIcon}>⚙️</div>
                <div style={styles.actionText}>
                  <div style={styles.actionTitle}>設定</div>
                  <div style={styles.actionDescription}>
                    アカウント設定を変更
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// スタイル定義
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    padding: '16px 0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    fontSize: '14px',
    color: '#666',
    marginRight: '8px',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  logoutButtonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  welcomeCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  welcomeTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  welcomeText: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  infoLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#666',
    minWidth: '120px',
  },
  infoValue: {
    fontSize: '14px',
    color: '#1a1a1a',
  },
  navGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  navButton: {
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    textAlign: 'left',
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  actionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  actionIcon: {
    fontSize: '32px',
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  actionDescription: {
    fontSize: '14px',
    color: '#666',
  },
};

export default Dashboard;
