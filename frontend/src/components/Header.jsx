// ヘッダーコンポーネント
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export const Header = ({ onNavigateHome }) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <button 
          onClick={onNavigateHome}
          style={styles.logoButton}
        >
          <h1 style={styles.logo}>マイアプリ</h1>
        </button>
        
        <div style={styles.userInfo}>
          <span style={styles.userName}>{user.username || user.email}さん</span>
        </div>
        
        <button
          onClick={logout}
          style={styles.logoutButton}
        >
          <LogOut size={16} style={styles.logoutIcon} />
          <span style={styles.logoutText}>ログアウト</span>
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: '56px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #E2E8F0',
    padding: '0 16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  headerContent: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '100%',
  },
  logoButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    color: '#2563EB',
    transition: 'opacity 0.2s',
  },
  logo: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    fontSize: '14px',
    color: '#0F172A',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    color: '#64748B',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
  logoutIcon: {
    flexShrink: 0,
  },
  logoutText: {
    display: 'inline',
  },
};

export default Header;

