import React from 'react'

interface BoundaryProps {
    fallback: any
    children: React.ReactNode
}

class ErrorBoundary extends React.Component<BoundaryProps> {
    state = { hasError: false }

    static getDerivedStateFromError(error: any) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.warn(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback
        }
        return this.props.children
    }
}

export default ErrorBoundary
