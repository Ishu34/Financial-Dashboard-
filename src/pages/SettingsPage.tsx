import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  Shield,
  Eye,
  Download,
  Trash2,
  Database,
  Info,
  Monitor,
  Check,
  AlertTriangle,
  ExternalLink,
  Bug,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeStore, useRoleStore, useTransactionStore } from '@/stores';
import { exportTransactions } from '@/utils/export';
import type { Role } from '@/types';
import { BlurFade } from '@/components/magicui/blur-fade';
import { BorderBeam } from '@/components/magicui/border-beam';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { MagicCard } from '@/components/magicui/magic-card';
import { loadSampleData } from '@/utils/sampleData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

const techStack = [
  'React 19',
  'TypeScript',
  'Tailwind CSS 4',
  'Zustand',
  'React Router',
  'Recharts',
  'Framer Motion',
  'Magic UI',
];

type ThemeOption = 'light' | 'dark' | 'system';

const themeOptions: { value: ThemeOption; label: string; icon: React.ElementType }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export function SettingsPage() {
  const { theme, setTheme } = useThemeStore();
  const { role, setRole } = useRoleStore();
  const { transactions, addTransaction } = useTransactionStore();
  const [storageUsage, setStorageUsage] = useState<string>('Calculating...');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<'csv' | 'json' | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(theme as ThemeOption);
  const [loadingData, setLoadingData] = useState(false);

  // Calculate localStorage usage
  useEffect(() => {
    const calculateStorage = () => {
      let total = 0;
      for (const key in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
          const item = localStorage.getItem(key);
          if (item) {
            total += item.length * 2; // UTF-16 = 2 bytes per char
          }
        }
      }
      const kb = (total / 1024).toFixed(2);
      setStorageUsage(`${kb} KB`);
    };
    calculateStorage();
  }, [transactions]);

  const handleExport = useCallback(
    (format: 'csv' | 'json') => {
      const timestamp = new Date().toISOString().split('T')[0];
      exportTransactions({
        format,
        filename: `transactions-${timestamp}.${format}`,
        transactions,
      });
      setExportSuccess(format);
      setTimeout(() => setExportSuccess(null), 2000);
    },
    [transactions]
  );

  const handleResetData = useCallback(() => {
    localStorage.removeItem('financial-dashboard-transactions');
    window.location.reload();
  }, []);
  void handleResetData;

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
  };

  const handleThemeChange = (newTheme: ThemeOption) => {
    setSelectedTheme(newTheme);
    setTheme(newTheme === 'system' ? 'dark' : newTheme);
  };

  const handleLoadSampleData = useCallback(async () => {
    setLoadingData(true);
    try {
      const sampleTransactions = loadSampleData();
      sampleTransactions.forEach((t) => addTransaction(t));
    } finally {
      setLoadingData(false);
    }
  }, [addTransaction]);

  const handleClearAllData = useCallback(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-4xl"
    >
      {/* Section 1: Appearance */}
      <BlurFade delay={0} inView>
        <motion.section variants={itemVariants}>
          <MagicCard className="glass-card p-6 relative overflow-hidden" gradientColor="rgba(59, 130, 246, 0.05)">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-subtle">
                <Monitor className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">Appearance</h2>
                <p className="text-sm text-muted">Customize how the dashboard looks</p>
              </div>
            </div>

            {/* Theme Selector with sliding pill */}
            <div className="p-4 rounded-xl bg-surface-hover/50 backdrop-blur-sm">
              <p className="text-sm font-medium text-card-foreground mb-4">Select Theme</p>
              <div className="relative flex items-center gap-2 p-1 rounded-xl bg-surface/50 border border-border/50">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedTheme === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => handleThemeChange(option.value)}
                      className={cn(
                        'relative flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-colors z-10',
                        isSelected
                          ? 'text-primary-foreground'
                          : 'text-muted hover:text-card-foreground'
                      )}
                      whileHover={{ scale: isSelected ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="theme-indicator"
                          className="absolute inset-0 bg-primary rounded-lg shadow-glow-primary"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {option.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Current theme preview */}
            <motion.div
              className="mt-4 p-4 rounded-lg bg-surface-hover/50 flex items-center gap-4"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {theme === 'light' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3, type: 'spring' }}
                      className="absolute"
                    >
                      <Sun className="w-8 h-8 text-warning" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3, type: 'spring' }}
                      className="absolute"
                    >
                      <Moon className="w-8 h-8 text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <p className="font-medium text-card-foreground">
                  Currently using {theme === 'light' ? 'Light' : 'Dark'} Mode
                </p>
                <p className="text-sm text-muted">
                  {theme === 'light'
                    ? 'Bright and clean for daytime use'
                    : 'Easy on the eyes for nighttime use'}
                </p>
              </div>
            </motion.div>
          </MagicCard>
        </motion.section>
      </BlurFade>

      {/* Section 2: Role Management */}
      <BlurFade delay={0.1} inView>
        <motion.section variants={itemVariants}>
          <MagicCard className="glass-card p-6 relative overflow-hidden" gradientColor="rgba(59, 130, 246, 0.05)">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-subtle">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">Role Management</h2>
                <p className="text-sm text-muted">Switch between Admin and Viewer modes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Admin Card */}
              <motion.button
                onClick={() => handleRoleChange('admin')}
                className={cn(
                  'relative p-5 rounded-xl border-2 text-left transition-all duration-200 overflow-hidden',
                  role === 'admin'
                    ? 'border-primary bg-primary-subtle shadow-glow-primary'
                    : 'border-border hover:border-border-hover bg-surface/50'
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {role === 'admin' && (
                  <>
                    <motion.div
                      layoutId="role-indicator"
                      className="absolute inset-0 bg-primary-subtle/50"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                    <BorderBeam size={60} duration={4} colorFrom="#3B82F6" colorTo="#60A5FA" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10"
                    >
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
                  </>
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={cn(
                        'flex items-center justify-center w-10 h-10 rounded-lg',
                        role === 'admin' ? 'bg-primary' : 'bg-surface-hover'
                      )}
                    >
                      <Shield
                        className={cn(
                          'w-5 h-5',
                          role === 'admin' ? 'text-primary-foreground' : 'text-muted'
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        'text-lg font-semibold',
                        role === 'admin' ? 'text-primary' : 'text-card-foreground'
                      )}
                    >
                      Admin
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    Full access — view, create, edit, delete transactions, export data
                  </p>
                </div>
              </motion.button>

              {/* Viewer Card */}
              <motion.button
                onClick={() => handleRoleChange('viewer')}
                className={cn(
                  'relative p-5 rounded-xl border-2 text-left transition-all duration-200 overflow-hidden',
                  role === 'viewer'
                    ? 'border-primary bg-primary-subtle shadow-glow-primary'
                    : 'border-border hover:border-border-hover bg-surface/50'
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {role === 'viewer' && (
                  <>
                    <motion.div
                      layoutId="role-indicator"
                      className="absolute inset-0 bg-primary-subtle/50"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                    <BorderBeam size={60} duration={4} colorFrom="#3B82F6" colorTo="#60A5FA" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10"
                    >
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
                  </>
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={cn(
                        'flex items-center justify-center w-10 h-10 rounded-lg',
                        role === 'viewer' ? 'bg-primary' : 'bg-surface-hover'
                      )}
                    >
                      <Eye
                        className={cn(
                          'w-5 h-5',
                          role === 'viewer' ? 'text-primary-foreground' : 'text-muted'
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        'text-lg font-semibold',
                        role === 'viewer' ? 'text-primary' : 'text-card-foreground'
                      )}
                    >
                      Viewer
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    Read-only — view transactions and insights, no modifications
                  </p>
                </div>
              </motion.button>
            </div>
          </MagicCard>
        </motion.section>
      </BlurFade>

      {/* Section 3: Data Management */}
      <BlurFade delay={0.2} inView>
        <motion.section variants={itemVariants}>
          <MagicCard className="glass-card p-6 relative overflow-hidden" gradientColor="rgba(59, 130, 246, 0.05)">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-subtle">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">Data Management</h2>
                <p className="text-sm text-muted">Export, backup, or reset your data</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Load Sample Data */}
              <div className="p-4 rounded-xl bg-surface-hover/50 backdrop-blur-sm border border-border/30">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-medium text-card-foreground">Load Sample Data</p>
                    <p className="text-sm text-muted">
                      Populate dashboard with example transactions
                    </p>
                  </div>
                  <ShimmerButton
                    onClick={handleLoadSampleData}
                    disabled={loadingData}
                    shimmerColor="#3B82F6"
                    shimmerSize="0.1em"
                    background="linear-gradient(135deg, #3B82F6, #2563EB)"
                    className="px-6 py-2.5 text-sm font-medium"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {loadingData ? 'Loading...' : 'Load Sample Data'}
                  </ShimmerButton>
                </div>
              </div>

              {/* Export Transactions */}
              <div className="p-4 rounded-xl bg-surface-hover/50 backdrop-blur-sm border border-border/30">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-medium text-card-foreground">Export Transactions</p>
                    <p className="text-sm text-muted">
                      Download {transactions.length} transactions as CSV or JSON
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => handleExport('csv')}
                      disabled={transactions.length === 0}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        'bg-primary text-primary-foreground hover:bg-primary-hover',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-4 h-4" />
                      <span>CSV</span>
                      <AnimatePresence>
                        {exportSuccess === 'csv' && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check className="w-4 h-4" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                    <motion.button
                      onClick={() => handleExport('json')}
                      disabled={transactions.length === 0}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        'bg-surface border border-border text-card-foreground hover:bg-surface-hover',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-4 h-4" />
                      <span>JSON</span>
                      <AnimatePresence>
                        {exportSuccess === 'json' && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check className="w-4 h-4" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Storage Info */}
              <div className="p-4 rounded-xl bg-surface-hover/50 backdrop-blur-sm border border-border/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-card-foreground">Storage Usage</p>
                    <p className="text-sm text-muted">localStorage data for this app</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/50 border border-border/50">
                    <Database className="w-4 h-4 text-muted" />
                    <span className="text-sm font-mono text-card-foreground">{storageUsage}</span>
                  </div>
                </div>
              </div>

              {/* Clear All Data */}
              <div className="p-4 rounded-xl border border-danger/30 bg-danger/5 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-medium text-card-foreground">Clear All Data</p>
                    <p className="text-sm text-muted">
                      Permanently delete all transactions and settings
                    </p>
                  </div>
                  <AnimatePresence mode="wait">
                    {!showResetConfirm ? (
                      <motion.div key="clear-btn">
                        <ShimmerButton
                          onClick={() => setShowResetConfirm(true)}
                          shimmerColor="#EF4444"
                          shimmerSize="0.1em"
                          background="linear-gradient(135deg, #EF4444, #DC2626)"
                          className="px-6 py-2.5 text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Clear All Data
                        </ShimmerButton>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="confirm-btns"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-sm text-danger flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          Sure?
                        </span>
                        <button
                          onClick={handleClearAllData}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-danger text-danger-foreground hover:bg-danger-hover"
                        >
                          Yes, clear
                        </button>
                        <button
                          onClick={() => setShowResetConfirm(false)}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-surface border border-border text-card-foreground hover:bg-surface-hover"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </MagicCard>
        </motion.section>
      </BlurFade>

      {/* Section 4: About */}
      <BlurFade delay={0.3} inView>
        <motion.section variants={itemVariants}>
          <MagicCard className="glass-card p-6 relative overflow-hidden" gradientColor="rgba(59, 130, 246, 0.05)">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-subtle">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">About</h2>
                <p className="text-sm text-muted">Application information</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-hover/50 backdrop-blur-sm border border-border/30">
                <div>
                  <p className="font-semibold text-card-foreground text-lg">Financial Dashboard</p>
                  <p className="text-sm text-muted">Version 1.0.0</p>
                </div>
                <motion.div
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-hover shadow-glow-primary"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <span className="text-2xl font-bold text-primary-foreground">$</span>
                </motion.div>
              </div>

              <div className="p-4 rounded-xl bg-surface-hover/50 backdrop-blur-sm border border-border/30">
                <p className="font-medium text-card-foreground mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <BlurFade key={tech} delay={0.4 + index * 0.05} inView>
                      <motion.span
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary-subtle text-primary border border-primary/20"
                        whileHover={{ scale: 1.08, y: -2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        {tech}
                      </motion.span>
                    </BlurFade>
                  ))}
                </div>
              </div>

              {/* GitHub Links */}
              <div className="p-4 rounded-xl bg-surface-hover/50 backdrop-blur-sm border border-border/30">
                <p className="font-medium text-card-foreground mb-3">Contribute & Feedback</p>
                <div className="flex flex-wrap gap-3">
                  <ShimmerButton
                    onClick={() => window.open('https://github.com', '_blank')}
                    shimmerColor="#3B82F6"
                    shimmerSize="0.08em"
                    background="linear-gradient(135deg, #1F2937, #111827)"
                    className="px-5 py-2 text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Contribute on GitHub
                  </ShimmerButton>
                  <ShimmerButton
                    onClick={() => window.open('https://github.com/issues', '_blank')}
                    shimmerColor="#F59E0B"
                    shimmerSize="0.08em"
                    background="linear-gradient(135deg, #78350F, #92400E)"
                    className="px-5 py-2 text-sm font-medium"
                  >
                    <Bug className="w-4 h-4 mr-2" />
                    Report Issue
                  </ShimmerButton>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-hover/50 backdrop-blur-sm border border-border/30 text-center">
                <p className="text-sm text-muted">
                  Built as a frontend assignment demonstrating modern React practices with{' '}
                  <span className="text-primary font-medium">Magic UI</span> and{' '}
                  <span className="text-primary font-medium">Framer Motion</span>
                </p>
              </div>
            </div>
          </MagicCard>
        </motion.section>
      </BlurFade>
    </motion.div>
  );
}

export default SettingsPage;
