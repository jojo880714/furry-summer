import { useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🏠', label: '首頁' },
    { path: '/unlock', icon: '🔓', label: '解鎖' },
    { path: '/leaderboard', icon: '🏆', label: '排行榜' },
    { path: '/profile', icon: '👤', label: '我的' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <a
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition ${
                  isActive
                    ? 'text-orange-600'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <span className="text-xs font-medium">{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
