'use client';

import { Component, type ReactNode } from 'react';
import AuroraEffect from './aurora-effect';

interface ErrorBoundaryState {
  hasError: boolean;
}

class AuroraErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Aurora Effect Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback gradient background instead
      return (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/20 to-black"
          style={{ zIndex: 0 }}
        />
      );
    }

    return this.props.children;
  }
}

export default function AuroraEffectWrapper({ className }: { className?: string }) {
  return (
    <AuroraErrorBoundary>
      <AuroraEffect className={className} />
    </AuroraErrorBoundary>
  );
}

