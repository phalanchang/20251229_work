// 保護されたページ
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      {/* ヘッダー */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>保護されたページ</h1>
          <div style={styles.headerActions}>
            <button
              onClick={() => navigate('/dashboard')}
              style={styles.backButton}
            >
              ダッシュボードに戻る
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main style={styles.main}>
        <div style={styles.content}>
          {/* 成功メッセージ */}
          <div style={styles.successCard}>
            <div style={styles.successIcon}>✓</div>
            <h2 style={styles.successTitle}>認証成功</h2>
            <p style={styles.successText}>
              このページは認証が必要な保護されたページです。
              認証に成功したため、このページを表示しています。
            </p>
          </div>

          {/* ユーザー情報カード */}
          {user && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>現在のユーザー情報</h3>
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

          {/* 説明カード */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>このページについて</h3>
            <div style={styles.description}>
              <p style={styles.descriptionText}>
                このページは認証が必要な保護されたページの例です。
                未ログインの状態でこのページにアクセスしようとすると、
                自動的にログインページにリダイレクトされます。
              </p>
              <p style={styles.descriptionText}>
                認証が成功した場合のみ、このページのコンテンツが表示されます。
              </p>
            </div>
          </div>

          {/* 機能カード */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>保護されたページの機能</h3>
            <div style={styles.featureList}>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>🔒</div>
                <div style={styles.featureText}>
                  <div style={styles.featureTitle}>認証保護</div>
                  <div style={styles.featureDescription}>
                    認証が必要なコンテンツを安全に表示
                  </div>
                </div>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>👤</div>
                <div style={styles.featureText}>
                  <div style={styles.featureTitle}>ユーザー情報</div>
                  <div style={styles.featureDescription}>
                    現在ログイン中のユーザー情報を表示
                  </div>
                </div>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>🛡️</div>
                <div style={styles.featureText}>
                  <div style={styles.featureTitle}>自動リダイレクト</div>
                  <div style={styles.featureDescription}>
                    未認証アクセス時は自動的にログインページへ
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ナビゲーションカード */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>ナビゲーション</h3>
            <div style={styles.navGrid}>
              <button
                onClick={() => navigate('/dashboard')}
                style={styles.navButton}
              >
                ダッシュボードに戻る
              </button>
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
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
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
  successCard: {
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '8px',
    padding: '24px',
    textAlign: 'center',
  },
  successIcon: {
    fontSize: '48px',
    color: '#28a745',
    marginBottom: '12px',
  },
  successTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#155724',
    marginBottom: '8px',
  },
  successText: {
    fontSize: '16px',
    color: '#155724',
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
  description: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  descriptionText: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  },
  featureIcon: {
    fontSize: '32px',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  featureDescription: {
    fontSize: '14px',
    color: '#666',
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
};

export default ProtectedPage;
