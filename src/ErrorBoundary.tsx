import { Link, Redirect } from "@reach/router";
import React, {Component, ErrorInfo} from "react";

class ErrorBoundary extends Component {
  public static getDerivedStateFromError() {
    return { hasError: true };
  }
  public state = { hasError: false, redirect: false };

  public componentDidCatch(e: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error", e, info);
    }
  }

  public componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    if (this.state.hasError) {
      return (
        <h1>
          Hey, there was an error with this listing.
          <Link to="/">Click here</Link> to go back to the home page or wait
          five seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
