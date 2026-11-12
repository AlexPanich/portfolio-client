import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  name: string;
  children: ReactNode;
}

/**
 * Isolates a page section: a rendering bug in one section hides only that
 * section (with a note) instead of unmounting the whole page.
 */
export class SectionBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      `Section "${this.props.name}" failed to render`,
      error,
      info.componentStack,
    );
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <p role="alert" className="caption px-5 py-10 text-fg-muted md:px-16">
        Раздел «{this.props.name}» не удалось отобразить
      </p>
    );
  }
}
