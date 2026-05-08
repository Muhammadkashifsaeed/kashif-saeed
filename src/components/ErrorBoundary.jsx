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
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-dark-950 text-white p-8">
          <div className="max-w-lg text-center">
            <h1 className="text-4xl font-bold mb-4 text-red-500">Oops! Something went wrong</h1>
            <p className="mb-4 text-dark-200">
              The portfolio encountered an error. Please check the browser console for details.
            </p>
            <pre className="bg-dark-900 p-4 rounded-lg text-left text-sm overflow-auto">
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 btn-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
