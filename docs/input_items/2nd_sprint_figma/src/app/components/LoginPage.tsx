import React, { useState } from 'react';
import { Eye, EyeOff, CircleAlert } from 'lucide-react';
import { useAuth } from './AuthContext';
import { LoadingSpinner } from './LoadingSpinner';
import { toast } from 'sonner';

export function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loginError, setLoginError] = useState('');

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (!password) {
      newErrors.password = 'パスワードを入力してください';
    } else if (password.length < 6) {
      newErrors.password = 'パスワードは6文字以上で入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!validateForm()) {
      return;
    }

    try {
      await login(email, password);
      toast.success('ログインに成功しました');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'ログインに失敗しました';
      setLoginError(message);
      setPassword('');
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-[400px] bg-white rounded-xl shadow-md p-6 md:p-8">
        <h1 className="text-[28px] md:text-[32px] font-bold text-center text-[#0F172A] mb-8">
          ログイン
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* メールアドレス入力欄 */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-2">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: undefined });
              }}
              className={`w-full h-12 px-4 border ${
                errors.email ? 'border-[#EF4444]' : 'border-[#E2E8F0]'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] hover:border-[#CBD5E1] transition-colors`}
              placeholder="example@email.com"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-[#EF4444]">{errors.email}</p>
            )}
          </div>

          {/* パスワード入力欄 */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#0F172A] mb-2">
              パスワード
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: undefined });
                }}
                className={`w-full h-12 px-4 pr-12 border ${
                  errors.password ? 'border-[#EF4444]' : 'border-[#E2E8F0]'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] hover:border-[#CBD5E1] transition-colors`}
                placeholder="パスワードを入力"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#64748B] hover:text-[#475569] transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-[#EF4444]">{errors.password}</p>
            )}
          </div>

          {/* エラーメッセージ表示エリア */}
          {loginError && (
            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-3 flex items-start gap-2">
              <CircleAlert className="w-4 h-4 text-[#EF4444] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#EF4444]">{loginError}</p>
            </div>
          )}

          {/* ログインボタン */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#2563EB] text-white rounded-lg font-medium shadow-sm hover:bg-[#1D4ED8] active:bg-[#1E40AF] disabled:bg-[#CBD5E1] disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center"
          >
            {isLoading ? <LoadingSpinner size="small" /> : 'ログイン'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs md:text-sm text-[#64748B]">
          <p>デモ用：任意のメールアドレスとパスワード（6文字以上）でログインできます</p>
        </div>
      </div>
    </div>
  );
}