import { Menu, Sun, Moon, Shield, Eye, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useThemeStore, useRoleStore } from '@/stores';
import { useEffect } from 'react';
import type { Role } from '@/types';

interface HeaderProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
  '/settings': 'Settings',
};

// Spring animation config
const springTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
};

export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useThemeStore();
  const { role, setRole } = useRoleStore();

  const pageTitle = pageTitles[location.pathname] || 'Dashboard';

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
  };

  return (
    <header className="sticky top-0 z-30 h-16 glass border-b border-white/10 backdrop-blur-xl flex items-center justify-between px-4 md:px-6">
      {/* Left section - Menu button (mobile) and page title */}
      <div className="flex items-center gap-4">
        <motion.button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-surface-hover text-foreground lg:hidden cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={springTransition}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </motion.button>
        
        {/* Animated page title */}
        <AnimatePresence mode="wait">
          <motion.h1 
            key={pageTitle}
            className="text-lg font-semibold text-foreground"
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={springTransition}
          >
            {pageTitle}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Right section - Notification, Role toggle and Theme toggle */}
      <div className="flex items-center gap-3">
        {/* Notification hint (decorative) */}
        <motion.button
          className="relative p-2 rounded-lg hover:bg-surface-hover text-foreground cursor-pointer hidden sm:flex"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={springTransition}
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {/* Animated notification dot */}
          <motion.span
            className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.button>

        {/* Role toggle - Segmented control with animated indicator */}
        <div 
          className="hidden sm:flex items-center bg-surface-hover/80 backdrop-blur-sm rounded-lg p-1 relative"
          role="group"
          aria-label="User role selector"
        >
          {/* Animated background indicator */}
          <motion.div
            layoutId="role-indicator"
            className="absolute inset-y-1 rounded-md bg-primary shadow-glow-primary"
            animate={{
              left: role === 'admin' ? 4 : '50%',
              width: 'calc(50% - 4px)',
            }}
            transition={springTransition}
          />
          
          <motion.button
            onClick={() => handleRoleChange('admin')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium relative z-10 cursor-pointer",
              role === 'admin'
                ? "text-primary-foreground"
                : "text-muted hover:text-foreground"
            )}
            whileHover={{ scale: role === 'admin' ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springTransition}
            aria-pressed={role === 'admin'}
            aria-label="Switch to Admin role"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </motion.button>
          <motion.button
            onClick={() => handleRoleChange('viewer')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium relative z-10 cursor-pointer",
              role === 'viewer'
                ? "text-primary-foreground"
                : "text-muted hover:text-foreground"
            )}
            whileHover={{ scale: role === 'viewer' ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springTransition}
            aria-pressed={role === 'viewer'}
            aria-label="Switch to Viewer role"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Viewer</span>
          </motion.button>
        </div>

        {/* Theme toggle with spring rotation */}
        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-surface-hover text-foreground cursor-pointer relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={springTransition}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {/* Glow effect on toggle */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            animate={{
              boxShadow: theme === 'dark' 
                ? '0 0 12px rgba(96, 165, 250, 0.3)' 
                : '0 0 12px rgba(251, 146, 60, 0.3)'
            }}
            transition={springTransition}
          />
          <div className="relative w-5 h-5">
            <AnimatePresence mode="wait">
              {theme === 'light' ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={springTransition}
                  className="absolute inset-0"
                >
                  <Sun className="w-5 h-5 text-accent" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0, opacity: 0 }}
                  transition={springTransition}
                  className="absolute inset-0"
                >
                  <Moon className="w-5 h-5 text-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>
    </header>
  );
}
