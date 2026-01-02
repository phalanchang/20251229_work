import React from 'react';
import { Home, ListTodo } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'ホーム', icon: Home },
    { id: 'todo', label: 'やりたいこと', icon: ListTodo },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E2E8F0] min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)]">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-150 ${
                    isActive
                      ? 'bg-[#EFF6FF] text-[#2563EB] font-medium'
                      : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
