import React from 'react';
import { CircleAlert } from 'lucide-react';

interface ErrorPageProps {
  title?: string;
  message?: string;
  onBackHome?: () => void;
}

export function ErrorPage({ 
  title = '404 - ページが見つかりません',
  message = 'お探しのページは存在しないか、移動された可能性があります。',
  onBackHome
}: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="max-w-[600px] w-full bg-white rounded-xl shadow-md p-12 text-center">
        <div className="flex justify-center mb-6">
          <CircleAlert className="w-16 h-16 text-[#EF4444]" />
        </div>
        
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
          {title}
        </h2>
        
        <p className="text-[#64748B] mb-8 leading-relaxed">
          {message}
        </p>
        
        {onBackHome && (
          <button
            onClick={onBackHome}
            className="w-[200px] h-12 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] active:bg-[#1E40AF] transition-colors duration-150"
          >
            ホームに戻る
          </button>
        )}
      </div>
    </div>
  );
}
