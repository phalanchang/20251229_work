// ログインページ
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * フォームバリデーション
   */
  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    // メールアドレス検証
    if (!email) {
      newErrors.email = 'メールアドレスを入力してください';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '有効なメールアドレス形式で入力してください';
      isValid = false;
    }

    // パスワード検証
    if (!password) {
      newErrors.password = 'パスワードを入力してください';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * フォーム送信処理
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    // バリデーション
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // ログイン成功: ダッシュボードにリダイレクト
        navigate('/dashboard');
      } else {
        // ログイン失敗: エラーメッセージを表示
        setLoginError(result.message || 'ログインに失敗しました');
        setPassword(''); // パスワードをクリア
      }
    } catch (error) {
      setLoginError('ログインに失敗しました。ネットワークエラーが発生した可能性があります。');
      setPassword(''); // パスワードをクリア
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 入力欄の変更時にエラーをクリア
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
    if (loginError) {
      setLoginError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
    if (loginError) {
      setLoginError('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>ログイン</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* エラーメッセージ表示エリア */}
          {loginError && (
            <div style={styles.errorMessage} role="alert">
              {loginError}
            </div>
          )}

          {/* メールアドレス入力欄 */}
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="example@email.com"
              disabled={isLoading}
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" style={styles.fieldError} role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* パスワード入力欄 */}
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              パスワード
            </label>
            <div style={styles.passwordContainer}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="パスワードを入力"
                disabled={isLoading}
                style={{
                  ...styles.input,
                  ...styles.passwordInput,
                  ...(errors.password ? styles.inputError : {}),
                }}
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                style={styles.passwordToggle}
                aria-label={showPassword ? 'パスワードを非表示' : 'パスワードを表示'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" style={styles.fieldError} role="alert">
                {errors.password}
              </p>
            )}
          </div>

          {/* ログインボタン */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.submitButton,
              ...(isLoading ? styles.submitButtonDisabled : {}),
            }}
          >
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
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
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  errorMessage: {
    padding: '12px',
    backgroundColor: '#fee',
    border: '1px solid #fcc',
    borderRadius: '4px',
    color: '#c33',
    fontSize: '14px',
    textAlign: 'center',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  },
  input: {
    width: '100%',
    height: '48px',
    padding: '0 16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  inputError: {
    borderColor: '#e33',
  },
  passwordContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  passwordInput: {
    paddingRight: '48px',
  },
  passwordToggle: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldError: {
    fontSize: '12px',
    color: '#e33',
    marginTop: '4px',
  },
  submitButton: {
    width: '100%',
    height: '48px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '8px',
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
};

export default LoginPage;
