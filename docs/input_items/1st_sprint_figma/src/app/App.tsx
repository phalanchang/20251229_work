import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';

function AppContent() {
  const { user } = useAuth();

  return (
    <>
      {user ? <Dashboard /> : <LoginPage />}
      <Toaster 
        position="top-right"
        toastOptions={{
          classNames: {
            success: 'bg-[#F0FDF4] border-l-4 border-[#10B981] text-[#065F46]',
            error: 'bg-[#FEF2F2] border-l-4 border-[#EF4444] text-[#991B1B]',
            warning: 'bg-[#FFFBEB] border-l-4 border-[#F59E0B] text-[#92400E]',
            info: 'bg-[#EFF6FF] border-l-4 border-[#3B82F6] text-[#1E40AF]',
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
