import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';
import './error-boundry.css'

class ErrorBoundry extends Component {
	state = {
		hasError: false
	}
	componentDidCatch() {
		this.state({
			hasError: true
		});
	};
	render() {
		if (this.state.hasError) {
			return <ErrorIndicator />;
		}
		return this.props.children;
	}
}

export default ErrorBoundry;