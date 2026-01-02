// サイドバーコンポーネント
import { Home, ListTodo } from 'lucide-react';

export const Sidebar = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'home', label: 'ホーム', icon: Home },
    { id: 'todo', label: 'やりたいこと', icon: ListTodo },
  ];

  return (
    <aside style={styles.sidebar}>
      <nav style={styles.nav}>
        <ul style={styles.menuList}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id} style={styles.menuItem}>
                <button
                  onClick={() => onNavigate(item.id)}
                  style={{
                    ...styles.menuButton,
                    ...(isActive ? styles.menuButtonActive : {}),
                  }}
                >
                  <Icon size={20} style={styles.menuIcon} />
                  <span style={styles.menuLabel}>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '256px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #E2E8F0',
    minHeight: 'calc(100vh - 56px)',
  },
  nav: {
    padding: '16px',
  },
  menuList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  menuItem: {
    margin: 0,
  },
  menuButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    color: '#64748B',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 'normal',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  menuButtonActive: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    fontWeight: '500',
  },
  menuIcon: {
    flexShrink: 0,
  },
  menuLabel: {
    flex: 1,
    textAlign: 'left',
  },
};

export default Sidebar;

