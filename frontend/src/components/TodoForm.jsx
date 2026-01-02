// やりたいこと新規登録フォーム
import { useState } from 'react';
import { X } from 'lucide-react';

const TodoForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    status: '未着手',
    tags: '',
    priority: '中',
    memo: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const tags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    onSubmit({
      title: formData.title,
      url: formData.url,
      status: formData.status,
      tags,
      priority: formData.priority,
      memo: formData.memo,
    });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        {/* ヘッダー */}
        <div style={styles.header}>
          <h3 style={styles.headerTitle}>新規登録</h3>
          <button onClick={onClose} style={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        {/* フォーム */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* タイトル */}
          <div style={styles.field}>
            <label htmlFor="title" style={styles.label}>
              タイトル <span style={styles.required}>*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                setErrors({ ...errors, title: undefined });
              }}
              style={{
                ...styles.input,
                ...(errors.title ? styles.inputError : {}),
              }}
              placeholder="タスクのタイトルを入力"
            />
            {errors.title && <p style={styles.errorText}>{errors.title}</p>}
          </div>

          {/* URL */}
          <div style={styles.field}>
            <label htmlFor="url" style={styles.label}>
              URL <span style={styles.required}>*</span>
            </label>
            <input
              id="url"
              type="text"
              value={formData.url}
              onChange={(e) => {
                setFormData({ ...formData, url: e.target.value });
                setErrors({ ...errors, url: undefined });
              }}
              style={{
                ...styles.input,
                ...(errors.url ? styles.inputError : {}),
              }}
              placeholder="https://example.com"
            />
            {errors.url && <p style={styles.errorText}>{errors.url}</p>}
          </div>

          {/* ステータス */}
          <div style={styles.field}>
            <label htmlFor="status" style={styles.label}>
              ステータス
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              style={styles.select}
            >
              <option value="未着手">未着手</option>
              <option value="進行中">進行中</option>
              <option value="完了">完了</option>
            </select>
          </div>

          {/* タグ */}
          <div style={styles.field}>
            <label htmlFor="tags" style={styles.label}>
              タグ <span style={styles.required}>*</span>
            </label>
            <input
              id="tags"
              type="text"
              value={formData.tags}
              onChange={(e) => {
                setFormData({ ...formData, tags: e.target.value });
                setErrors({ ...errors, tags: undefined });
              }}
              style={{
                ...styles.input,
                ...(errors.tags ? styles.inputError : {}),
              }}
              placeholder="仕事, 個人, 緊急（カンマ区切り）"
            />
            {errors.tags && <p style={styles.errorText}>{errors.tags}</p>}
            <p style={styles.hint}>複数のタグはカンマ（,）で区切ってください</p>
          </div>

          {/* 優先度 */}
          <div style={styles.field}>
            <label htmlFor="priority" style={styles.label}>
              優先度
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              style={styles.select}
            >
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </select>
          </div>

          {/* メモ */}
          <div style={styles.field}>
            <label htmlFor="memo" style={styles.label}>
              メモ
            </label>
            <textarea
              id="memo"
              value={formData.memo}
              onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
              rows={4}
              style={styles.textarea}
              placeholder="メモを入力（任意）"
            />
          </div>

          {/* ボタン */}
          <div style={styles.buttons}>
            <button
              type="button"
              onClick={onClose}
              style={styles.cancelButton}
            >
              キャンセル
            </button>
            <button type="submit" style={styles.submitButton}>
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    zIndex: 50,
  },
  dialog: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px',
    borderBottom: '1px solid #E2E8F0',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0F172A',
    margin: 0,
  },
  closeButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748B',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
  form: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#0F172A',
  },
  required: {
    color: '#EF4444',
  },
  input: {
    width: '100%',
    height: '48px',
    padding: '0 16px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.15s',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  select: {
    width: '100%',
    height: '48px',
    padding: '0 16px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'none',
  },
  errorText: {
    marginTop: '4px',
    fontSize: '14px',
    color: '#EF4444',
  },
  hint: {
    marginTop: '4px',
    fontSize: '12px',
    color: '#64748B',
  },
  buttons: {
    display: 'flex',
    gap: '12px',
    paddingTop: '16px',
  },
  cancelButton: {
    flex: 1,
    height: '48px',
    border: '1px solid #E2E8F0',
    color: '#64748B',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
  submitButton: {
    flex: 1,
    height: '48px',
    backgroundColor: '#2563EB',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
};

export default TodoForm;

