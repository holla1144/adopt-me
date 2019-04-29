import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(e) {
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error", e, e.info);
    }
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
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
