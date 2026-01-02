// やりたいこと一覧画面
import { useState, useEffect } from 'react';
import { Plus, ExternalLink } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'sonner';
import TodoForm from '../components/TodoForm';
import TodoDetail from '../components/TodoDetail';
import { formatDateTime } from '../utils/dateFormatter';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  // やりたいこと一覧を取得
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/todos');
      if (response.data.success) {
        setTodos(response.data.todos);
      }
    } catch (error) {
      console.error('Fetch todos error:', error);
      toast.error('やりたいことの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // 全てのタグを抽出
  const allTags = Array.from(new Set(todos.flatMap((todo) => todo.tags || [])));

  // タグフィルター切り替え
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // フィルタリングされたTodo
  const filteredTodos =
    selectedTags.length === 0
      ? todos
      : todos.filter((todo) => todo.tags?.some((tag) => selectedTags.includes(tag)));

  // 新規Todo追加
  const handleAddTodo = async (newTodo) => {
    try {
      const response = await api.post('/api/todos', newTodo);
      if (response.data.success) {
        toast.success('やりたいことを登録しました');
        setIsFormOpen(false);
        fetchTodos();
      }
    } catch (error) {
      console.error('Create todo error:', error);
      toast.error(error.response?.data?.message || '登録に失敗しました');
    }
  };

  // Todo更新
  const handleUpdateTodo = async (id, updates) => {
    try {
      const response = await api.put(`/api/todos/${id}`, updates);
      if (response.data.success) {
        toast.success('やりたいことを更新しました');
        setSelectedTodo(null);
        fetchTodos();
      }
    } catch (error) {
      console.error('Update todo error:', error);
      toast.error(error.response?.data?.message || '更新に失敗しました');
    }
  };

  // ステータスカラー
  const getStatusColor = (status) => {
    switch (status) {
      case '未着手':
        return { bg: '#F1F5F9', text: '#64748B' };
      case '進行中':
        return { bg: '#DBEAFE', text: '#2563EB' };
      case '完了':
        return { bg: '#D1FAE5', text: '#059669' };
      default:
        return { bg: '#F1F5F9', text: '#64748B' };
    }
  };

  // 優先度カラー
  const getPriorityColor = (priority) => {
    switch (priority) {
      case '高':
        return { bg: '#FEE2E2', text: '#DC2626' };
      case '中':
        return { bg: '#FEF3C7', text: '#D97706' };
      case '低':
        return { bg: '#E0E7FF', text: '#4F46E5' };
      default:
        return { bg: '#F1F5F9', text: '#64748B' };
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>読み込み中...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>やりたいこと</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          style={styles.addButton}
        >
          <Plus size={16} />
          <span>新規登録</span>
        </button>
      </div>

      {/* タグフィルター */}
      {allTags.length > 0 && (
        <div style={styles.filterCard}>
          <h3 style={styles.filterTitle}>タグでフィルター</h3>
          <div style={styles.tagList}>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  ...styles.tagButton,
                  ...(selectedTags.includes(tag) ? styles.tagButtonActive : {}),
                }}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                style={styles.clearButton}
              >
                クリア
              </button>
            )}
          </div>
        </div>
      )}

      {/* テーブル */}
      <div style={styles.tableCard}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>No.</th>
                <th style={styles.tableHeader}>タイトル</th>
                <th style={styles.tableHeader}>URL</th>
                <th style={styles.tableHeader}>ステータス</th>
                <th style={styles.tableHeader}>登録日</th>
                <th style={styles.tableHeader}>更新日</th>
                <th style={styles.tableHeader}>タグ</th>
                <th style={styles.tableHeader}>優先度</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.length === 0 ? (
                <tr>
                  <td colSpan={8} style={styles.emptyCell}>
                    該当するデータがありません
                  </td>
                </tr>
              ) : (
                filteredTodos.map((todo) => {
                  const statusColor = getStatusColor(todo.status);
                  const priorityColor = getPriorityColor(todo.priority);
                  return (
                    <tr key={todo.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{todo.id}</td>
                      <td style={styles.tableCell}>
                        <button
                          onClick={() => setSelectedTodo(todo)}
                          style={styles.titleButton}
                        >
                          {todo.title}
                        </button>
                      </td>
                      <td style={styles.tableCell}>
                        <a
                          href={todo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.urlLink}
                        >
                          <span style={styles.urlText}>{todo.url}</span>
                          <ExternalLink size={12} />
                        </a>
                      </td>
                      <td style={styles.tableCell}>
                        <span
                          style={{
                            ...styles.badge,
                            backgroundColor: statusColor.bg,
                            color: statusColor.text,
                          }}
                        >
                          {todo.status}
                        </span>
                      </td>
                      <td style={styles.tableCell}>{formatDateTime(todo.registeredDate)}</td>
                      <td style={styles.tableCell}>{formatDateTime(todo.updatedDate)}</td>
                      <td style={styles.tableCell}>
                        <div style={styles.tagsContainer}>
                          {(todo.tags || []).map((tag) => (
                            <span key={tag} style={styles.tagBadge}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <span
                          style={{
                            ...styles.badge,
                            backgroundColor: priorityColor.bg,
                            color: priorityColor.text,
                          }}
                        >
                          {todo.priority}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 登録フォームダイアログ */}
      {isFormOpen && (
        <TodoForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleAddTodo}
        />
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
};

const styles = {
  container: {
    padding: '16px 24px 32px',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#64748B',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0F172A',
    margin: 0,
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#2563EB',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
  filterCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    marginBottom: '24px',
  },
  filterTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#0F172A',
    marginBottom: '12px',
  },
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  tagButton: {
    padding: '6px 12px',
    backgroundColor: '#F1F5F9',
    color: '#64748B',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  tagButtonActive: {
    backgroundColor: '#2563EB',
    color: '#ffffff',
  },
  clearButton: {
    padding: '6px 12px',
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    backgroundColor: '#F8FAFC',
    borderBottom: '1px solid #E2E8F0',
  },
  tableHeader: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '500',
    color: '#0F172A',
  },
  tableRow: {
    borderBottom: '1px solid #E2E8F0',
    transition: 'background-color 0.15s',
  },
  tableCell: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#0F172A',
  },
  emptyCell: {
    padding: '32px',
    textAlign: 'center',
    color: '#64748B',
  },
  titleButton: {
    background: 'none',
    border: 'none',
    color: '#2563EB',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    padding: 0,
  },
  urlLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: '#2563EB',
    textDecoration: 'none',
    maxWidth: '200px',
  },
  urlText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
  },
  tagBadge: {
    display: 'inline-block',
    padding: '2px 8px',
    backgroundColor: '#F1F5F9',
    color: '#64748B',
    borderRadius: '4px',
    fontSize: '12px',
  },
};

export default TodoList;

