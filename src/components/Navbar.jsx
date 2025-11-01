import { motion } from 'framer-motion';
import { BarChart3, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user }) => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/projects', label: 'Projects' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/reports', label: 'Reports' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full h-14 bg-white dark:bg-bg-dark border-b border-gray-200 dark:border-white/[0.08] flex items-center justify-between px-6 shadow-sm dark:shadow-glow"
    >
      <div className="flex items-center gap-8">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-accent-blue dark:bg-gradient-accent flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-text-primary dark:text-gradient tracking-[-0.5px]">InvestorIQ</h1>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-accent-blue/10 dark:bg-gradient-accent/20 text-accent-blue dark:text-gold'
                  : 'text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.06]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/settings" className="px-3 py-1.5 rounded-md text-sm font-medium text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors">
          Settings
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-text-primary dark:text-gold" />
          ) : (
            <Moon className="w-5 h-5 text-text-secondary" />
          )}
        </button>
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-accent-blue/10 dark:bg-gradient-accent flex items-center justify-center text-accent-blue dark:text-white font-semibold text-sm cursor-pointer hover:bg-accent-blue/20 dark:hover:opacity-80 transition-colors">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-white dark:border-bg-dark"></div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
