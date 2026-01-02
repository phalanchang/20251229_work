import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
}

export function LoadingSpinner({ size = 'small' }: LoadingSpinnerProps) {
  const sizeClass = size === 'small' ? 'w-6 h-6' : 'w-12 h-12';
  
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClass} border-4 border-[#E2E8F0] border-t-[#2563EB] rounded-full animate-spin`}
        role="status"
        aria-label="読み込み中"
      >
        <span className="sr-only">読み込み中...</span>
      </div>
    </div>
  );
}
