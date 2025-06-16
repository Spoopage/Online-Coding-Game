import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Ups! Terjadi kesalahan saat memuat game.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;