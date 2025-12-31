// エラーページ
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  
  // URLパラメータからエラーの種類とメッセージを取得
  const errorType = searchParams.get('type') || 'unknown';
  const errorMessage = searchParams.get('message') || null;

  /**
   * エラーメッセージを取得
   */
  const getErrorMessage = () => {
    if (errorMessage) {
      return errorMessage;
    }

    switch (errorType) {
      case 'network':
        return '通信エラーが発生しました。ネットワーク接続を確認してください。';
      case 'server':
        return 'システムエラーが発生しました。しばらくしてから再度お試しください。';
      case 'auth':
        return '認証エラーが発生しました。再度ログインしてください。';
      case '404':
        return 'お探しのページが見つかりませんでした。';
      case '500':
        return 'サーバーエラーが発生しました。';
      default:
        return 'エラーが発生しました。';
    }
  };

  /**
   * ホームに戻る処理
   */
  const handleGoHome = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  /**
   * 再試行処理（前のページに戻る）
   */
  const handleRetry = () => {
    window.history.back();
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* エラーアイコン */}
        <div style={styles.iconContainer}>
          <div style={styles.errorIcon}>⚠️</div>
        </div>

        {/* エラータイトル */}
        <h1 style={styles.title}>エラーが発生しました</h1>

        {/* エラーメッセージ */}
        <div style={styles.messageContainer}>
          <p style={styles.message}>{getErrorMessage()}</p>
        </div>

        {/* エラーコード（オプション） */}
        {errorType !== 'unknown' && (
          <div style={styles.errorCodeContainer}>
            <span style={styles.errorCodeLabel}>エラーコード:</span>
            <span style={styles.errorCode}>{errorType}</span>
          </div>
        )}

        {/* アクションボタン */}
        <div style={styles.buttonContainer}>
          <button
            onClick={handleGoHome}
            style={styles.primaryButton}
          >
            {isAuthenticated ? 'ダッシュボードに戻る' : 'ログインページに戻る'}
          </button>
          <button
            onClick={handleRetry}
            style={styles.secondaryButton}
          >
            前のページに戻る
          </button>
        </div>

        {/* ヘルプテキスト */}
        <div style={styles.helpContainer}>
          <p style={styles.helpText}>
            問題が解決しない場合は、ページを再読み込みするか、しばらく時間をおいてから再度お試しください。
          </p>
        </div>
      </div>
    </div>
  );
};

// スタイル定義
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  content: {
    maxWidth: '600px',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '48px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: '24px',
  },
  errorIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  messageContainer: {
    marginBottom: '24px',
  },
  message: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
  },
  errorCodeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '32px',
    padding: '8px 16px',
    backgroundColor: '#f9fafb',
    borderRadius: '4px',
    fontSize: '14px',
  },
  errorCodeLabel: {
    color: '#666',
    fontWeight: '500',
  },
  errorCode: {
    color: '#1a1a1a',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  },
  primaryButton: {
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  secondaryButton: {
    padding: '12px 24px',
    backgroundColor: '#ffffff',
    color: '#2563eb',
    border: '1px solid #2563eb',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  helpContainer: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #e0e0e0',
  },
  helpText: {
    fontSize: '14px',
    color: '#999',
    lineHeight: '1.6',
  },
};

export default ErrorPage;
