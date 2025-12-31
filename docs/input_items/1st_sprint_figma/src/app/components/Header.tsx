import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from './AuthContext';

export function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="h-14 md:h-16 bg-white border-b border-[#E2E8F0] px-4 md:px-6 shadow-sm">
      <div className="h-full flex items-center justify-between">
        <div className="text-[#2563EB]">
          <h1 className="text-lg md:text-xl font-bold">マイアプリ</h1>
        </div>
        
        <div className="text-[#0F172A] hidden md:block">
          <span>{user.name}さん</span>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 md:px-4 py-2 text-[#64748B] rounded-lg hover:bg-[#F1F5F9] active:bg-[#E2E8F0] transition-colors duration-150"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">ログアウト</span>
        </button>
      </div>
    </header>
  );
}