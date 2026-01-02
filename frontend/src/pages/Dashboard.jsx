// ダッシュボード（ホーム画面）
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TodoList from './TodoList';

// ホームページコンポーネント
const HomePage = () => {
  const { user } = useAuth();

  return (
    <main style={styles.main}>
      <h2 style={styles.welcomeTitle}>
        ようこそ、{user?.username || user?.email}さん
      </h2>

      {/* コンテンツカード1 */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>ダッシュボード概要</h3>
        <p style={styles.cardText}>
          このダッシュボードでは、アプリケーションの主要な機能にアクセスできます。
          左側のナビゲーションメニューから各ページに移動できます。
        </p>
      </div>

      {/* コンテンツカード2 */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>アカウント情報</h3>
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>メール:</span>
            <span style={styles.infoValue}>{user?.email}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>ユーザー名:</span>
            <span style={styles.infoValue}>{user?.username || user?.email}</span>
          </div>
        </div>
      </div>

      {/* コンテンツカード3 */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>最近のアクティビティ</h3>
        <div style={styles.activityList}>
          <div style={styles.activityItem}>
            <p style={styles.activityText}>ログインしました</p>
            <p style={styles.activityTime}>たった今</p>
          </div>
        </div>
      </div>
    </main>
  );
};

// メインのDashboardコンポーネント
const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
  };

  return (
    <div style={styles.container}>
      <Header onNavigateHome={handleNavigateHome} />
      
      <div style={styles.content}>
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
        
        <div style={styles.mainContent}>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'todo' && <TodoList />}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F8FAFC',
  },
  content: {
    display: 'flex',
    minHeight: 'calc(100vh - 56px)',
  },
  mainContent: {
    flex: 1,
    minHeight: 'calc(100vh - 56px)',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  welcomeTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    marginBottom: '16px',
    transition: 'box-shadow 0.15s',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: '12px',
  },
  cardText: {
    fontSize: '14px',
    color: '#64748B',
    lineHeight: '1.6',
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  infoLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#0F172A',
    minWidth: '96px',
  },
  infoValue: {
    fontSize: '14px',
    color: '#64748B',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  activityItem: {
    borderLeft: '4px solid #2563EB',
    paddingLeft: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  activityText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#0F172A',
    marginBottom: '4px',
  },
  activityTime: {
    fontSize: '12px',
    color: '#64748B',
  },
};

export default Dashboard;
