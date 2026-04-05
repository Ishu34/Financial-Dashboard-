import { Component, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className={cn(
            'flex items-center justify-center min-h-[400px] p-4',
            this.props.className
          )}
        >
          <div className="bg-card rounded-xl shadow-card p-8 max-w-md w-full text-center animate-[fade-in_0.3s_ease-out]">
            <div className="mx-auto w-16 h-16 rounded-full bg-danger-subtle flex items-center justify-center mb-6">
              <AlertTriangle className="h-8 w-8 text-danger" strokeWidth={1.5} />
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-2">
              Something went wrong
            </h2>

            <p className="text-sm text-muted mb-6">
              We encountered an unexpected error. Please try again or contact support if
              the problem persists.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 p-3 bg-surface rounded-lg border border-border text-left">
                <p className="text-xs font-mono text-danger break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            >
              <RotateCcw className="h-4 w-4" />
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
