import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { TodoList } from './TodoList';

function HomePage() {
  const { user } = useAuth();

  return (
    <main className="max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-6">
        ようこそ、{user?.name}さん
      </h2>

      {/* コンテンツカード1 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4 hover:shadow-md transition-shadow duration-150">
        <h3 className="text-xl font-semibold text-[#0F172A] mb-3">
          ダッシュボード概要
        </h3>
        <p className="text-[#64748B] leading-relaxed">
          このダッシュボードでは、アプリケーションの主要な機能にアクセスできます。
          左側のナビゲーションメニューから各ページに移動できます。
        </p>
      </div>

      {/* コンテンツカード2 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4 hover:shadow-md transition-shadow duration-150">
        <h3 className="text-xl font-semibold text-[#0F172A] mb-3">
          アカウント情報
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#0F172A] w-24">メール:</span>
            <span className="text-[#64748B]">{user?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#0F172A] w-24">ユーザー名:</span>
            <span className="text-[#64748B]">{user?.name}</span>
          </div>
        </div>
      </div>

      {/* コンテンツカード3 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4 hover:shadow-md transition-shadow duration-150">
        <h3 className="text-xl font-semibold text-[#0F172A] mb-3">
          最近のアクティビティ
        </h3>
        <div className="space-y-3">
          <div className="border-l-4 border-[#2563EB] pl-4 py-2">
            <p className="text-sm font-medium text-[#0F172A]">ログインしました</p>
            <p className="text-xs text-[#64748B]">たった今</p>
          </div>
          <div className="border-l-4 border-[#10B981] pl-4 py-2">
            <p className="text-sm font-medium text-[#0F172A]">プロフィールを更新しました</p>
            <p className="text-xs text-[#64748B]">2時間前</p>
          </div>
          <div className="border-l-4 border-[#F59E0B] pl-4 py-2">
            <p className="text-sm font-medium text-[#0F172A]">設定を変更しました</p>
            <p className="text-xs text-[#64748B]">1日前</p>
          </div>
        </div>
      </div>

      {/* 統計カードグリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-[#2563EB]">
          <div className="text-3xl font-bold text-[#2563EB] mb-2">24</div>
          <div className="text-sm text-[#64748B]">総タスク数</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-[#10B981]">
          <div className="text-3xl font-bold text-[#10B981] mb-2">18</div>
          <div className="text-sm text-[#64748B]">完了済み</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-[#F59E0B]">
          <div className="text-3xl font-bold text-[#F59E0B] mb-2">6</div>
          <div className="text-sm text-[#64748B]">進行中</div>
        </div>
      </div>
    </main>
  );
}

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header onNavigateHome={handleNavigateHome} />
      
      <div className="flex">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
        
        <div className="flex-1 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)]">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'todo' && <TodoList />}
        </div>
      </div>
    </div>
  );
}