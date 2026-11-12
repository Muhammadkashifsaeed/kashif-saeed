'use client';
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-canvas text-ink p-8">
            <div className="max-w-lg text-center editorial-panel rounded-3xl p-8">
              <h1 className="font-display text-3xl font-bold mb-3 text-signal-ink">
                Something went wrong
              </h1>
              <p className="mb-4 text-muted text-sm">
                The portfolio encountered an unexpected error. Please reload the page.
              </p>
              <pre className="bg-elevated p-4 rounded-xl text-left text-xs font-mono overflow-auto border border-line">
                {this.state.error?.toString()}
              </pre>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 btn-volt"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
