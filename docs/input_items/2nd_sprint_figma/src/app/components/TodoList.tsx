import React, { useState } from 'react';
import { Plus, ExternalLink } from 'lucide-react';
import { TodoForm } from './TodoForm';
import { TodoDetail } from './TodoDetail';

export interface Todo {
  id: number;
  title: string;
  url: string;
  status: '未着手' | '進行中' | '完了';
  registeredDate: string;
  updatedDate: string;
  tags: string[];
  priority: '高' | '中' | '低';
  memo?: string;
}

const mockTodos: Todo[] = [
  {
    id: 1,
    title: 'React公式ドキュメントを読む',
    url: 'https://example.com/task1',
    status: '進行中',
    registeredDate: '2024-01-15',
    updatedDate: '2024-01-20',
    tags: ['仕事', '緊急'],
    priority: '高',
    memo: 'Hooksの章を重点的に読む',
  },
  {
    id: 2,
    title: 'TypeScriptの学習',
    url: 'https://example.com/task2',
    status: '未着手',
    registeredDate: '2024-01-18',
    updatedDate: '2024-01-18',
    tags: ['個人', '学習'],
    priority: '中',
  },
  {
    id: 3,
    title: 'プロジェクト企画書作成',
    url: 'https://example.com/task3',
    status: '完了',
    registeredDate: '2024-01-10',
    updatedDate: '2024-01-19',
    tags: ['仕事'],
    priority: '低',
    memo: '企画書は承認済み',
  },
];

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  // 全てのタグを抽出
  const allTags = Array.from(new Set(todos.flatMap((todo) => todo.tags)));

  // タグフィルター切り替え
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // フィルタリングされたTodo
  const filteredTodos =
    selectedTags.length === 0
      ? todos
      : todos.filter((todo) => todo.tags.some((tag) => selectedTags.includes(tag)));

  // 新規Todo追加
  const handleAddTodo = (newTodo: Omit<Todo, 'id' | 'registeredDate' | 'updatedDate'>) => {
    const now = new Date().toISOString().split('T')[0];
    const todo: Todo = {
      ...newTodo,
      id: Math.max(...todos.map((t) => t.id), 0) + 1,
      registeredDate: now,
      updatedDate: now,
    };
    setTodos([...todos, todo]);
    setIsFormOpen(false);
  };

  // Todo更新
  const handleUpdateTodo = (id: number, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  // ステータスカラー
  const getStatusColor = (status: string) => {
    switch (status) {
      case '未着手':
        return 'bg-[#F1F5F9] text-[#64748B]';
      case '進行中':
        return 'bg-[#DBEAFE] text-[#2563EB]';
      case '完了':
        return 'bg-[#D1FAE5] text-[#059669]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B]';
    }
  };

  // 優先度カラー
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case '高':
        return 'bg-[#FEE2E2] text-[#DC2626]';
      case '中':
        return 'bg-[#FEF3C7] text-[#D97706]';
      case '低':
        return 'bg-[#E0E7FF] text-[#4F46E5]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B]';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-[#0F172A]">やりたいこと</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] active:bg-[#1E40AF] transition-colors duration-150"
        >
          <Plus className="w-4 h-4" />
          <span>新規登録</span>
        </button>
      </div>

      {/* タグフィルター */}
      {allTags.length > 0 && (
        <div className="mb-6 bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-medium text-[#0F172A] mb-3">タグでフィルター</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  selectedTags.includes(tag)
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA] transition-colors duration-150"
              >
                クリア
              </button>
            )}
          </div>
        </div>
      )}

      {/* テーブル */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#0F172A]">No.</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#0F172A]">タイトル</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#0F172A]">URL</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#0F172A]">ステータス</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#0F172A]">登録日</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#0F172A]">更新日</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#0F172A]">タグ</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#0F172A]">優先度</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredTodos.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-[#64748B]">
                    該当するデータがありません
                  </td>
                </tr>
              ) : (
                filteredTodos.map((todo) => (
                  <tr key={todo.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-4 py-3 text-sm text-[#0F172A]">{todo.id}</td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => setSelectedTodo(todo)}
                        className="text-[#2563EB] hover:underline font-medium text-left"
                      >
                        {todo.title}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <a
                        href={todo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2563EB] hover:underline flex items-center gap-1"
                      >
                        <span className="truncate max-w-[200px]">{todo.url}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
                          todo.status
                        )}`}
                      >
                        {todo.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#64748B]">{todo.registeredDate}</td>
                    <td className="px-4 py-3 text-sm text-[#64748B]">{todo.updatedDate}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {todo.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-0.5 bg-[#F1F5F9] text-[#64748B] rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(
                          todo.priority
                        )}`}
                      >
                        {todo.priority}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 登録フォームダイアログ */}
      {isFormOpen && (
        <TodoForm onClose={() => setIsFormOpen(false)} onSubmit={handleAddTodo} />
      )}

      {/* 詳細・編集ダイアログ */}
      {selectedTodo && (
        <TodoDetail
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
          onUpdate={handleUpdateTodo}
        />
      )}
    </div>
  );
}