import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Lightbulb, 
  Settings,
  DollarSign, 
  ChevronLeft, 
  X, 
  Shield, 
  Eye 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRoleStore } from '@/stores';
import { useEffect } from 'react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
  { path: '/settings', label: 'Settings', icon: Settings },
];

// Spring animation configs
const springTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
};

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: '-100%' },
};

const backdropVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const { role } = useRoleStore();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Handle drag-to-close on mobile
  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x < -50 || info.velocity.x < -500) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden cursor-pointer"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Mobile (animated slide) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed top-0 left-0 z-50 h-full w-64 glass-card border-r border-white/10 flex flex-col lg:hidden"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={springTransition}
            drag="x"
            dragConstraints={{ left: -256, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            role="navigation"
            aria-label="Main navigation"
          >
            <SidebarContent 
              isCollapsed={false} 
              onClose={onClose} 
              onToggleCollapse={onToggleCollapse}
              role={role}
              currentPath={location.pathname}
              isMobile
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop (always visible, animated width) */}
      <motion.aside
        className="fixed top-0 left-0 z-50 h-full glass-card border-r border-white/10 hidden lg:flex flex-col"
        animate={{ width: isCollapsed ? 64 : 256 }}
        transition={springTransition}
        role="navigation"
        aria-label="Main navigation"
      >
        <SidebarContent 
          isCollapsed={isCollapsed} 
          onClose={onClose} 
          onToggleCollapse={onToggleCollapse}
          role={role}
          currentPath={location.pathname}
          isMobile={false}
        />
      </motion.aside>
    </>
  );
}

// Extracted sidebar content for reuse between mobile and desktop
interface SidebarContentProps {
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
  role: 'admin' | 'viewer';
  currentPath: string;
  isMobile: boolean;
}

function SidebarContent({ isCollapsed, onClose, onToggleCollapse, role, currentPath, isMobile }: SidebarContentProps) {
  return (
    <>
      {/* Logo section */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        <div className="flex items-center gap-3 overflow-hidden">
          <motion.div 
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary shadow-glow-primary cursor-pointer"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...springTransition, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 10px rgba(59, 130, 246, 0.3)',
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                  '0 0 10px rgba(59, 130, 246, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center justify-center w-full h-full rounded-lg"
            >
              <DollarSign className="w-5 h-5 text-primary-foreground" />
            </motion.div>
          </motion.div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span 
                className="font-bold text-lg text-foreground whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={springTransition}
              >
                FinDash
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        
        {/* Mobile close button */}
        {isMobile && (
          <motion.button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-hover text-sidebar-foreground cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={springTransition}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Navigation links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = currentPath === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="block relative"
              title={isCollapsed ? item.label : undefined}
              aria-label={item.label}
            >
              <motion.div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer relative",
                  isActive
                    ? "text-primary font-medium"
                    : "text-sidebar-foreground",
                  isCollapsed && "justify-center px-2"
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springTransition, delay: index * 0.05 }}
                whileHover={{ x: isCollapsed ? 0 : 4, backgroundColor: 'var(--color-surface-hover)' }}
              >
                {/* Active indicator with layoutId for smooth transition */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-sidebar-active rounded-lg shadow-glow-primary"
                    transition={springTransition}
                    style={{ zIndex: -1 }}
                  />
                )}
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={springTransition}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section - Role indicator and collapse toggle */}
      <div className="border-t border-white/10 p-3 space-y-3">
        {/* Role badge with glow based on role */}
        <motion.div 
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-hover relative overflow-hidden",
            isCollapsed && "justify-center px-2"
          )}
          animate={{
            boxShadow: role === 'admin' 
              ? '0 0 15px rgba(59, 130, 246, 0.2)' 
              : '0 0 10px rgba(148, 163, 184, 0.1)'
          }}
          transition={springTransition}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          {role === 'admin' ? (
            <motion.div
              animate={{ 
                filter: ['drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))', 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))', 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-4 h-4 text-primary flex-shrink-0" />
            </motion.div>
          ) : (
            <Eye className="w-4 h-4 text-muted flex-shrink-0" />
          )}
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span 
                className="text-xs font-medium text-sidebar-foreground capitalize relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={springTransition}
              >
                {role} Mode
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Desktop collapse toggle */}
        {!isMobile && (
          <motion.button
            onClick={onToggleCollapse}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-sidebar-foreground cursor-pointer",
              isCollapsed && "justify-center px-2"
            )}
            whileHover={{ backgroundColor: 'var(--color-surface-hover)' }}
            whileTap={{ scale: 0.98 }}
            transition={springTransition}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={springTransition}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={springTransition}
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </div>
    </>
  );
}
