import { Component, type ErrorInfo, type ReactNode } from "react";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application render error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
          <section className="w-full max-w-lg border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-(--market-leaf)">
              Something went wrong
            </p>
            <h1 className="mt-3 text-2xl font-black text-slate-900">
              This page couldn&apos;t be displayed
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your account and basket are unchanged. Return to the shop or
              reload the page to try again.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-md bg-(--market-leaf) px-4 py-2.5 text-sm font-bold text-white hover:bg-(--market-leaf-deep)"
              >
                Reload page
              </button>
              <a
                href="/"
                className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Back to shop
              </a>
            </div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
