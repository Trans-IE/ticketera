import React from "react";
import Picture from "./resources/errorImage.svg"
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error info somewhere
  }

  render() {
    if (this.state.errorInfo) {
      console.error(this.state.error);
      console.error(this.state.errorInfo);
      return (
        <div style={{ paddingTop: '10vh', textAlign: 'center' }}>
          <h1>Oops! Algo no salió como se esperaba.</h1>
          <img src={Picture} style={{ padding: 10, height: '300px' }} />
          <h1>Intente recargar la página.</h1>
        </div>);
    }
    return this.props.children;
  }
}
