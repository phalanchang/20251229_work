import React, { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Todo } from './TodoList';

interface TodoDetailProps {
  todo: Todo;
  onClose: () => void;
  onUpdate: (id: number, updates: Partial<Todo>) => void;
}

export function TodoDetail({ todo, onClose, onUpdate }: TodoDetailProps) {
  const [formData, setFormData] = useState({
    title: todo.title,
    url: todo.url,
    status: todo.status,
    tags: todo.tags.join(', '),
    priority: todo.priority,
    memo: todo.memo || '',
  });

  const [errors, setErrors] = useState<{ title?: string; url?: string; tags?: string }>({});

  const validateForm = () => {
    const newErrors: { title?: string; url?: string; tags?: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'タイトルを入力してください';
    }

    if (!formData.url.trim()) {
      newErrors.url = 'URLを入力してください';
    } else if (!/^https?:\/\/.+/.test(formData.url)) {
      newErrors.url = '有効なURLを入力してください（http://またはhttps://で始まる）';
    }

    if (!formData.tags.trim()) {
      newErrors.tags = 'タグを入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const tags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const now = new Date().toISOString().split('T')[0];

    onUpdate(todo.id, {
      title: formData.title,
      url: formData.url,
      status: formData.status,
      tags,
      priority: formData.priority,
      memo: formData.memo,
      updatedDate: now,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
          <h3 className="text-xl font-bold text-[#0F172A]">編集</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* タイトル */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#0F172A] mb-2">
              タイトル <span className="text-[#EF4444]">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                setErrors({ ...errors, title: undefined });
              }}
              className={`w-full h-12 px-4 border ${
                errors.title ? 'border-[#EF4444]' : 'border-[#E2E8F0]'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] hover:border-[#CBD5E1] transition-colors`}
              placeholder="タスクのタイトルを入力"
            />
            {errors.title && <p className="mt-1 text-sm text-[#EF4444]">{errors.title}</p>}
          </div>

          {/* URL */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-[#0F172A] mb-2">
              URL <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <input
                id="url"
                type="text"
                value={formData.url}
                onChange={(e) => {
                  setFormData({ ...formData, url: e.target.value });
                  setErrors({ ...errors, url: undefined });
                }}
                className={`w-full h-12 px-4 pr-10 border ${
                  errors.url ? 'border-[#EF4444]' : 'border-[#E2E8F0]'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] hover:border-[#CBD5E1] transition-colors`}
                placeholder="https://example.com"
              />
              <a
                href={formData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#2563EB] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            {errors.url && <p className="mt-1 text-sm text-[#EF4444]">{errors.url}</p>}
          </div>

          {/* ステータス */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-[#0F172A] mb-2">
              ステータス
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as Todo['status'] })
              }
              className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] hover:border-[#CBD5E1] transition-colors"
            >
              <option value="未着手">未着手</option>
              <option value="進行中">進行中</option>
              <option value="完了">完了</option>
            </select>
          </div>

          {/* タグ */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-[#0F172A] mb-2">
              タグ <span className="text-[#EF4444]">*</span>
            </label>
            <input
              id="tags"
              type="text"
              value={formData.tags}
              onChange={(e) => {
                setFormData({ ...formData, tags: e.target.value });
                setErrors({ ...errors, tags: undefined });
              }}
              className={`w-full h-12 px-4 border ${
                errors.tags ? 'border-[#EF4444]' : 'border-[#E2E8F0]'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] hover:border-[#CBD5E1] transition-colors`}
              placeholder="仕事, 個人, 緊急（カンマ区切り）"
            />
            {errors.tags && <p className="mt-1 text-sm text-[#EF4444]">{errors.tags}</p>}
            <p className="mt-1 text-xs text-[#64748B]">複数のタグはカンマ（,）で区切ってください</p>
          </div>

          {/* 優先度 */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-[#0F172A] mb-2">
              優先度
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value as Todo['priority'] })
              }
              className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] hover:border-[#CBD5E1] transition-colors"
            >
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </select>
          </div>

          {/* メモ */}
          <div>
            <label htmlFor="memo" className="block text-sm font-medium text-[#0F172A] mb-2">
              メモ
            </label>
            <textarea
              id="memo"
              value={formData.memo}
              onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] hover:border-[#CBD5E1] transition-colors resize-none"
              placeholder="メモを入力（任意）"
            />
          </div>

          {/* メタ情報 */}
          <div className="bg-[#F8FAFC] rounded-lg p-4 space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#64748B]">登録日:</span>
              <span className="text-[#0F172A]">{todo.registeredDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#64748B]">更新日:</span>
              <span className="text-[#0F172A]">{todo.updatedDate}</span>
            </div>
          </div>

          {/* ボタン */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 border border-[#E2E8F0] text-[#64748B] rounded-lg font-medium hover:bg-[#F1F5F9] transition-colors duration-150"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 h-12 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] active:bg-[#1E40AF] transition-colors duration-150"
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
