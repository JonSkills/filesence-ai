import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { User } from './constants';
import { MockService } from './services/mockService';
import { Loader2, Menu, X, Home, User as UserIcon, Briefcase, Calendar, Users, BookOpen, Film, Settings, Bell } from 'lucide-react';
import { Button } from './components/UI';

// Pages
import AuthPage from './pages/Auth';
import DashboardPage from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import ProjectsPage from './pages/Projects';
import EventsPage from './pages/Events';
import CommunityPage from './pages/Community';
import LearningPage from './pages/Learning';
import MediaPage from './pages/Media';
import AdminPage from './pages/Admin';
import LandingPage from './pages/Landing';
import AboutPage from './pages/About';

// --- Auth Context ---
interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<boolean>;
  register: (data: Partial<User>) => Promise<boolean>;
  logout: () => void;
  updateUser: (u: User) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = MockService.getCurrentUser();
    setUser(u);
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    const u = await MockService.login(email);
    if (u) {
      setUser(u);
      return true;
    }
    return false;
  };

  const register = async (data: Partial<User>) => {
    const u = await MockService.register(data);
    setUser(u);
    return true;
  };

  const logout = () => {
    MockService.logout();
    setUser(null);
  };

  const updateUser = (u: User) => {
      MockService.updateUser(u);
      setUser(u);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Layouts ---

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-cci-blue w-8 h-8" /></div>;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Кабинет', path: '/dashboard', icon: Home },
    { name: 'Профиль', path: '/profile', icon: UserIcon },
    { name: 'Проекты', path: '/projects', icon: Briefcase },
    { name: 'События', path: '/events', icon: Calendar },
    { name: 'Сообщество', path: '/community', icon: Users },
    { name: 'Обучение', path: '/learning', icon: BookOpen },
    { name: 'Медиа', path: '/media', icon: Film },
  ];

  if (user?.role === 'Админ') {
    navItems.push({ name: 'Админ', path: '/admin', icon: Settings });
  }

  // Mock Notifications
  const notifications = [
      { id: 1, text: "Добро пожаловать в CCI! Заполни профиль.", time: "Только что", read: false },
      { id: 2, text: "Новое событие 'Хакатон 2025' добавлено.", time: "2ч назад", read: false },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-cci-blue text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col`}>
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-cci-gold">CCI</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}><X className="w-6 h-6" /></button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-cci-gold text-white font-medium shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
           <div className="flex items-center gap-3 mb-4 px-2">
                <img src={user?.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-cci-gold object-cover" />
                <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.role}</p>
                </div>
           </div>
           <Button variant="outline" className="w-full border-gray-500 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-400" onClick={logout}>Выйти</Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b p-4 flex justify-between items-center shadow-sm z-10">
           <div className="flex items-center">
                <button onClick={() => setSidebarOpen(true)} className="text-cci-blue md:hidden mr-4"><Menu className="w-6 h-6" /></button>
                <span className="font-bold text-cci-blue md:hidden">CCI Platform</span>
           </div>
           
           <div className="flex items-center gap-4 ml-auto">
                <div className="relative">
                    <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 text-gray-500 hover:text-cci-blue transition-colors">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    {notifOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in z-50">
                            <div className="px-4 py-2 border-b text-sm font-bold text-gray-700">Уведомления</div>
                            {notifications.map(n => (
                                <div key={n.id} className="px-4 py-3 hover:bg-gray-50 border-b last:border-0 cursor-pointer">
                                    <p className="text-sm text-gray-800">{n.text}</p>
                                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                                </div>
                            ))}
                            <div className="px-4 py-2 text-center text-xs text-cci-blue hover:underline cursor-pointer">Пометить все как прочитанные</div>
                        </div>
                    )}
                </div>
           </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// --- App Component ---

const App = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/register" element={<AuthPage type="register" />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><DashboardLayout><DashboardPage /></DashboardLayout></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><DashboardLayout><ProfilePage /></DashboardLayout></PrivateRoute>} />
          <Route path="/projects" element={<PrivateRoute><DashboardLayout><ProjectsPage /></DashboardLayout></PrivateRoute>} />
          <Route path="/events" element={<PrivateRoute><DashboardLayout><EventsPage /></DashboardLayout></PrivateRoute>} />
          <Route path="/community" element={<PrivateRoute><DashboardLayout><CommunityPage /></DashboardLayout></PrivateRoute>} />
          <Route path="/learning" element={<PrivateRoute><DashboardLayout><LearningPage /></DashboardLayout></PrivateRoute>} />
          <Route path="/media" element={<PrivateRoute><DashboardLayout><MediaPage /></DashboardLayout></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><DashboardLayout><AdminPage /></DashboardLayout></PrivateRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;