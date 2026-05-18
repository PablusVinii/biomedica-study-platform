"use client";

import React, { ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("=== ErrorBoundary caught error ===");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    console.error("Info:", errorInfo);
    console.error("=====================================");
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!, this.reset);
      }

      return (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Erro ao carregar componente</p>
              <p className="text-xs mt-1 font-mono break-words">{this.state.error?.message}</p>
              <button
                onClick={this.reset}
                className="mt-3 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-600 text-xs font-semibold hover:bg-red-500/30 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
